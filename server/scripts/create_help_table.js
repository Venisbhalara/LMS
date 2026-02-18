const db = require("../db");

async function createHelpTable() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS help_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await db.query(createTableQuery);
    console.log("✓ help_requests table created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating help_requests table:", error);
    process.exit(1);
  }
}

createHelpTable();
