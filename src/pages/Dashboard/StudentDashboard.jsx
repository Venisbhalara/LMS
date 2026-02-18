import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import { coursesData } from "../../data/coursesData"; // Removed static data reliance

import { ClockIcon, BookIcon, PlayIcon } from "../../components/Icons/Icons";
import { getCourseImage } from "../../utils/images";
import "./Dashboard.css";

const StudentDashboard = () => {
  const { user, unenrollFromCourse } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrolled courses from API
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/enrollments/my-enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          // Map backend data to frontend structure
          const mappedCourses = data.data.map((enrollment) => ({
            id: enrollment.course_id, // Use course_id as the main ID for navigation
            enrollment_id: enrollment.id,
            title: enrollment.title,
            instructor: { name: enrollment.instructor || "Instructor" },
            category: enrollment.category || "General",
            image: enrollment.image_url, // Direct image URL from DB
            progress: enrollment.progress || 0,
            lastAccessed: enrollment.enrolled_at
              ? new Date(enrollment.enrolled_at).toLocaleDateString()
              : "Just now",
            currentLesson: "Introduction", // Placeholder as DB doesn't track exact lesson yet
            totalLessons: 10, // Placeholder
            duration: enrollment.duration || "Self-paced",
            status: enrollment.status,
          }));
          setEnrolledCourses(mappedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const lastAccessedCourse =
    enrolledCourses.length > 0 ? enrolledCourses[0] : null;

  const learningStats = {
    totalHours:
      enrolledCourses.reduce(
        (acc, curr) => acc + (parseInt(curr.duration) || 0),
        0,
      ) || 0, // Rough estimate
    coursesCompleted: enrolledCourses.filter(
      (c) => c.status === "completed" || c.progress === 100,
    ).length,
    coursesEnrolled: enrolledCourses.length,
    currentStreak: 0, // Placeholder
  };

  const handleStartQuiz = () => {
    // Redirect to first course quiz (example)
    const courseId = enrolledCourses[0]?.id;
    const quizId = "react-basics"; // can be dynamic later

    if (courseId) {
      navigate(`/course/${courseId}/quiz/${quizId}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div
          className="container"
          style={{ textAlign: "center", padding: "50px" }}
        >
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Overview Section */}
        <div className="dashboard-header dashboard-header-flex">
          <div>
            <h1>Welcome back, {user?.name || "Student"}!</h1>
            <p>Continue your learning journey and achieve your goals.</p>
          </div>

          {enrolledCourses.length > 0 && (
            <button className="start-quiz-btn" onClick={handleStartQuiz}>
              📝 Start Quiz
            </button>
          )}
        </div>

        {/* Learning Summary */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <BookIcon size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{learningStats.coursesEnrolled}</div>
              <div className="stat-label">Courses Enrolled</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{learningStats.coursesCompleted}</div>
              <div className="stat-label">Courses Completed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <ClockIcon size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{learningStats.totalHours}</div>
              <div className="stat-label">Learning Hours</div>
            </div>
          </div>
        </div>

        {/* Continue Learning - Last Accessed Course */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Continue Learning</h2>
            <Link to="/courses" className="section-link">
              Browse All Courses →
            </Link>
          </div>

          {lastAccessedCourse && (
            <div className="continue-learning-card">
              <div className="continue-learning-content">
                <div className="continue-course-icon">
                  <img
                    src={
                      lastAccessedCourse.image ||
                      getCourseImage(
                        lastAccessedCourse.id,
                        lastAccessedCourse.category,
                        lastAccessedCourse.title,
                      )
                    }
                    alt={lastAccessedCourse.title}
                    className="continue-course-image"
                  />
                </div>
                <div className="continue-course-info">
                  <h3>{lastAccessedCourse.title}</h3>
                  <p className="continue-course-instructor">
                    by {lastAccessedCourse.instructor.name}
                  </p>
                  <p className="continue-course-lesson">
                    {lastAccessedCourse.currentLesson}
                  </p>
                  <div className="continue-course-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${lastAccessedCourse.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {lastAccessedCourse.progress}% Complete
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to={`/courses/${lastAccessedCourse.id}/lessons/1`}
                className="btn btn-primary resume-btn"
              >
                <PlayIcon size={20} />
                Resume Learning
              </Link>
            </div>
          )}
        </section>

        {/* Enrolled Courses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Enrolled Courses</h2>
            <Link to="/courses" className="section-link">
              View All →
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="courses-grid">
              {enrolledCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}/lessons/1`}
                  className="course-card"
                >
                  <div className="course-card-image">
                    <img
                      src={
                        course.image ||
                        getCourseImage(course.id, course.category, course.title)
                      }
                      alt={course.title}
                      className="course-image"
                    />
                  </div>
                  <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-instructor">
                      by {course.instructor.name}
                    </p>
                    <p className="course-last-accessed">
                      Enrolled: {course.lastAccessed}
                    </p>
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="course-card-footer">
                      <span className="continue-link">Continue Learning →</span>
                      <button
                        className="btn-text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            window.confirm(
                              "Are you sure you want to remove this course?",
                            )
                          ) {
                            // Calls context unenroll, which calls API
                            // Optimistically remove from UI or re-fetch
                            unenrollFromCourse(course.id).then(() => {
                              setEnrolledCourses((current) =>
                                current.filter((c) => c.id !== course.id),
                              );
                            });
                          }
                        }}
                        style={{
                          fontSize: "0.8rem",
                          color: "#ef4444",
                          padding: "4px 8px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
