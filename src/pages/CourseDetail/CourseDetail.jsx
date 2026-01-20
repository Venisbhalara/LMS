import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  StarIcon,
  PlayIcon,
  BookIcon,
  ClockIcon,
  UsersIcon,
  CertificateIcon,
} from "../../components/Icons/Icons";
import { getCourseImage, getInstructorAvatar } from "../../utils/images";
import { coursesData } from "../../data/coursesData";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrollInCourse, isEnrolled, isAuthenticated } = useAuth();

  const course = coursesData.find((c) => c.id === parseInt(id));

  // const [course, setCourse] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     // ... API call code ...
  //   }
  //   if (id) fetchCourse();
  // }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Use the fetched course ID
    const result = await enrollInCourse(course.id);
    if (result.success) {
      navigate("/dashboard");
    } else {
      alert("Failed to enroll: " + result.message);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/enrollments/${id}/download`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseData: course }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${course.title.replace(/[^a-zA-Z0-9]/g, "_")}_Details.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert(error.message || "Failed to download course details.");
    }
  };

  const courseId = parseInt(id);
  const enrolled = isEnrolled(courseId);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  if (!course) {
    return (
      <div
        className="course-detail-error"
        style={{ textAlign: "center", padding: "100px" }}
      >
        <h2>Course not found</h2>
        <Link
          to="/courses"
          className="btn btn-primary"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const totalLessons =
    course.curriculum?.reduce(
      (sum, section) => sum + (section.lessons?.length || 0),
      0
    ) || 0;
  const previewLessons =
    course.curriculum?.flatMap(
      (section) => section.lessons?.filter((lesson) => lesson.preview) || []
    ) || [];

  return (
    <div className="course-detail">
      <div className="container">
        {/* Course Hero Section */}
        <motion.div
          className="course-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="course-hero-content">
            {/* <div className="course-badge">{course.category}</div> */}
            <h1>{course.title}</h1>
            <p className="course-instructor">
              by {course.instructor?.name || "Instructor"}
            </p>
            <p className="course-description">{course.description}</p>

            <div className="course-meta">
              <div className="course-meta-item">
                <span className="meta-label">Rating</span>
                <span className="meta-value">
                  <StarIcon
                    size={18}
                    style={{
                      display: "inline",
                      marginRight: "4px",
                      fill: "#fbbf24",
                    }}
                  />
                  {course.rating} ({course.totalRatings.toLocaleString()})
                </span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Students</span>
                <span className="meta-value">
                  👥 {course.students.toLocaleString()}
                </span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">⏱️ {course.duration}</span>
              </div>
              <div className="course-meta-item">
                <span className="meta-label">Level</span>
                <span className="meta-value">{course.level}</span>
              </div>
            </div>

            <div className="course-actions">
              {enrolled ? (
                <>
                  <Link
                    to={`/courses/${id}/lessons/1`}
                    className="btn btn-primary btn-large"
                  >
                    <PlayIcon size={20} style={{ marginRight: "8px" }} />
                    Continue Learning
                  </Link>
                  <button
                    className={`btn btn-outline btn-large ${
                      isWishlisted ? "wishlisted" : ""
                    }`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    {isWishlisted ? "❤️" : "🤍"} Wishlist
                  </button>
                  <button
                    className="btn btn-outline btn-large"
                    onClick={handleDownload}
                    style={{
                      marginLeft: "10px",
                      borderColor: "#2563eb",
                      color: "#2563eb",
                    }}
                  >
                    📥 Download File
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-large"
                    onClick={handleEnroll}
                  >
                    Enroll Now - ₹{course.price}
                  </button>
                  <button
                    className={`btn btn-outline btn-large ${
                      isWishlisted ? "wishlisted" : ""
                    }`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    {isWishlisted ? "❤️" : "🤍"} Wishlist
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="course-hero-visual">
            <div className="course-image-large">
              <img
                src={course.image}
                alt={course.title}
                className="course-hero-image"
              />
            </div>
          </div>
        </motion.div>

        <div className="course-content">
          <div className="course-main">
            {/* Learning Outcomes */}
            <section className="course-section">
              <h2>What You'll Learn</h2>
              <ul className="learning-list">
                {course.whatYouWillLearn?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <li>Content coming soon</li>}
              </ul>
            </section>

            {/* Instructor Section */}
            <section className="course-section">
              <h2>Your Instructor</h2>
              <div className="instructor-card">
                {/* <div className="instructor-avatar">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="instructor-avatar-img"
                  />
                </div> */}
                <div className="instructor-info">
                  <h3>{course.instructor?.name || "Instructor Name"}</h3>
                  <p className="instructor-title">
                    {course.instructor?.title || "Course Instructor"}
                  </p>
                  <div className="instructor-stats">
                    <div className="instructor-stat-item">
                      <StarIcon size={16} style={{ fill: "#fbbf24" }} />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="instructor-stat-item">
                      <UsersIcon size={16} />
                      <span>
                        {(course.instructor?.students || 0).toLocaleString()}{" "}
                        Clients
                      </span>
                    </div>
                    <div className="instructor-stat-item">
                      <BookIcon size={16} />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  <p className="instructor-bio">{course.instructor.bio}</p>
                  <div className="instructor-credentials">
                    <h4>Credentials</h4>
                    <ul>
                      {course.instructor?.credentials?.map((cred, index) => (
                        <li key={index}>{cred}</li>
                      )) || <li>Certified Instructor</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Curriculum Preview */}
            <section className="course-section">
              <div className="section-header-flex">
                <h2>Course Curriculum</h2>
                <span className="curriculum-stats">
                  {course.curriculum.length} sections • {totalLessons} lessons
                </span>
              </div>
              <div className="curriculum-list">
                {course.curriculum?.map((section, sectionIndex) => (
                  <div
                    key={section.id || sectionIndex}
                    className="curriculum-section"
                  >
                    <button
                      className="curriculum-section-header"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="section-header-left">
                        <span className="section-toggle">
                          {expandedSections[section.id] ? "▼" : "▶"}
                        </span>
                        <div>
                          <h3 className="section-title">{section.title}</h3>
                          <span className="section-lesson-count">
                            {section.lessons.length} lessons
                          </span>
                        </div>
                      </div>

                      <span className="section-duration">
                        {section.lessons?.reduce((sum, lesson) => {
                          const mins =
                            parseInt((lesson.duration || "0:0").split(":")[0]) *
                              60 +
                            parseInt((lesson.duration || "0:0").split(":")[1]);
                          return sum + mins;
                        }, 0)}{" "}
                        min
                      </span>
                    </button>
                    {expandedSections[section.id] && (
                      <div className="curriculum-lessons">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <Link
                            key={lesson.id}
                            to={
                              lesson.preview || enrolled
                                ? `/courses/${id}/lessons/${lesson.id}`
                                : "#"
                            }
                            className={`lesson-item ${
                              lesson.preview ? "preview-lesson" : ""
                            } ${!enrolled && !lesson.preview ? "locked" : ""}`}
                          >
                            <div className="lesson-number">
                              {lessonIndex + 1}
                            </div>
                            <div className="lesson-info">
                              <div className="lesson-title-row">
                                <span className="lesson-title">
                                  {lesson.title}
                                </span>
                                {lesson.preview && (
                                  <span className="preview-badge">Preview</span>
                                )}
                              </div>
                              <div className="lesson-meta">
                                <span className="lesson-type">
                                  {lesson.type}
                                </span>
                                <span className="lesson-duration">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                            {enrolled || lesson.preview ? (
                              <div className="lesson-play">▶</div>
                            ) : (
                              <div className="lesson-lock">🔒</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews & Ratings */}
            <section className="course-section">
              <div className="reviews-header">
                <div>
                  <h2>Student Reviews</h2>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <span className="rating-value">{course.rating}</span>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size={24}
                            style={{
                              fill:
                                i < Math.floor(course.rating)
                                  ? "#fbbf24"
                                  : "#e5e7eb",
                            }}
                          />
                        ))}
                      </div>
                      <span className="rating-count">
                        ({course.totalRatings.toLocaleString()} ratings)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reviews-list">
                {course.reviews?.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-user">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="review-avatar"
                        />
                        <div>
                          <div className="review-name">{review.user.name}</div>
                          <div className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size={16}
                            style={{
                              fill: i < review.rating ? "#fbbf24" : "#e5e7eb",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="course-sidebar">
            <div className="sidebar-card">
              {!enrolled && (
                <div className="course-price-large">₹{course.price}</div>
              )}
              {isAuthenticated && enrolled ? (
                <Link
                  to={`/courses/${id}/lessons/1`}
                  className="btn btn-primary btn-large btn-full"
                >
                  <PlayIcon size={20} style={{ marginRight: "8px" }} />
                  Continue Learning
                </Link>
              ) : isAuthenticated ? (
                <button
                  className="btn btn-primary btn-large btn-full"
                  onClick={() => {
                    enrollInCourse(courseId);
                    navigate(`/courses/${id}/lessons/1`);
                  }}
                >
                  Enroll in Course
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-large btn-full"
                >
                  Login to Enroll
                </Link>
              )}
              <div className="sidebar-features">
                <div className="sidebar-feature">
                  <CertificateIcon size={20} />
                  <span>Certificate of completion</span>
                </div>
                <div className="sidebar-feature">
                  <ClockIcon size={20} />
                  <span>Lifetime access</span>
                </div>
                <div className="sidebar-feature">
                  <BookIcon size={20} />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="sidebar-feature">
                  <span>✅ 30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
