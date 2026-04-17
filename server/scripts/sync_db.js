const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const seedCourses = require("../utils/seedCourses");

/**
 * Sync Database script
 * This script will reset the courses table and seed it with the clean 19 courses.
 */
async function sync() {
  console.log("==========================================");
  console.log("   LMS DATABASE SYNCHRONIZATION TOOL");
  console.log("==========================================");
  console.log(`Connecting to: ${process.env.DB_HOST || "localhost"}`);
  console.log(`Database: ${process.env.DB_NAME || "lms_database"}`);
  console.log("------------------------------------------");

  try {
    await seedCourses();
    console.log("------------------------------------------");
    console.log("✓ SUCCESS: Database synchronized.");
    console.log("==========================================");
  } catch (error) {
    console.error("------------------------------------------");
    console.error("✖ FAILED: Synchronization failed.");
    console.error(error);
    console.log("==========================================");
    process.exit(1);
  }
}

sync();
