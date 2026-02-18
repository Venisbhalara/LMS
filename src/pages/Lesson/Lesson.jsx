import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { coursesData } from "../../data/coursesData"; // Removed static data reliance
import "./Lesson.css";
import CourseCompletionModal from "../../components/CourseCompletionModal";

const Lesson = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);
        const data = await response.json();

        if (data.success) {
          setCourse(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    // Reset state on lesson change if needed
    setIsComplete(false);
  }, [id, lessonId]);

  if (loading)
    return <div className="loading-state">Loading lesson content...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!course) return <div className="error-state">Course not found</div>;

  // Flatten lessons to find the current one easily
  // Handle case where curriculum might be empty
  const allLessons = course.curriculum
    ? course.curriculum.flatMap((section) => section.lessons)
    : [];

  if (allLessons.length === 0) {
    return (
      <div className="container" style={{ padding: "50px" }}>
        No lessons available for this course yet.
      </div>
    );
  }

  const currentLesson = allLessons.find((l) => l.id === parseInt(lessonId));

  // If lesson not found, default to first or show error
  const lesson = currentLesson || allLessons[0];

  const handleComplete = async () => {
    const newState = !isComplete;
    setIsComplete(newState);

    if (newState && !nextLesson) {
      // Course Completed! Update backend first.
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`/api/enrollments/${id}/progress`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              progress: 100,
              status: "completed",
            }),
          });
          const data = await response.json();
          if (!data.success) {
            console.error("Failed to update progress:", data.message);
          }
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
      setShowCompletionModal(true);
    }
  };

  // Find next lesson for navigation
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  return (
    <div className="lesson-page">
      <div className="container">
        <div className="lesson-header">
          <Link to={`/courses/${id}`} className="back-link">
            ← Back to Course
          </Link>
          <h1>{lesson.title}</h1>
        </div>

        <div className="lesson-content">
          <div className="lesson-main">
            <div className="video-container">
              <div
                className="video-placeholder"
                onClick={() =>
                  window.open(
                    lesson.videoUrl || "https://www.youtube.com",
                    "_blank",
                  )
                }
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div className="play-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    className="youtube-icon"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <p>Click to Watch Video</p>
                <p className="video-note">Playing: {lesson.title}</p>
                <p
                  className="video-subnote"
                  style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "5px" }}
                >
                  (Opens in new tab)
                </p>
              </div>
            </div>

            <div className="lesson-description">
              <h2>About this lesson</h2>
              <p>{lesson.description}</p>
            </div>

            <div
              className="lesson-text-content"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />

            <div className="lesson-actions">
              <button
                className={`btn ${isComplete ? "btn-success" : "btn-primary"} btn-large`}
                onClick={handleComplete}
              >
                {isComplete ? "✓ Lesson Completed" : "Mark as Complete"}
              </button>

              <div
                className="lesson-nav-buttons"
                style={{ marginTop: "20px", display: "flex", gap: "10px" }}
              >
                {prevLesson && (
                  <button
                    onClick={() =>
                      navigate(`/courses/${id}/lessons/${prevLesson.id}`)
                    }
                    className="btn btn-outline"
                  >
                    Previous
                  </button>
                )}
                {nextLesson && (
                  <button
                    onClick={() =>
                      navigate(`/courses/${id}/lessons/${nextLesson.id}`)
                    }
                    className="btn btn-outline"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="lesson-sidebar">
            <div className="lesson-navigation">
              <h3>{course.title} Content</h3>
              <div className="nav-lessons">
                {course.curriculum &&
                  course.curriculum.map((section) => (
                    <div key={section.id} className="nav-section">
                      <h4
                        style={{
                          padding: "0 15px",
                          color: "#64748b",
                          fontSize: "0.9rem",
                        }}
                      >
                        {section.title}
                      </h4>
                      {section.lessons.map((l) => (
                        <Link
                          key={l.id}
                          to={`/courses/${id}/lessons/${l.id}`}
                          className={`nav-lesson ${l.id === lesson.id ? "active" : ""}`}
                        >
                          <span className="nav-lesson-number">{l.id}</span>
                          <span className="nav-lesson-title">{l.title}</span>
                          <span
                            className="nav-lesson-duration"
                            style={{
                              marginLeft: "auto",
                              fontSize: "0.8rem",
                              color: "#94a3b8",
                            }}
                          >
                            {l.duration}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <CourseCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        courseId={id}
      />
    </div>
  );
};

export default Lesson;
