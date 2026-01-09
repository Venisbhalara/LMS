import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'

const InstructorDashboard = () => {
  const { user } = useAuth()

  // Mock instructor courses - in real app, fetch from API
  const myCourses = [
    { id: 1, title: 'Complete React Mastery', students: 12500, rating: 4.8, status: 'published', image: '⚛️' },
    { id: 2, title: 'Advanced JavaScript', students: 8900, rating: 4.9, status: 'published', image: '💻' },
    { id: 3, title: 'Node.js Backend Development', students: 0, rating: 0, status: 'draft', image: '🟢' }
  ]

  const stats = [
    { label: 'Total Courses', value: myCourses.length, icon: '📚' },
    { label: 'Total Students', value: '21,400', icon: '👥' },
    { label: 'Average Rating', value: '4.85', icon: '⭐' },
    { label: 'Total Revenue', value: '$12,450', icon: '💰' }
  ]

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Instructor Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your courses and track your teaching impact.</p>
        </div>

        <div className="dashboard-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <Link to="/instructor/courses/create" className="section-link">+ Create New Course</Link>
          </div>

          <div className="courses-grid">
            {myCourses.map(course => (
              <div key={course.id} className="course-card instructor-course-card">
                <div className="course-card-image">
                  <div className="course-emoji">{course.image}</div>
                  <span className={`course-status course-status-${course.status}`}>
                    {course.status}
                  </span>
                </div>
                <div className="course-card-content">
                  <h3 className="course-card-title">{course.title}</h3>
                  <div className="instructor-course-stats">
                    <div className="instructor-stat">
                      <span className="stat-label">Students:</span>
                      <span className="stat-value">{course.students.toLocaleString()}</span>
                    </div>
                    {course.rating > 0 && (
                      <div className="instructor-stat">
                        <span className="stat-label">Rating:</span>
                        <span className="stat-value">⭐ {course.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="course-card-footer">
                    <Link to={`/instructor/courses/${course.id}`} className="btn btn-primary btn-small">
                      Manage
                    </Link>
                    <Link to={`/courses/${course.id}`} className="btn btn-outline btn-small">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p className="activity-title">New enrollment in "Complete React Mastery"</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">⭐</div>
              <div className="activity-content">
                <p className="activity-title">New review received for "Advanced JavaScript"</p>
                <p className="activity-time">5 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">💬</div>
              <div className="activity-content">
                <p className="activity-title">New question in course discussion</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InstructorDashboard

