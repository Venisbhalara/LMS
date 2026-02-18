const db = require("../db");

async function recreateEnrollments() {
  try {
    console.log("Recreating enrollments table...");

    // Create table with correct schema from schema.sql
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress INT DEFAULT 0,
        status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
      )
    `;

    await db.query(createTableQuery);
    console.log("Created table enrollments");

    // Check Columns
    const [columns] = await db.query("DESCRIBE enrollments");
    console.log(
      "Enrollments Schema:",
      JSON.stringify(columns.map((c) => c.Field)),
    );

    process.exit(0);
  } catch (error) {
    console.error("Critical Error:", error);
    process.exit(1);
  }
}

recreateEnrollments();
