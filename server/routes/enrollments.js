const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Enroll in a course
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id; // Get user ID from the authenticated token

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Check if user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message:
          "Only students can enroll in courses. Admins and instructors cannot enroll.",
      });
    }
    

    // Check if course exists
    const [courses] = await db.query("SELECT * FROM courses WHERE id = ?", [
      courseId,
    ]);
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if already enrolled
    const [existingEnrollment] = await db.query(
      "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (existingEnrollment.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Enroll user
    const [result] = await db.query(
      "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
      [userId, courseId],
    );

    const enrollmentId = result.insertId;

    // --- NEW: Log detailed enrollment info to student_enrollments ---
    // Fetch course details
    const [courseDetails] = await db.query(
      "SELECT title, price FROM courses WHERE id = ?",
      [courseId],
    );

    // Fetch user details
    const [userDetails] = await db.query(
      "SELECT name, email FROM users WHERE id = ?",
      [userId],
    );

    if (courseDetails.length > 0 && userDetails.length > 0) {
      await db.query(
        "INSERT INTO student_enrollments (student_name, student_email, course_title, course_price, enrollment_id) VALUES (?, ?, ?, ?, ?)",
        [
          userDetails[0].name,
          userDetails[0].email,
          courseDetails[0].title,
          courseDetails[0].price,
          enrollmentId,
        ],
      );
    }
    // -----------------------------------------------------------------

    res.status(201).json({
      success: true,
      message: "Successfully enrolled in course",
      data: {
        enrollmentId: result.insertId,
        userId,
        courseId,
        enrolledAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({
      success: false,
      message: "Error enrolling in course",
      error: error.message,
    });
  }
});

// Unenroll from a course
router.delete("/:courseId", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Get enrollment ID first
    const [enrollment] = await db.query(
      "SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const enrollmentId = enrollment[0].id;

    // Delete from enrollments table
    await db.query("DELETE FROM enrollments WHERE id = ?", [enrollmentId]);

    // --- NEW: Also delete from log table ---
    await db.query("DELETE FROM student_enrollments WHERE enrollment_id = ?", [
      enrollmentId,
    ]);
    // ---------------------------------------

    res.json({
      success: true,
      message: "Successfully unenrolled from course",
    });
  } catch (error) {
    console.error("Unenrollment error:", error);
    res.status(500).json({
      success: false,
      message: "Error unenrolling from course",
      error: error.message,
    });
  }
});

// Get my enrollments
router.get("/my-enrollments", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [enrollments] = await db.query(
      `SELECT e.id, e.enrolled_at, e.progress, e.status, 
              c.id as course_id, c.title, c.description, c.instructor, c.duration, c.price 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = ?`,
      [userId],
    );

    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching enrollments",
      error: error.message,
    });
  }
});

const PDFDocument = require("pdfkit");

// Download course details PDF (using client-provided data)
router.post("/:courseId/download", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const { courseData } = req.body; // Expect course data from client

    if (!courseData) {
      return res
        .status(400)
        .json({ success: false, message: "No course data provided" });
    }

    // Check if enrolled
    const [enrollment] = await db.query(
      "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (enrollment.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled to download course materials",
      });
    }

    // Fetch user details for the PDF
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    const userData = user[0];

    // Use Client Data for Curriculum
    const curriculum = courseData.curriculum || [];

    // Create PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${courseData.title.replace(
        /[^a-zA-Z0-9]/g,
        "_",
      )}_Details.pdf"`,
    );

    doc.pipe(res);

    // PDF Content
    doc.fontSize(25).text("Course Enrollment Details", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, {
      align: "right",
    });
    doc.moveDown(2);

    doc.fontSize(18).text(`Student Name: ${userData.name}`);
    doc.fontSize(18).text(`Student Email: ${userData.email}`);
    doc.moveDown();

    doc.fontSize(16).text("Course Information:", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(14).text(`Title: ${courseData.title}`);
    doc
      .fontSize(14)
      .text(
        `Instructor: ${courseData.instructor.name || courseData.instructor}`,
      );
    doc.fontSize(14).text(`Duration: ${courseData.duration}`);
    doc.fontSize(14).text(`Price: ₹${courseData.price}`);
    doc.moveDown();

    doc.fontSize(12).text("Description:");
    doc.fontSize(10).text(courseData.description);
    doc.moveDown(2);

    // --- Curriculum from Client Data ---
    if (curriculum && curriculum.length > 0) {
      doc.addPage();
      doc
        .fontSize(20)
        .text("Course Curriculum", { align: "center", underline: true });
      doc.moveDown();

      curriculum.forEach((section, sIndex) => {
        doc
          .fontSize(16)
          .text(`${sIndex + 1}. ${section.title}`, { stroke: false });
        doc.moveDown(0.5);

        if (section.lessons && section.lessons.length > 0) {
          section.lessons.forEach((lesson, lIndex) => {
            doc
              .fontSize(12)
              .text(
                `   ${sIndex + 1}.${lIndex + 1} ${lesson.title} (${
                  lesson.duration || "N/A"
                })`,
              );
            if (lesson.description) {
              doc
                .fontSize(10)
                .text(`      ${lesson.description}`, { color: "grey" });
            }
            doc.fillColor("black"); // Reset color
            doc.moveDown(0.3);
          });
        }
        doc.moveDown();
      });
    }
    // ----------------------------------

    doc.moveDown(2);
    doc
      .fontSize(12)
      .text("Thank you for learning with us!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating download",
      error: error.message,
    });
  }
});

module.exports = router;

// Update Course Progress
router.patch("/:courseId/progress", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress, status } = req.body;
    const userId = req.user.id;

    // Check if enrolled
    const [enrollment] = await db.query(
      "SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (enrollment.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    let query = "UPDATE enrollments SET progress = ?";
    const params = [progress || 0];

    // If status is provided (e.g., 'completed'), update it
    // Or auto-complete if progress is 100
    if (status) {
      query += ", status = ?";
      params.push(status);
    } else if (progress === 100) {
      query += ", status = 'completed'";
    }

    // Always update timestamp (if you have an updated_at column, otherwise skip)
    // database schema shows `enrolled_at` but not `last_accessed` or `updated_at` on enrollments table explicitly in the CREATE statement visible?
    // Looking at schema.sql snippet: enrollments table has enrolled_at.
    // Let's stick to updating progress and status.

    query += " WHERE id = ?";
    params.push(enrollment[0].id);

    await db.query(query, params);

    res.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating progress",
      error: error.message,
    });
  }
});
