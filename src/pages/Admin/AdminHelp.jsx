import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DeleteConfirmModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import "./AdminHelp.css";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminHelp = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchHelp();
  }, [user, isAdmin, navigate]);

  const token = () => localStorage.getItem("token");

  const fetchHelp = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/help", {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) setRequests(data.data);
      else setError(data.message || "Failed to fetch help requests");
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
      const res = await fetch(`/api/admin/help/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        if (selected?.id === id) setSelected(null);
      } else alert(data.message || "Failed to delete");
    } catch {
      alert("Error connecting to server");
    }
  };

  const filtered = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="adm-layout">
        <AdminSidebar />
        <main className="adm-main-page">
          <div className="adm-main-container">
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading help requests…</p>
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
                <div className="header-icon">🆘</div>
                <div>
                  <h1>Help Requests</h1>
                  <p className="header-subtitle">
                    All support requests submitted by users
                  </p>
                </div>
              </div>
              <button className="adm-btn adm-btn-ghost" onClick={fetchHelp}>
                ↺ Refresh
              </button>
            </div>
            <div className="admin-divider" />
          </div>

          <div className="admin-stats-strip">
            <div className="stat-pill">
              <div className="stat-pill-icon rose">🆘</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{requests.length}</span>
                <span className="stat-pill-label">Total Requests</span>
              </div>
            </div>
          </div>

          <div className="admin-toolbar">
            <div className="search-box">
              🔍
              <input
                placeholder="Search by name, email, or message…"
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
                    <th>From</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data-cell">
                        <div className="no-data-inner">
                          <div className="no-data-icon">📭</div>
                          <p className="no-data-title">No help requests</p>
                          <p className="no-data-desc">
                            {search
                              ? "Try adjusting your search."
                              : "No help requests yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id}>
                        <td className="user-id">#{r.id}</td>
                        <td>
                          <div className="name-cell">
                            <div
                              className="avatar"
                              style={{
                                background:
                                  "linear-gradient(135deg,#f43f5e,#e11d48)",
                              }}
                            >
                              {r.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name-text">{r.name}</span>
                          </div>
                        </td>
                        <td className="user-email">{r.email}</td>
                        <td>
                          <button
                            className="msg-preview-btn"
                            onClick={() => setSelected(r)}
                          >
                            {r.message.length > 60
                              ? r.message.substring(0, 60) + "…"
                              : r.message}
                          </button>
                        </td>
                        <td className="user-date">
                          {formatDate(r.created_at)}
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "0.4rem" }}>
                            <button
                              className="btn-view"
                              onClick={() => setSelected(r)}
                              title="View"
                            >
                              👁
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(r.id, r.name)}
                              title="Delete"
                            >
                              🗑
                            </button>
                          </div>
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

      {selected &&
        createPortal(
          <div
            className="modal-overlay-portal"
            onClick={() => setSelected(null)}
          >
            <div
              className="admin-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-header-left">
                  <div
                    className="modal-header-icon"
                    style={{ fontSize: "1.1rem" }}
                  >
                    🆘
                  </div>
                  <div>
                    <h2>Help Request</h2>
                    <p className="modal-subtitle">
                      From {selected.name} · {selected.email}
                    </p>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelected(null)}>
                  ✕
                </button>
              </div>
              <div className="msg-modal-body">
                <p className="msg-full-text">{selected.message}</p>
                <p className="msg-date">
                  Received: {formatDate(selected.created_at)}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginTop: "1.25rem",
                  }}
                >
                  <button
                    className="adm-btn-cancel"
                    style={{ flex: 1 }}
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                  <button
                    className="adm-btn-submit adm-btn-danger"
                    style={{ flex: 1 }}
                    onClick={() => handleDelete(selected.id, selected.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        itemType="help request"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminHelp;
