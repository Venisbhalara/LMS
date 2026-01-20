const db = require('../db');

async function createView() {
  try {
    const query = `
      CREATE OR REPLACE VIEW enrollment_summary AS
      SELECT 
          e.id AS enrollment_id,
          u.name AS student_name,
          u.email AS student_email,
          c.title AS course_title,
          c.price AS course_price,
          e.enrolled_at,
          e.status
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrolled_at DESC;
    `;

    await db.query(query);
    console.log('✓ Successfully created enrollment_summary VIEW');
    process.exit(0);
  } catch (error) {
    console.error('Error creating view:', error);
    process.exit(1);
  }
}

createView();
