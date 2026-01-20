const db = require("./db");

async function checkEnrollments() {
  try {
    const [enrollments] = await db.query(
      "SELECT * FROM student_enrollments ORDER BY id DESC LIMIT 5"
    );
    console.log(
      "Recent Student Enrollments:",
      JSON.stringify(enrollments, null, 2)
    );
    process.exit(0);
  } catch (error) {
    console.error("Error checking enrollments:", error);
    process.exit(1);
  }
}

checkEnrollments();
