const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const { syncUsersToExcel } = require("../utils/excelLogger");

const router = express.Router();

// Sync users to Excel (admin only)
router.post("/sync-excel", adminMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC",
    );

    const result = syncUsersToExcel(users);

    if (result.success) {
      res.json({ success: true, message: "Excel file synced successfully" });
    } else {
      res.status(500).json({
        success: false,
        message: `Failed to sync Excel file: ${result.error}`,
      });
    }
  } catch (error) {
    console.error("Error syncing Excel:", error);
    res
      .status(500)
      .json({ success: false, message: "Error syncing Excel file" });
  }
});

// Create new user (admin only)
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const bcrypt = require("bcrypt"); // Import bcrypt locally or move to top

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "student"],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: result.insertId,
        name,
        email,
        role: role || "student",
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Get all users (admin only)
router.get("/", adminMiddleware, async (req, res) => {
  try {
    const { limit } = req.query;
    let query =
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC";
    const params = [];

    if (limit) {
      query += " LIMIT ?";
      params.push(parseInt(limit));
    }

    const [users] = await db.query(query, params);

    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// Get user by ID (admin only)
router.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [req.params.id],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
});

// Update user role (admin only)
router.put("/:id/role", adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["student", "instructor", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be student, instructor, or admin",
      });
    }

    const [result] = await db.query("UPDATE users SET role = ? WHERE id = ?", [
      role,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    });
  }
});

// Delete user (admin only)
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
});

module.exports = router;
