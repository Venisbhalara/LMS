const db = require("../db");

async function debugEnroll() {
  try {
    console.log("Starting enrollment debug...");

    // 1. Get a student user
    const [users] = await db.query(
      "SELECT * FROM users WHERE role = 'student' LIMIT 1",
    );
    if (users.length === 0) {
      console.log("No student found. Creating one...");
      // Create a dummy student if none exists
      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES ('Test Student', 'test@test.com', 'password', 'student')",
      );
      // re-fetch
    }
    const [student] = await db.query(
      "SELECT * FROM users WHERE role = 'student' LIMIT 1",
    );
    const userId = student[0].id;
    console.log(`Using User ID: ${userId}`);

    // 2. Get a course
    const [courses] = await db.query("SELECT * FROM courses LIMIT 1");
    if (courses.length === 0) {
      console.error("No courses found!");
      process.exit(1);
    }
    const courseId = courses[0].id;
    console.log(`Using Course ID: ${courseId}`);

    // 3. Simulate Enrollment Logic from routes/enrollments.js

    // Check if already enrolled
    const [existingEnrollment] = await db.query(
      "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (existingEnrollment.length > 0) {
      console.log(
        "User already enrolled. Cleaning up to test fresh enrollment...",
      );
      await db.query("DELETE FROM enrollments WHERE id = ?", [
        existingEnrollment[0].id,
      ]);
      // Also clean log
      // await db.query("DELETE FROM student_enrollments WHERE enrollment_id = ?", [existingEnrollment[0].id]);
      // check log table might not have enrollment_id if it was old schema, so just ignore
    }

    console.log("Attempting to insert into enrollments...");
    const [result] = await db.query(
      "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
      [userId, courseId],
    );
    console.log("Enrollment inserted. ID:", result.insertId);
    const enrollmentId = result.insertId;

    // Log to student_enrollments
    console.log("Attempting to log to student_enrollments...");

    const [courseDetails] = await db.query(
      "SELECT title, price FROM courses WHERE id = ?",
      [courseId],
    );

    const [userDetails] = await db.query(
      "SELECT name, email FROM users WHERE id = ?",
      [userId],
    );

    console.log("Course Details:", courseDetails[0]);
    console.log("User Details:", userDetails[0]);

    if (courseDetails.length > 0 && userDetails.length > 0) {
      const query =
        "INSERT INTO student_enrollments (student_name, student_email, course_title, course_price, enrollment_id) VALUES (?, ?, ?, ?, ?)";
      const params = [
        userDetails[0].name,
        userDetails[0].email,
        courseDetails[0].title,
        courseDetails[0].price,
        enrollmentId,
      ];

      console.log("Executing query:", query);
      console.log("With params:", params);

      await db.query(query, params);
      console.log("Successfully logged to student_enrollments");
    }

    console.log("Enrollment flow completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Caught Error during debug:", error);
    process.exit(1);
  }
}

debugEnroll();
