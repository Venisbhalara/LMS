import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { coursesData } from "../../data/coursesData";

import {
  ClockIcon,
  AwardIcon,
  CertificateIcon,
  BookIcon,
  PlayIcon,
} from "../../components/Icons/Icons";
import { getCourseImage } from "../../utils/images";
import "./Dashboard.css";

const StudentDashboard = () => {
  const { user, unenrollFromCourse } = useAuth();
  const navigate = useNavigate();

  // Get enrolled courses from centralized data using user's enrolled IDs
  const enrolledCourses = user?.enrolledCourses?.map(id => {
    const course = coursesData.find(c => c.id === parseInt(id));
    if (course) {
        return {
            ...course,
            progress: 0, // In a real app, this would come from a progress tracker
            lastAccessed: "Just now",
            currentLesson: course.curriculum[0]?.lessons[0]?.title || "Introduction"
        };
    }
    return null;
  }).filter(Boolean) || [];

  const lastAccessedCourse = enrolledCourses[0];

  const achievements = [
    {
      id: 1,
      type: "certificate",
      title: "React Mastery Certificate",
      course: "Complete React Mastery",
      date: "2024-01-15",
      icon: "🎓",
    },
    {
      id: 2,
      type: "badge",
      title: "10 Day Streak",
      description: "Learned for 10 consecutive days",
      date: "2024-01-20",
      icon: "🔥",
    },
    {
      id: 3,
      type: "certificate",
      title: "Data Science Fundamentals",
      course: "Python for Data Science",
      date: "2024-01-10",
      icon: "📜",
    },
    {
      id: 4,
      type: "badge",
      title: "Quick Learner",
      description: "Completed 5 courses in a month",
      date: "2024-01-18",
      icon: "⚡",
    },
  ];

  const learningStats = {
    totalHours: 120,
    coursesCompleted: 3,
    coursesEnrolled: enrolledCourses.length,
    certificatesEarned: achievements.filter((a) => a.type === "certificate")
      .length,
    currentStreak: 7,
  };

  const handleStartQuiz = () => {
    // Redirect to first course quiz (example)
    const courseId = enrolledCourses[0]?.id;
    const quizId = "react-basics"; // can be dynamic later

    if (courseId) {
      navigate(`/course/${courseId}/quiz/${quizId}`);
    }
  };

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
          <div className="stat-card">
            <div className="stat-icon">
              <CertificateIcon size={32} />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {learningStats.certificatesEarned}
              </div>
              <div className="stat-label">Certificates Earned</div>
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
                    src={getCourseImage(
                      lastAccessedCourse.id,
                      lastAccessedCourse.category,
                      lastAccessedCourse.title
                    )}
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
                to={`/courses/${lastAccessedCourse.id}`}
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
                      src={getCourseImage(
                        course.id,
                        course.category,
                        course.title
                      )}
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
                      Last accessed: {course.lastAccessed}
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
                          if(window.confirm('Are you sure you want to remove this course?')) {
                            unenrollFromCourse(course.id);
                          }
                        }}
                        style={{ fontSize: '0.8rem', color: '#ef4444', padding: '4px 8px' }}
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

        {/* Achievements */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Achievements</h2>
          </div>

          {achievements.length > 0 ? (
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-card ${achievement.type}`}
                >
                  <div className="achievement-icon-wrapper">
                    {achievement.type === "certificate" ? (
                      <CertificateIcon
                        size={48}
                        className="achievement-icon certificate-icon"
                      />
                    ) : (
                      <AwardIcon
                        size={48}
                        className="achievement-icon badge-icon"
                      />
                    )}
                  </div>
                  <div className="achievement-info">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    {achievement.course && (
                      <p className="achievement-course">{achievement.course}</p>
                    )}
                    {achievement.description && (
                      <p className="achievement-description">
                        {achievement.description}
                      </p>
                    )}
                    <p className="achievement-date">
                      {new Date(achievement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven’t earned any achievements yet.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
