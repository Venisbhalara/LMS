import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import DeleteConfirmModal from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import "./AdminCourses.css";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const EMPTY_FORM = {
  title: "",
  description: "",
  instructor: "",
  duration: "",
  price: "",
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchCourses();
  }, [user, isAdmin, navigate]);

  const token = () => localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/courses", {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) setCourses(data.data);
      else setError(data.message || "Failed to fetch courses");
    } catch {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async (course) => {
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ ...course, is_locked: !course.is_locked }),
      });
      const data = await res.json();
      if (data.success)
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? data.data : c)),
        );
    } catch {
      alert("Error updating course");
    }
  };

  const handleDelete = async (id, title) => {
    setDeleteTarget({ id, name: title });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setDeleteTarget(null);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      if (data.success) setCourses((prev) => prev.filter((c) => c.id !== id));
      else alert(data.message || "Failed to delete");
    } catch {
      alert("Error connecting to server");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setModalError("");
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setForm(EMPTY_FORM);
        await fetchCourses();
      } else setModalError(data.message || "Failed to add course");
    } catch {
      setModalError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.instructor || "").toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="adm-layout">
        <AdminSidebar />
        <main className="adm-main-page">
          <div className="adm-main-container">
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading courses…</p>
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
          {/* Header */}
          <div className="admin-header">
            <div className="header-content">
              <div className="header-title-group">
                <div className="header-icon">📚</div>
                <div>
                  <h1>Course Management</h1>
                  <p className="header-subtitle">
                    Manage all courses, pricing, and availability
                  </p>
                </div>
              </div>
              <div className="header-actions">
                <button
                  className="adm-btn adm-btn-ghost"
                  onClick={fetchCourses}
                >
                  ↺ Refresh
                </button>
                <button
                  className="adm-btn adm-btn-primary"
                  onClick={() => {
                    setModalError("");
                    setShowModal(true);
                  }}
                >
                  + Add Course
                </button>
              </div>
            </div>
            <div className="admin-divider" />
          </div>

          {/* Stats */}
          <div className="admin-stats-strip">
            <div className="stat-pill">
              <div className="stat-pill-icon indigo">📚</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">{courses.length}</span>
                <span className="stat-pill-label">Total</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon green">🔓</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">
                  {courses.filter((c) => !c.is_locked).length}
                </span>
                <span className="stat-pill-label">Unlocked</span>
              </div>
            </div>
            <div className="stat-pill">
              <div className="stat-pill-icon amber">🔒</div>
              <div className="stat-pill-info">
                <span className="stat-pill-value">
                  {courses.filter((c) => c.is_locked).length}
                </span>
                <span className="stat-pill-label">Locked</span>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="admin-toolbar">
            <div className="search-box">
              🔍
              <input
                placeholder="Search by title or instructor…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <span className="filter-count-badge">
                {filtered.length} of {courses.length} shown
              </span>
            </div>
          </div>

          {error && <div className="error-banner">⚠ {error}</div>}

          {/* Table */}
          <div className="users-table-container">
            <div className="table-scroll">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="no-data-cell">
                        <div className="no-data-inner">
                          <div className="no-data-icon">📭</div>
                          <p className="no-data-title">No courses found</p>
                          <p className="no-data-desc">
                            {search
                              ? "Try adjusting your search."
                              : "No courses added yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c.id}>
                        <td className="user-id">#{c.id}</td>
                        <td className="user-name">
                          <div className="name-cell">
                            <div
                              className="avatar"
                              style={{
                                background:
                                  "linear-gradient(135deg,#10b981,#059669)",
                              }}
                            >
                              {c.title.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name-text">{c.title}</span>
                          </div>
                        </td>
                        <td className="user-email">{c.instructor || "—"}</td>
                        <td className="user-date">{c.duration || "—"}</td>
                        <td>
                          <span className="price-badge">
                            ${parseFloat(c.price || 0).toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`lock-toggle ${c.is_locked ? "locked" : "unlocked"}`}
                            onClick={() => handleToggleLock(c)}
                          >
                            {c.is_locked ? "🔒 Locked" : "🔓 Unlocked"}
                          </button>
                        </td>
                        <td className="user-date">
                          {formatDate(c.created_at)}
                        </td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(c.id, c.title)}
                            title="Delete course"
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

      {/* Add Modal */}
      {showModal &&
        createPortal(
          <div
            className="modal-overlay-portal"
            onClick={() => setShowModal(false)}
          >
            <div
              className="admin-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-header-left">
                  <div className="modal-header-icon">📚</div>
                  <div>
                    <h2>Add New Course</h2>
                    <p className="modal-subtitle">
                      Create a new course listing
                    </p>
                  </div>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAdd} className="admin-add-form">
                {modalError && (
                  <div className="error-banner">⚠ {modalError}</div>
                )}
                {[
                  {
                    id: "c-title",
                    name: "title",
                    label: "Course Title",
                    placeholder: "e.g. Introduction to React",
                    required: true,
                  },
                  {
                    id: "c-instructor",
                    name: "instructor",
                    label: "Instructor Name",
                    placeholder: "e.g. Jane Smith",
                  },
                  {
                    id: "c-duration",
                    name: "duration",
                    label: "Duration",
                    placeholder: "e.g. 8 weeks",
                  },
                  {
                    id: "c-price",
                    name: "price",
                    label: "Price (USD)",
                    placeholder: "e.g. 99.99",
                    type: "number",
                  },
                ].map((f) => (
                  <div className="form-group" key={f.id}>
                    <label htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.type || "text"}
                      value={form[f.name]}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      placeholder={f.placeholder}
                      required={f.required}
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="c-desc">Description</label>
                  <textarea
                    id="c-desc"
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Course description…"
                    rows={3}
                    style={{
                      padding: "0.8rem 1.1rem",
                      borderRadius: "10px",
                      border: "1.5px solid #e5e7eb",
                      background: "#fafafa",
                      fontFamily: "inherit",
                      fontSize: "0.9375rem",
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="adm-btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="adm-btn-submit"
                    disabled={isSaving}
                  >
                    {isSaving ? "Creating…" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        itemType="course"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminCourses;
