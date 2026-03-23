const db = require("../db");

async function checkCourseColumns() {
  try {
    const [rows] = await db.query("DESCRIBE courses");
    console.log(JSON.stringify({ columns: rows.map(r => r.Field) }));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkCourseColumns();
