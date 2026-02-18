const db = require("../db");

async function fixSchema() {
  try {
    console.log("Fixing student_enrollments schema...");

    // Add student_email
    try {
      await db.query(
        "ALTER TABLE student_enrollments ADD COLUMN student_email VARCHAR(255) NOT NULL",
      );
      console.log("Added student_email");
    } catch (e) {
      if (!e.message.includes("Duplicate column"))
        console.error("Error adding student_email:", e.message);
    }

    // Add course_title
    try {
      await db.query(
        "ALTER TABLE student_enrollments ADD COLUMN course_title VARCHAR(255) NOT NULL",
      );
      console.log("Added course_title");
    } catch (e) {
      if (!e.message.includes("Duplicate column"))
        console.error("Error adding course_title:", e.message);
    }

    // Add course_price
    try {
      await db.query(
        "ALTER TABLE student_enrollments ADD COLUMN course_price DECIMAL(10, 2) NOT NULL",
      );
      console.log("Added course_price");
    } catch (e) {
      if (!e.message.includes("Duplicate column"))
        console.error("Error adding course_price:", e.message);
    }

    // Add enrollment_id
    try {
      await db.query(
        "ALTER TABLE student_enrollments ADD COLUMN enrollment_id INT",
      );
      console.log("Added enrollment_id");
    } catch (e) {
      if (!e.message.includes("Duplicate column"))
        console.error("Error adding enrollment_id:", e.message);
    }

    // Add enrolled_date (if missing, though schema.sql says it has it, let's check or just try adding if needed, but schema.sql had it as TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    // The previous dump showed only id, student_name, branch. So enrolled_date is missing too.
    try {
      await db.query(
        "ALTER TABLE student_enrollments ADD COLUMN enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      );
      console.log("Added enrolled_date");
    } catch (e) {
      if (!e.message.includes("Duplicate column"))
        console.error("Error adding enrolled_date:", e.message);
    }

    console.log("Schema fix completed.");
    process.exit(0);
  } catch (error) {
    console.error("Critical Error:", error);
    process.exit(1);
  }
}

fixSchema();
