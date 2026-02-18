const db = require("../db");

async function listCourses() {
  try {
    const [courses] = await db.query("SELECT id, title FROM courses");
    console.log("Courses in DB:");
    courses.forEach((c) => console.log(`${c.id}: ${c.title}`));
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

listCourses();
