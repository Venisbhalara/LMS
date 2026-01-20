const db = require("./db");

async function updateSchema() {
  try {
    console.log("Starting schema update...");

    // Create contact_messages table
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Created contact_messages table");

      // Create certificates table
      await db.query(`
        CREATE TABLE IF NOT EXISTS certificates (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          course_id INT NOT NULL,
          certificate_code VARCHAR(50) UNIQUE NOT NULL,
          issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          pdf_url VARCHAR(255),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        )
      `);
      console.log("Created certificates table");

      // Create badges table
      await db.query(`
        CREATE TABLE IF NOT EXISTS badges (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          icon_url VARCHAR(255),
          criteria_type ENUM('course_count', 'score', 'streak', 'manual') NOT NULL,
          criteria_value VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Created badges table");

      // Create user_badges table
      await db.query(`
        CREATE TABLE IF NOT EXISTS user_badges (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          badge_id INT NOT NULL,
          awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
        )
      `);
      console.log("Created user_badges table");

      // Create job_applications table
      await db.query(`
        CREATE TABLE IF NOT EXISTS job_applications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          role VARCHAR(255),
          resume_path VARCHAR(255) NOT NULL,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Created job_applications table");

      // Seed badges if empty
      const [badges] = await db.query("SELECT COUNT(*) as count FROM badges");
      if (badges[0].count === 0) {
        await db.query(`
          INSERT INTO badges (name, description, icon_url, criteria_type, criteria_value) VALUES
          ('Course Starter', 'Completed your first course', 'badge_starter.png', 'course_count', '1'),
          ('Scholar', 'Completed 5 courses', 'badge_scholar.png', 'course_count', '5'),
          ('Quiz Master', 'Scored 90% or above in a quiz', 'badge_quiz.png', 'score', '90')
        `);
        console.log("Seeded default badges");
      }
    } catch (err) {
      console.error("Error creating contact_messages table:", err);
      throw err;
    }

    console.log("Schema update completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Schema update failed:", error);
    process.exit(1);
  }
}

updateSchema();
