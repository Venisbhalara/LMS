const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const enrollmentRoutes = require("./routes/enrollments");
const contactRoutes = require("./routes/contact");
const helpRoutes = require("./routes/help");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/badges", require("./routes/badges"));
app.use("/api/careers", require("./routes/careers"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "LMS Backend API is running!" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Example: Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const { limit } = req.query;
    let query = "SELECT * FROM courses ORDER BY created_at DESC";
    const params = [];

    if (limit) {
      query += " LIMIT ?";
      params.push(parseInt(limit));
    }

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
});

// Example: Get course by ID
app.get("/api/courses/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
});

// Example: Create a new course
app.post("/api/courses", async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      price,
      image_url,
      lessons_count,
      quizzes_count,
      category,
    } = req.body;
    const [result] = await db.query(
      "INSERT INTO courses (title, description, instructor, duration, price, image_url, lessons_count, quizzes_count, category, is_locked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        instructor,
        duration,
        price,
        image_url || null,
        lessons_count || 0,
        quizzes_count || 0,
        category || "General",
        false, // Default is_locked to false
      ],
    );
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        id: result.insertId,
        title,
        description,
        instructor,
        duration,
        price,
        image_url,
        lessons_count,
        quizzes_count,
        category,
      },
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
});

// Example: Update a course
app.put("/api/courses/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      price,
      image_url,
      lessons_count,
      quizzes_count,
      category,
      is_locked,
    } = req.body;
    const [result] = await db.query(
      "UPDATE courses SET title = ?, description = ?, instructor = ?, duration = ?, price = ?, image_url = ?, lessons_count = ?, quizzes_count = ?, category = ?, is_locked = ? WHERE id = ?",
      [
        title,
        description,
        instructor,
        duration,
        price,
        image_url,
        lessons_count,
        quizzes_count,
        category,
        is_locked || false,
        req.params.id,
      ],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Return the updated course data
    res.json({
      success: true,
      message: "Course updated successfully",
      data: {
        id: parseInt(req.params.id),
        title,
        description,
        instructor,
        duration,
        price,
        image_url,
        lessons_count,
        quizzes_count,
        category,
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
});

// Example: Delete a course
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
});
