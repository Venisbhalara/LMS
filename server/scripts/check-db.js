const db = require("../db");

async function checkTables() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    const existingTables = rows.map(row => Object.values(row)[0]);
    const requiredTables = [
      "users", "courses", "enrollments", "student_enrollments",
      "contact_messages", "help_requests", "job_applications",
      "sections", "lessons"
    ];
    const missingTables = requiredTables.filter(t => !existingTables.includes(t));
    console.log(JSON.stringify({ 
      existing: existingTables, 
      missing: missingTables,
      allPresent: missingTables.length === 0 
    }));
    process.exit(0);
  } catch (error) {
    console.error("Error checking tables:", error);
    process.exit(1);
  }
}

checkTables();
