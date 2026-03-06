const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

// Admin-only guard
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access required." });
  }
  next();
};

// Apply auth + admin to all routes in this file
router.use(authMiddleware, adminOnly);

/* ─────────────────────────────────────────────────────────────────────
   DASHBOARD STATS
───────────────────────────────────────────────────────────────────── */
router.get("/stats", async (req, res) => {
  try {
    const [[{ users }]] = await db.query("SELECT COUNT(*) AS users FROM users");
    const [[{ courses }]] = await db.query(
      "SELECT COUNT(*) AS courses FROM courses",
    );
    const [[{ enrollments }]] = await db.query(
      "SELECT COUNT(*) AS enrollments FROM enrollments",
    );
    const [[{ messages }]] = await db.query(
      "SELECT COUNT(*) AS messages FROM contact_messages",
    );
    const [[{ help }]] = await db.query(
      "SELECT COUNT(*) AS help FROM help_requests",
    );
    const [[{ careers }]] = await db.query(
      "SELECT COUNT(*) AS careers FROM job_applications",
    );

    res.json({
      success: true,
      data: { users, courses, enrollments, messages, help, careers },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
});

/* ─────────────────────────────────────────────────────────────────────
   COURSES
───────────────────────────────────────────────────────────────────── */
router.get("/courses", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM courses ORDER BY created_at DESC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching courses" });
  }
});

router.post("/courses", async (req, res) => {
  try {
    const { title, description, instructor, duration, price } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    const [result] = await db.query(
      "INSERT INTO courses (title, description, instructor, duration, price) VALUES (?, ?, ?, ?, ?)",
      [
        title,
        description || null,
        instructor || null,
        duration || null,
        price || 0,
      ],
    );
    const [[course]] = await db.query("SELECT * FROM courses WHERE id = ?", [
      result.insertId,
    ]);
    res
      .status(201)
      .json({ success: true, message: "Course created", data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating course" });
  }
});

router.put("/courses/:id", async (req, res) => {
  try {
    const { title, description, instructor, duration, price, is_locked } =
      req.body;
    const [result] = await db.query(
      "UPDATE courses SET title=?, description=?, instructor=?, duration=?, price=?, is_locked=? WHERE id=?",
      [
        title,
        description,
        instructor,
        duration,
        price,
        is_locked ? 1 : 0,
        req.params.id,
      ],
    );
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    const [[course]] = await db.query("SELECT * FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, message: "Course updated", data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating course" });
  }
});

router.delete("/courses/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting course" });
  }
});

/* ─────────────────────────────────────────────────────────────────────
   ENROLLMENTS
───────────────────────────────────────────────────────────────────── */
router.get("/enrollments", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.id,
        u.name  AS student_name,
        u.email AS student_email,
        c.title AS course_title,
        c.price AS course_price,
        e.enrolled_at,
        e.progress,
        e.status
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrolled_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching enrollments" });
  }
});

/* ─────────────────────────────────────────────────────────────────────
   CONTACT MESSAGES
───────────────────────────────────────────────────────────────────── */
router.get("/messages", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages" });
  }
});

router.delete("/messages/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM contact_messages WHERE id = ?",
      [req.params.id],
    );
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting message" });
  }
});

/* ─────────────────────────────────────────────────────────────────────
   HELP REQUESTS
───────────────────────────────────────────────────────────────────── */
router.get("/help", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM help_requests ORDER BY created_at DESC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching help requests" });
  }
});

router.delete("/help/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM help_requests WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Help request not found" });
    res.json({ success: true, message: "Help request deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting help request" });
  }
});

/* ─────────────────────────────────────────────────────────────────────
   JOB APPLICATIONS
───────────────────────────────────────────────────────────────────── */
router.get("/careers", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_applications ORDER BY applied_at DESC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching job applications" });
  }
});

router.delete("/careers/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM job_applications WHERE id = ?",
      [req.params.id],
    );
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    res.json({ success: true, message: "Application deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting application" });
  }
});

module.exports = router;
