const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/resumes");
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Unique filename: timestamp-name-originalExtension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          filetypes,
      ),
    );
  },
});

// POST /api/careers/apply
router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    
    const query = `
      INSERT INTO job_applications (name, email, role, resume_path) 
      VALUES (?, ?, ?, ?)
    `;

    // Store relative path or absolute path? Relative is usually safer/portable.
    // Storing relative to server root.
    const resumePath = "uploads/resumes/" + resumeFile.filename;

    await db.query(query, [
      name,
      email,
      role || "General Application",
      resumePath,
    ]);

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting application" });
  }
});

module.exports = router;
