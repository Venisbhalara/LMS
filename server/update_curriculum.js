const db = require("./db");

async function updateCurriculum() {
  try {
    console.log("Starting curriculum update...");

    // 1. Add curriculum column if it doesn't exist
    try {
      await db.query(`
        ALTER TABLE courses 
        ADD COLUMN curriculum JSON DEFAULT NULL
      `);
      console.log("✓ Added 'curriculum' column to courses table.");
    } catch (err) {
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("⚠ 'curriculum' column already exists.");
      } else {
        throw err;
      }
    }

    // 2. Prepare sample curriculum data (matching Node.js course from frontend)
    const nodeJsCurriculum = [
      {
        id: 1,
        title: "Node.js Basics",
        lessons: [
          {
            id: 1,
            title: "Node.js Tutorial",
            duration: "40:00",
            type: "video",
            description: "Server side JS.",
          },
        ],
      },
      {
        id: 2,
        title: "Express Framework",
        lessons: [
          {
            id: 2,
            title: "Routing in Express",
            duration: "30:00",
            type: "video",
            description: "Building API routes.",
          },
          {
            id: 3,
            title: "Middleware",
            duration: "25:00",
            type: "video",
            description: "Understanding middleware functions.",
          },
        ],
      },
    ];

    const genericCurriculum = [
      {
        id: 1,
        title: "Course Introduction",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            duration: "10:00",
            type: "video",
            description: "Overview of what you will learn.",
          },
        ],
      },
    ];

    // 3. Update 'Node.js Backend Development' course
    const [nodeResult] = await db.query(
      "UPDATE courses SET curriculum = ? WHERE title LIKE '%Node.js%'",
      [JSON.stringify(nodeJsCurriculum)]
    );
    console.log(
      `✓ Updated Node.js course curriculum (${nodeResult.changedRows} rows affected).`
    );

    // 4. Update other courses with generic data if they are empty
    const [otherResult] = await db.query(
      "UPDATE courses SET curriculum = ? WHERE curriculum IS NULL",
      [JSON.stringify(genericCurriculum)]
    );
    console.log(
      `✓ Updated other courses with generic curriculum (${otherResult.changedRows} rows affected).`
    );

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating curriculum:", error);
    process.exit(1);
  }
}

updateCurriculum();
