import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./AdminEnrollments.css";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const STATUS_CONFIG = {
  active: { cls: "status-active", label: "Active" },
  completed: { cls: "status-completed", label: "Completed" },
  dropped: { cls: "status-dropped", label: "Dropped" },
};

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchEnrollments();
  }, [user, isAdmin, navigate]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/enrollments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setEnrollments(data.data);
      else setError(data.message || "Failed to fetch enrollments");
    } catch {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const filtered = enrollments.filter((e) => {
    const matchSearch =
      e.student_name.toLowerCase().includes(search.toLowerCase()) ||
      e.course_title.toLowerCase().includes(search.toLowerCase()) ||
      e.student_email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || e.status === filter;
    return matchSearch && matchFilter;
  });

  if (loading)
    return (
      <div className="adm-layout">
        <AdminSidebar />
        <main className="adm-main-page">
          <div className="adm-main-container">
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading enrollments…</p>
            </div>
          </div>
        </main>
      </div>
    );

  return (
    <div className="adm-layout">
      <AdminSidebar />
      <main className="adm-main-page">
        <div className="adm-main-container">
          <div className="admin-header">
            <div className="header-content">
              <div className="header-title-group">
                <div className="header-icon">🎓</div>
                <div>
                  <h1>Enrollments</h1>
                  <p className="header-subtitle">
                    Track all student course enrollments and progress
                  </p>
                </div>
              </div>
              <div className="header-actions">
                <button
                  className="adm-btn adm-btn-ghost"
                  onClick={fetchEnrollments}
                >
                  ↺ Refresh
                </button>
              </div>
            </div>
            <div className="admin-divider" />
          </div>

          {/* Stats */}
          <div className="admin-stats-strip">
            <div className="stat-pill">
              <div className="stat-pill-icon indigo">📋</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{enrollments.length}</span>
                <span className="stat-pill-label">Total</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon green">✅</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">
                  {enrollments.filter((e) => e.status === "active").length}
                </span>
                <span className="stat-pill-label">Active</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon purple">🏆</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">
                  {enrollments.filter((e) => e.status === "completed").length}
                </span>
                <span className="stat-pill-label">Completed</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon amber">❌</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">
                  {enrollments.filter((e) => e.status === "dropped").length}
                </span>
                <span className="stat-pill-label">Dropped</span>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="admin-toolbar">
            <div className="search-box">
              🔍
              <input
                placeholder="Search by student, course, or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <div className="filter-tabs">
                {["all", "active", "completed", "dropped"].map((f) => (
                  <button
                    key={f}
                    className={`filter-tab ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <span className="filter-count-badge">
                {filtered.length} shown
              </span>
            </div>
          </div>

          {error && <div className="error-banner">⚠ {error}</div>}

          <div className="users-table-container">
            <div className="table-scroll">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Price</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="no-data-cell">
                        <div className="no-data-inner">
                          <div className="no-data-icon">📭</div>
                          <p className="no-data-title">No enrollments found</p>
                          <p className="no-data-desc">
                            {search || filter !== "all"
                              ? "Try adjusting your filters."
                              : "No enrollments yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((e) => {
                      const sc =
                        STATUS_CONFIG[e.status] || STATUS_CONFIG.active;
                      return (
                        <tr key={e.id}>
                          <td className="user-id">#{e.id}</td>
                          <td>
                            <div className="name-cell">
                              <div className="avatar">
                                {e.student_name.charAt(0).toUpperCase()}
                              </div>
                              <span className="user-name-text">
                                {e.student_name}
                              </span>
                            </div>
                          </td>
                          <td className="user-email">{e.student_email}</td>
                          <td className="user-name-text">{e.course_title}</td>
                          <td>
                            <span className="price-badge">
                              ${parseFloat(e.course_price || 0).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <div className="progress-wrap">
                              <div className="progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{ width: `${e.progress || 0}%` }}
                                />
                              </div>
                              <span className="progress-text">
                                {e.progress || 0}%
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${sc.cls}`}>
                              {sc.label}
                            </span>
                          </td>
                          <td className="user-date">
                            {formatDate(e.enrolled_at)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEnrollments;
