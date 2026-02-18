const db = require("../db");

async function listTables() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    console.log("Tables in database:");
    rows.forEach((row) => {
      console.log(Object.values(row)[0]);
    });

    // Also describe enrollments
    try {
      const [columns] = await db.query("DESCRIBE enrollments");
      console.log(
        "\nenrollments schema:",
        JSON.stringify(columns.map((c) => c.Field)),
      );
    } catch (e) {
      console.log("\nError describing enrollments:", e.message);
    }

    // Also describe student_enrollments
    try {
      const [columns] = await db.query("DESCRIBE student_enrollments");
      console.log(
        "\nstudent_enrollments schema:",
        JSON.stringify(columns.map((c) => c.Field)),
      );
    } catch (e) {
      console.log("\nError describing student_enrollments:", e.message);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

listTables();
