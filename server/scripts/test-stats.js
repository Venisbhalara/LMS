const db = require("../db");

async function testStats() {
  try {
    console.log("Testing dashboard stats query...");
    const [[{ users }]] = await db.query("SELECT COUNT(*) AS users FROM users");
    const [[{ courses }]] = await db.query("SELECT COUNT(*) AS courses FROM courses");
    const [[{ enrollments }]] = await db.query("SELECT COUNT(*) AS enrollments FROM enrollments");
    const [[{ messages }]] = await db.query("SELECT COUNT(*) AS messages FROM contact_messages");
    const [[{ help }]] = await db.query("SELECT COUNT(*) AS help FROM help_requests");
    const [[{ careers }]] = await db.query("SELECT COUNT(*) AS careers FROM job_applications");

    console.log(JSON.stringify({ 
      success: true, 
      stats: { users, courses, enrollments, messages, help, careers } 
    }));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ 
      success: false, 
      message: err.message,
      code: err.code
    }));
    process.exit(1);
  }
}

testStats();
