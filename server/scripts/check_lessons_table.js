const db = require("../db");

async function checkLessonsTable() {
  try {
    const [rows] = await db.query("SHOW TABLES LIKE 'lessons'");
    if (rows.length > 0) {
      console.log("Found table: lessons");
      const [columns] = await db.query("DESCRIBE lessons");
      console.log("Columns:", columns.map((c) => c.Field).join(", "));
    } else {
      console.log("Table 'lessons' does NOT exist");
    }

    // Also check for 'sections' or 'curriculum'
    const [sections] = await db.query("SHOW TABLES LIKE 'sections'");
    if (sections.length > 0) console.log("Found table: sections");

    const [curriculum] = await db.query("SHOW TABLES LIKE 'curriculum'");
    if (curriculum.length > 0) console.log("Found table: curriculum");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkLessonsTable();
