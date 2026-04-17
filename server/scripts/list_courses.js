const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const db = require("../db");

async function exportCourses() {
  try {
    const [courses] = await db.query("SELECT * FROM courses");
    fs.writeFileSync(
      path.resolve(__dirname, "local_courses_dump.json"),
      JSON.stringify(courses, null, 2),
    );
    console.log(`✓ Exported ${courses.length} courses to local_courses_dump.json`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

exportCourses();
