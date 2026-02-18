const db = require("../db");

async function checkCoreTables() {
  try {
    const [courses] = await db.query("SHOW TABLES LIKE 'courses'");
    if (courses.length > 0) console.log("Found table: courses");
    else console.log("Table 'courses' does NOT exist");

    const [users] = await db.query("SHOW TABLES LIKE 'users'");
    if (users.length > 0) console.log("Found table: users");
    else console.log("Table 'users' does NOT exist");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkCoreTables();
