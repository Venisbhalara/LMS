const db = require("../db");

async function checkEnrollmentsTable() {
  try {
    const [rows] = await db.query("SHOW TABLES LIKE 'enrollments'");
    if (rows.length > 0) {
      console.log("Found table: enrollments");
      const [columns] = await db.query("DESCRIBE enrollments");
      console.log("Columns:", columns.map((c) => c.Field).join(", "));
    } else {
      console.log("Table 'enrollments' does NOT exist");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkEnrollmentsTable();
