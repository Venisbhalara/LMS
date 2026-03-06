import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./AdminDashboard.css";

const STAT_CARDS = [
  {
    key: "users",
    label: "Total Users",
    icon: "👥",
    color: "indigo",
    link: "/admin/users",
  },
  {
    key: "courses",
    label: "Courses",
    icon: "📚",
    color: "purple",
    link: "/admin/courses",
  },
  {
    key: "enrollments",
    label: "Enrollments",
    icon: "🎓",
    color: "green",
    link: "/admin/enrollments",
  },
  {
    key: "messages",
    label: "Messages",
    icon: "✉️",
    color: "amber",
    link: "/admin/messages",
  },
  {
    key: "help",
    label: "Help Requests",
    icon: "🆘",
    color: "rose",
    link: "/admin/help",
  },
  {
    key: "careers",
    label: "Applications",
    icon: "💼",
    color: "sky",
    link: "/admin/careers",
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchStats();
  }, [user, isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-layout">
      <AdminSidebar />
      <main className="adm-main-page">
        <div className="adm-main-container">
          {/* Header */}
          <div className="admin-header">
            <div className="header-content">
              <div className="header-title-group">
                <div className="header-icon">🏠</div>
                <div>
                  <h1>Admin Dashboard</h1>
                  <p className="header-subtitle">
                    Welcome back — here's your platform at a glance
                  </p>
                </div>
              </div>
            </div>
            <div className="admin-divider" />
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading stats…</p>
            </div>
          ) : (
            <>
              <div className="adm-dash-grid">
                {STAT_CARDS.map(({ key, label, icon, color, link }) => (
                  <Link
                    to={link}
                    key={key}
                    className={`adm-dash-card color-${color}`}
                  >
                    <div className="adm-dash-card-icon">{icon}</div>
                    <div className="adm-dash-card-body">
                      <span className="adm-dash-card-value">
                        {stats ? stats[key] : "—"}
                      </span>
                      <span className="adm-dash-card-label">{label}</span>
                    </div>
                    <div className="adm-dash-card-arrow">→</div>
                  </Link>
                ))}
              </div>

              {/* Quick Links */}
              <div className="adm-dash-section-title">Quick Access</div>
              <div className="adm-quick-links">
                {[
                  {
                    to: "/admin/users",
                    label: "Manage Users",
                    desc: "Add, delete, manage roles",
                    icon: "👥",
                  },
                  {
                    to: "/admin/courses",
                    label: "Manage Courses",
                    desc: "Add, lock/unlock, delete",
                    icon: "📚",
                  },
                  {
                    to: "/admin/enrollments",
                    label: "View Enrollments",
                    desc: "Track student progress",
                    icon: "🎓",
                  },
                  {
                    to: "/admin/messages",
                    label: "Contact Messages",
                    desc: "Read & delete messages",
                    icon: "✉️",
                  },
                  {
                    to: "/admin/help",
                    label: "Help Requests",
                    desc: "View support tickets",
                    icon: "🆘",
                  },
                  {
                    to: "/admin/careers",
                    label: "Job Applications",
                    desc: "Review applicants & resumes",
                    icon: "💼",
                  },
                ].map(({ to, label, desc, icon }) => (
                  <Link key={to} to={to} className="adm-quick-link">
                    <span className="adm-quick-icon">{icon}</span>
                    <div>
                      <p className="adm-quick-title">{label}</p>
                      <p className="adm-quick-desc">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
