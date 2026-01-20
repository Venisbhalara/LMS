const db = require('../db');

async function listCourses() {
  try {
    const [courses] = await db.query('SELECT id, title FROM courses');
    console.log('Courses in DB:', courses);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listCourses();
