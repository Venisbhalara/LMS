import { useState, useEffect } from 'react';

/**
 * Example component demonstrating how to fetch data from the backend API
 * This component fetches and displays all courses from the database
 */
function CoursesExample() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Price:</strong> ${course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesExample;
