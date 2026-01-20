const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/help - Save help request
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, email, message)",
      });
    }

    // Insert into database
    const [result] = await db.query(
      "INSERT INTO help_requests (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: "Help request received successfully",
      data: {
        id: result.insertId,
        name,
        email,
        message,
      },
    });
  } catch (error) {
    console.error("Error saving help request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
