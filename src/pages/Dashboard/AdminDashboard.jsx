import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'

const AdminDashboard = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Users', value: '45,230', icon: '👥', trend: '+12%' },
    { label: 'Total Courses', value: '1,245', icon: '📚', trend: '+5%' },
    { label: 'Active Instructors', value: '342', icon: '👨‍🏫', trend: '+8%' },
    { label: 'Monthly Revenue', value: '124,500', icon: '💰', trend: '+15%' }
  ]

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', joinDate: '2 days ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', joinDate: '3 days ago' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'student', joinDate: '4 days ago' }
  ]

  const recentCourses = [
    { id: 1, title: 'Complete React Mastery', instructor: 'John Doe', students: 12500, status: 'published' },
    { id: 2, title: 'Python Basics', instructor: 'Jane Smith', students: 8900, status: 'published' },
    { id: 3, title: 'New Course Draft', instructor: 'Bob Wilson', students: 0, status: 'pending' }
  ]

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}! Overview of your platform's performance and activity.</p>
        </div>

        <div className="dashboard-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card admin-stat-card"> 
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-trend positive">{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Users</h2>
              <Link to="/admin/users" className="section-link">View All →</Link>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button className="btn-link">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Courses</h2>
              <Link to="/admin/courses" className="section-link">View All →</Link>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCourses.map(course => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.instructor}</td>
                      <td>{course.students.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge status-${course.status}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-link">Review</button>  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/admin/users" className="action-card">
              <div className="action-icon">👥</div>
              <div className="action-title">Manage Users</div>
            </Link>
            <Link to="/admin/courses" className="action-card">
              <div className="action-icon">📚</div>
              <div className="action-title">Manage Courses</div>
            </Link>
            <Link to="/admin/instructors" className="action-card">
              <div className="action-icon">👨‍🏫</div>
              <div className="action-title">Manage Instructors</div>
            </Link>
            <Link to="/admin/analytics" className="action-card">
              <div className="action-icon">📊</div>
              <div className="action-title">View Analytics</div>
            </Link>
            <Link to="/admin/settings" className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-title">Platform Settings</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard

