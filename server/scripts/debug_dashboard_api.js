const db = require("../db");

async function debugDashboardApi() {
  try {
    console.log("Debugging Dashboard API...");

    // 1. Get a student user
    const [users] = await db.query(
      "SELECT * FROM users WHERE role = 'student' LIMIT 1",
    );
    if (users.length === 0) {
      console.log("No student found.");
      process.exit(1);
    }
    const userId = users[0].id;
    console.log(`Using User ID: ${userId}`);

    // 2. Simulate the query used in enrollments.js
    const [enrollments] = await db.query(
      `SELECT e.id, e.enrolled_at, e.progress, e.status, 
              c.id as course_id, c.title, c.description, c.instructor, c.duration, c.price, c.image_url, c.category 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = ?`,
      [userId],
    );

    console.log(`Found ${enrollments.length} enrollments.`);
    if (enrollments.length > 0) {
      console.log("First enrollment sample:");
      console.log(JSON.stringify(enrollments[0], null, 2));

      if (
        enrollments[0].image_url === undefined ||
        enrollments[0].category === undefined
      ) {
        console.error("FAIL: Missing image_url or category!");
      } else {
        console.log("PASS: Data structure looks correct for Dashboard.");
      }
    } else {
      console.log(
        "User has no enrollments. Use debug_enroll.js to add one first if needed.",
      );
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

debugDashboardApi();
