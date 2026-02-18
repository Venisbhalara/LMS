const db = require("../db");

async function updateCoursesColumns() {
  try {
    console.log("Updating courses table schema...");

    // Add category column
    try {
      await db.query(`
        ALTER TABLE courses
        ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General',
        ADD COLUMN IF NOT EXISTS image_url VARCHAR(255),
        ADD COLUMN IF NOT EXISTS lessons_count INT DEFAULT 0,
        ADD COLUMN IF NOT EXISTS quizzes_count INT DEFAULT 0;
      `);
      console.log("Successfully added missing columns to courses table.");
    } catch (err) {
      console.error("Error altering courses table:", err);
      throw err;
    }

    console.log("Schema update completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Schema update failed:", error);
    process.exit(1);
  }
}

updateCoursesColumns();
