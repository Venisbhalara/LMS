import { useState, useEffect } from 'react';

function UserDashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch user's enrolled courses (placeholder for now)
    // TODO: Implement enrollment API
    setEnrolledCourses([]);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) {
      onLogout();
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!user) {
    return <div className="dashboard-error">Please login to view your dashboard</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-user-info">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="dashboard-title">Welcome, {user.name}!</h1>
            <p className="dashboard-subtitle">{user.email}</p>
            <span className="user-role-badge">{user.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2 className="section-title">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="empty-state">
              <p>You haven't enrolled in any courses yet.</p>
              <a href="/courses" className="browse-courses-link">Browse Courses</a>
            </div>
          ) : (
            <div className="courses-grid">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                    <span>{course.progress || 0}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Account Information</h2>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role:</span>
              <span className="info-value">{user.role}</span>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .dashboard-user-info {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 0.25rem;
        }

        .dashboard-subtitle {
          color: #718096;
          margin-bottom: 0.5rem;
        }

        .user-role-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #edf2f7;
          color: #667eea;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .logout-button {
          padding: 0.75rem 1.5rem;
          background: #f56565;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: #e53e3e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 101, 101, 0.4);
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1.5rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .browse-courses-link {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .browse-courses-link:hover {
          transform: translateY(-2px);
        }

        .info-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
        }

        .info-label {
          font-weight: 600;
          color: #4a5568;
        }

        .info-value {
          color: #1a202c;
        }

        .dashboard-loading,
        .dashboard-error {
          text-align: center;
          padding: 3rem;
          font-size: 1.25rem;
          color: #718096;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }

          .dashboard-user-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default UserDashboard;
