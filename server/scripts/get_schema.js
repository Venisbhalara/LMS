const db = require("../db");

async function getSchema() {
  try {
    const [columns] = await db.query("DESCRIBE courses");
    console.log(JSON.stringify(columns.map((c) => c.Field)));
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

getSchema();
