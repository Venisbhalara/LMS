const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Generate Certificate (Internal/Protected)
// Called when course is completed
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "Course ID required" });
    }

    // 1. Verify Course Completion (This logic might depend on how you track progress)
    // For now, checks if enrollment exists and status is 'completed'
    // You might also trust the frontend to trigger this AFTER ensuring completion,
    // but better to verify on backend.
    const [enrollment] = await db.query(
      "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (enrollment.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });
    }

    if (enrollment[0].status !== "completed") {
      // Option: Auto-complete if progress is 100?
      // For strictness, return error.
      // But for this task, if we trigger generation, we assume requirements met or we update status here.
      // Let's update status to completed if not already.
      if (enrollment[0].progress >= 100) {
        await db.query(
          "UPDATE enrollments SET status = 'completed' WHERE id = ?",
          [enrollment[0].id],
        );
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Course not completed yet." });
      }
    }

    // 2. Check if certificate already exists
    const [existingCert] = await db.query(
      "SELECT * FROM certificates WHERE user_id = ? AND course_id = ?",
      [userId, courseId],
    );

    if (existingCert.length > 0) {
      return res.json({
        success: true,
        message: "Certificate already exists",
        certificateCode: existingCert[0].certificate_code,
      });
    }

    // 3. Generate Unique ID
    const certificateCode = `CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // 4. Create Database Record
    await db.query(
      "INSERT INTO certificates (user_id, course_id, certificate_code) VALUES (?, ?, ?)",
      [userId, courseId, certificateCode],
    );

    // Check for "Course Starter" badge (First ID) and "Scholar" badge (5th ID)
    // We can do this async or via a separate call. For simplicity, check here.
    // Count certificates for user
    const [certCountData] = await db.query(
      "SELECT COUNT(*) as count FROM certificates WHERE user_id = ?",
      [userId],
    );
    const certCount = certCountData[0].count;

    if (certCount === 1) {
      // Award "Course Starter" badge
      const [badge] = await db.query(
        "SELECT id FROM badges WHERE name = 'Course Starter'",
      );
      if (badge.length > 0) {
        await db.query(
          "INSERT IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)",
          [userId, badge[0].id],
        );
      }
    } else if (certCount === 5) {
      // Award "Scholar" badge
      const [badge] = await db.query(
        "SELECT id FROM badges WHERE name = 'Scholar'",
      );
      if (badge.length > 0) {
        await db.query(
          "INSERT IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)",
          [userId, badge[0].id],
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Certificate generated successfully",
      certificateCode,
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error generating certificate" });
  }
});

// Get Certificate Details (Protected - for User Dashboard)
router.get("/my-certificates", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const [certificates] = await db.query(
      `
            SELECT cert.certificate_code, cert.issue_date, c.title as course_title, c.instructor 
            FROM certificates cert
            JOIN courses c ON cert.course_id = c.id
            WHERE cert.user_id = ?
            ORDER BY cert.issue_date DESC
        `,
      [userId],
    );

    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Fetch certificates error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching certificates" });
  }
});

// Verify Certificate (Public)
router.get("/verify/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const [cert] = await db.query(
      `
            SELECT cert.certificate_code, cert.issue_date, u.name as student_name, c.title as course_title, c.instructor
            FROM certificates cert
            JOIN users u ON cert.user_id = u.id
            JOIN courses c ON cert.course_id = c.id
            WHERE cert.certificate_code = ?
        `,
      [code],
    );

    if (cert.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Certificate Code" });
    }

    res.json({ success: true, data: cert[0] });
  } catch (error) {
    console.error("Verification error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying certificate" });
  }
});

// Download Certificate PDF (Public or Protected? Public if they have the code, but maybe restrict)
// Requirement: "Public verification page... displays details". PDF download might be separate.
// Let's make it public via code for sharing simplicity, or protected. "View and download their certificates".
// Usually download is protected, verify is public. But the public page might have a download button.
// Allowing download via code is fine if the code is the secret.
router.get("/download/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const [cert] = await db.query(
      `
            SELECT cert.certificate_code, cert.issue_date, u.name as student_name, c.title as course_title, c.instructor
            FROM certificates cert
            JOIN users u ON cert.user_id = u.id
            JOIN courses c ON cert.course_id = c.id
            WHERE cert.certificate_code = ?
        `,
      [code],
    );

    if (cert.length === 0) {
      return res.status(404).send("Certificate not found");
    }

    const data = cert[0];
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Certificate-${code}.pdf"`,
    );

    doc.pipe(res);

    // --- PDF Design ---

    // Background/Border (Simple rectangle)
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke();

    // Header
    doc
      .fontSize(30)
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF COMPLETION", 0, 100, { align: "center" });

    doc.moveDown();
    doc
      .fontSize(15)
      .font("Helvetica")
      .text("This is to certify that", { align: "center" });
    doc.moveDown();

    // Student Name
    doc
      .fontSize(25)
      .font("Helvetica-Bold")
      .text(data.student_name, { align: "center" });
    doc.moveDown();

    doc
      .fontSize(15)
      .font("Helvetica")
      .text("has successfully completed the course", { align: "center" });
    doc.moveDown();

    // Course Name
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(data.course_title, { align: "center" });
    doc.moveDown();

    doc
      .fontSize(15)
      .font("Helvetica")
      .text(`Instructor: ${data.instructor}`, { align: "center" });
    doc.moveDown(2);

    // Date & ID
    const dateStr = new Date(data.issue_date).toLocaleDateString();
    doc.fontSize(12).text(`Date Issued: ${dateStr}`, 100, 450);
    doc.text(`Certificate ID: ${data.certificate_code}`, 100, 470);

    // QR Code
    // Helper to generate QR
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify/${code}`;
    const qrImage = await QRCode.toDataURL(verificationUrl);
    doc.image(qrImage, doc.page.width - 150, 400, { width: 100 });

    doc.text("Scan to Verify", doc.page.width - 150, 510, {
      width: 100,
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error("PDF Generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

module.exports = router;
