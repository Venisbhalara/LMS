const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/contact - Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Insert into database
    const [result] = await db.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        id: result.insertId,
        name,
        email,
        subject,
        message,
      },
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
