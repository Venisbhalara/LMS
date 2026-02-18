const db = require("../db");

async function fixSchemarecreate() {
  try {
    console.log("Recreating student_enrollments table...");

    // Check count first (optional, but good for log)
    try {
      const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM student_enrollments",
      );
      console.log(`Current row count: ${rows[0].count}`);
    } catch (e) {
      console.log("Table might not exist or error counting");
    }

    // Drop table
    await db.query("DROP TABLE IF EXISTS student_enrollments");
    console.log("Dropped table student_enrollments");

    // Create table with correct schema
    const createTableQuery = `
        CREATE TABLE student_enrollments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL,
            student_email VARCHAR(255) NOT NULL,
            course_title VARCHAR(255) NOT NULL,
            course_price DECIMAL(10, 2) NOT NULL,
            enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            enrollment_id INT,
            branch VARCHAR(50)
        )
    `;
    await db.query(createTableQuery);
    console.log("Created table student_enrollments with correct schema");

    // Check Columns
    const [columns] = await db.query("DESCRIBE student_enrollments");
    console.log(
      "New Schema Columns:",
      JSON.stringify(columns.map((c) => c.Field)),
    );

    process.exit(0);
  } catch (error) {
    console.error("Critical Error:", error);
    process.exit(1);
  }
}

fixSchemarecreate();
