const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get My Badges
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [badges] = await db.query(
      `
      SELECT b.id, b.name, b.description, b.icon_url, ub.awarded_at
      FROM user_badges ub
      JOIN badges b ON ub.badge_id = b.id
      WHERE ub.user_id = ?
      ORDER BY ub.awarded_at DESC
    `,
      [userId],
    );

    // Also fetch all available badges so user can see what they are missing (optional, or separate endpoint)
    // For now, let's just return earned badges.

    res.json({ success: true, data: badges });
  } catch (error) {
    console.error("Error fetching badges:", error);
    res.status(500).json({ success: false, message: "Error fetching badges" });
  }
});

// Get All Badges (to show possible achievements)
router.get("/all", async (req, res) => {
  try {
    const [badges] = await db.query("SELECT * FROM badges");
    res.json({ success: true, data: badges });
  } catch (error) {
    console.error("Error fetching all badges:", error);
    res.status(500).json({ success: false, message: "Error fetching badges" });
  }
});

module.exports = router;
