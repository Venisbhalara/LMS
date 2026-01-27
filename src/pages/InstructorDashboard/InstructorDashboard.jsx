import { useState, useEffect } from "react";
import {
  BookIcon,
  PlayIcon,
  ClockIcon,
  AwardIcon,
  TrashIcon,
} from "../../components/Icons/Icons";
import { FiLock, FiUnlock } from "react-icons/fi";
import CreateCourseModal from "../../components/CreateCourseModal/CreateCourseModal";
import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseData) => {
    try {
      // API call to create course
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      const data = await response.json();

      if (data.success) {
        // Refresh list or add to state
        setCourses((prev) => [data.data, ...prev]);
      } else {
        alert("Failed to create course: " + data.message);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error connecting to server");
    }
  };

  const updateCourse = async (courseData) => {
    try {
      const response = await fetch(`/api/courses/${courseData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      const data = await response.json();

      if (data.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === courseData.id ? data.data : c))
        );
      } else {
        alert("Failed to update course: " + data.message);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Error connecting to server");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete course: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error connecting to server");
    }
  };

  const toggleLock = async (course) => {
    try {
      const newLockStatus = !course.is_locked;
      const response = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...course, is_locked: newLockStatus }),
      });
      const data = await response.json();

      if (data.success) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === course.id ? { ...c, is_locked: newLockStatus } : c
          )
        );
      } else {
        alert("Failed to update lock status: " + data.message);
      }
    } catch (error) {
      console.error("Error updating lock status:", error);
      alert("Error connecting to server");
    }
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setSelectedCourse(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="instructor-dashboard">
      <div className="container">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Instructor Panel</h1>
          <p>
            Create inspiring courses, manage students and track your success
          </p>
        </header>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <BookIcon size={28} />
            <div>
              <span>{courses.length}</span>
              <p>Courses</p>
            </div>
          </div>

          <div className="stat-card">
            <PlayIcon size={28} />
            <div>
              <span>
                {courses.reduce((a, c) => a + (c.studentsEnrolled || 0), 0)}
              </span>
              <p>Students</p>
            </div>
          </div>

          <div className="stat-card">
            <ClockIcon size={28} />
            <div>
              <span>
                {courses.reduce(
                  (a, c) => a + (c.lessons_count || c.lessons || 0),
                  0
                )}
              </span>
              <p>Lessons</p>
            </div>
          </div>

          <div className="stat-card">
            <AwardIcon size={28} />
            <div>
              <span>
                ₹
                {courses
                  .reduce((a, c) => a + (parseFloat(c.price) || 0), 0)
                  .toFixed(2)}
              </span>
              <p>Potential Earnings</p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button className="btn btn-primary" onClick={handleCreateClick}>
              + Create Course
            </button>
          </div>

          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-top">
                    <h3>{course.title}</h3>
                    {/* <span className="course-badge">Active</span> */}
                  </div>

                  <div className="course-info">
                    <p>👥 {course.studentsEnrolled || 0} Students</p>
                    <p>
                      📚 {course.lessons_count || course.lessons || 0} Lessons
                    </p>
                    <p>
                      📝 {course.quizzes_count || course.quizzes || 0} Quizzes
                    </p>
                    <p>💰 ₹{course.price}</p>
                  </div>

                  <p className="course-update">
                    Category: {course.category || "General"}
                  </p>

                  <div className="course-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleEditClick(course)}
                    >
                      Manage
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => toggleLock(course)}
                      title={course.is_locked ? "Unlock Course" : "Lock Course"}
                    >
                      {course.is_locked ? (
                        <FiUnlock size={18} />
                      ) : (
                        <FiLock size={18} />
                      )}
                      {course.is_locked ? " Unlock" : " Lock"}
                    </button>
                    <button
                      className="btn btn-icon delete-btn"
                      onClick={() => deleteCourse(course.id)}
                      title="Delete Course"
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#ef4444",
                        padding: "14px",
                      }}
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <p>No courses found. Create your first course!</p>
              )}
            </div>
          )}
        </section>
      </div>
      <CreateCourseModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onAddCourse={addCourse}
        onEditCourse={updateCourse}
        initialData={selectedCourse}
      />
    </div>
  );
};

export default InstructorDashboard;
