import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DeleteConfirmModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import "./AdminCareers.css";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminCareers = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchApps();
  }, [user, isAdmin, navigate]);

  const token = () => localStorage.getItem("token");

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/careers", {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) setApps(data.data);
      else setError(data.message || "Failed to fetch applications");
    } catch {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setDeleteTarget(null);
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) setApps((prev) => prev.filter((a) => a.id !== id));
      else alert(data.message || "Failed to delete");
    } catch {
      alert("Error connecting to server");
    }
  };

  const filtered = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      (a.role || "").toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="adm-layout">
        <AdminSidebar />
        <main className="adm-main-page">
          <div className="adm-main-container">
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading applications…</p>
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
                <div className="header-icon">💼</div>
                <div>
                  <h1>Job Applications</h1>
                  <p className="header-subtitle">
                    All job applications submitted via the Careers page
                  </p>
                </div>
              </div>
              <button className="adm-btn adm-btn-ghost" onClick={fetchApps}>
                ↺ Refresh
              </button>
            </div>
            <div className="admin-divider" />
          </div>

          <div className="admin-stats-strip">
            <div className="stat-pill">
              <div className="stat-pill-icon sky">💼</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{apps.length}</span>
                <span className="stat-pill-label">Total Applications</span>
              </div>
            </div>
          </div>

          <div className="admin-toolbar">
            <div className="search-box">
              🔍
              <input
                placeholder="Search by name, email, or role…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
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
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Role Applied</th>
                    <th>Resume</th>
                    <th>Applied On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data-cell">
                        <div className="no-data-inner">
                          <div className="no-data-icon">📭</div>
                          <p className="no-data-title">No applications found</p>
                          <p className="no-data-desc">
                            {search
                              ? "Try adjusting your search."
                              : "No job applications yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((a) => (
                      <tr key={a.id}>
                        <td className="user-id">#{a.id}</td>
                        <td>
                          <div className="name-cell">
                            <div
                              className="avatar"
                              style={{
                                background:
                                  "linear-gradient(135deg,#0ea5e9,#0284c7)",
                              }}
                            >
                              {a.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name-text">{a.name}</span>
                          </div>
                        </td>
                        <td className="user-email">{a.email}</td>
                        <td>
                          <span className="role-tag">{a.role || "—"}</span>
                        </td>
                        <td>
                          {a.resume_path ? (
                            <a
                              href={`/${a.resume_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resume-link"
                            >
                              📄 Download
                            </a>
                          ) : (
                            <span style={{ color: "#9ca3af" }}>—</span>
                          )}
                        </td>
                        <td className="user-date">
                          {formatDate(a.applied_at)}
                        </td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(a.id, a.name)}
                            title="Delete"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        itemType="application"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminCareers;
