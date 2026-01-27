const jwt = require("jsonwebtoken");
const db = require("../db");

// Secret key for JWT (in production, this should be in .env)
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user still exists in database
    const [users] = await db.query("SELECT id, role FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    req.user = { ...decoded, role: users[0].role };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = authMiddleware;
