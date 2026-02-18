const db = require("../db");

async function debugCurriculum() {
  try {
    console.log("Debugging Curriculum API logic...");

    // 1. Get a course ID (e.g. React Mastery if it exists, or just first one)
    const [courses] = await db.query("SELECT * FROM courses LIMIT 1");
    if (courses.length === 0) {
      console.log("No courses found.");
      process.exit(1);
    }
    const course = courses[0];
    console.log(`Checking Course: ${course.title} (ID: ${course.id})`);

    // 2. Fetch Sections
    const [sections] = await db.query(
      "SELECT * FROM sections WHERE course_id = ? ORDER BY order_index ASC",
      [course.id],
    );
    console.log(`Found ${sections.length} sections.`);

    if (sections.length > 0) {
      // 3. Fetch Lessons
      const sectionIds = sections.map((s) => s.id);
      const [lessons] = await db.query(
        `SELECT * FROM lessons WHERE section_id IN (?) ORDER BY order_index ASC`,
        [sectionIds],
      );
      console.log(`Found ${lessons.length} lessons total.`);

      // 4. Construct Nested
      const curriculum = sections.map((section) => ({
        id: section.id,
        title: section.title,
        lessons: lessons
          .filter((l) => l.section_id === section.id)
          .map((l) => ({
            id: l.id,
            title: l.title,
          })),
      }));

      console.log("Curriculum Structure Sample:");
      console.log(JSON.stringify(curriculum, null, 2));
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

debugCurriculum();
