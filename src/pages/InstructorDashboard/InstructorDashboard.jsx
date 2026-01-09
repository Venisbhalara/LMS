import { useState } from "react";
import {
  BookIcon,
  PlayIcon,
  ClockIcon,
  AwardIcon,
} from "../../components/Icons/Icons";
import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Mastery",
      studentsEnrolled: 120,
      lessons: 40,
      quizzes: 10,
      earnings: 1200,
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Python for Data Science",
      studentsEnrolled: 90,
      lessons: 50,
      quizzes: 8,
      earnings: 900,
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Node.js for Beginners",
      studentsEnrolled: 70,
      lessons: 60,
      quizzes: 9,
      earnings: 2900,
      lastUpdated: "2 weeks ago",
    },
    {
      id: 4,
      title: "JavaScript for Beginners",
      studentsEnrolled: 80,
      lessons: 70,
      quizzes: 10,
      earnings: 3500,
      lastUpdated: "3 weeks ago",
    },
    {
      id: 5,
      title: "Mern Stack",
      studentsEnrolled: 90,
      lessons: 80,
      quizzes: 12,
      earnings: 4000,
      lastUpdated: "4 weeks ago",
    },
    {
      id: 6,
      title: "fullstack with developement",
      studentsEnrolled: 100,
      lessons: 90,
      quizzes: 15,
      earnings: 4500,
      lastUpdated: "5 weeks ago",
    },
  ]);

  const addCourse = (course) => {
    setCourses((prev) => [course, ...prev]);
  };

  return (
    <div className="instructor-dashboard">
      <div className="container">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Instructor Panel</h1>
          <p>
            Create inspiring courses, manage students and track your success
          </p>
        </header>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <BookIcon size={28} />
            <div>
              <span>{courses.length}</span>
              <p>Courses</p>
            </div>
          </div>

          <div className="stat-card">
            <PlayIcon size={28} />
            <div>
              <span>
                {courses.reduce((a, c) => a + c.studentsEnrolled, 0)}
              </span>
              <p>Students</p>
            </div>
          </div>

          <div className="stat-card">
            <ClockIcon size={28} />
            <div>
              <span>{courses.reduce((a, c) => a + c.lessons, 0)}</span>
              <p>Lessons</p>
            </div>
          </div>

          <div className="stat-card">
            <AwardIcon size={28} />
            <div>
              <span>₹{courses.reduce((a, c) => a + c.earnings, 0)}</span>
              <p>Earnings</p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              + Create Course
            </button>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-top">
                  <h3>{course.title}</h3>
                  <span className="course-badge">Active</span>
                </div>

                <div className="course-info">
                  <p>👥 {course.studentsEnrolled} Students</p>
                  <p>📚 {course.lessons} Lessons</p>
                  <p>📝 {course.quizzes} Quizzes</p>
                  <p>💰 ₹{course.earnings}</p>
                </div>

                <p className="course-update">
                  Updated {course.lastUpdated}
                </p>

                <div className="course-actions">
                  <button className="btn btn-outline">Edit</button>
                  <button className="btn btn-outline">Students</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showModal && (
        <CreateCourseModal
          onClose={() => setShowModal(false)}
          onCreate={addCourse}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
