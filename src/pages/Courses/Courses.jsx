import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { coursesData } from "../../data/coursesData";
import { getCourseImage } from "../../utils/images";
import { formatPrice } from "../../utils/format";
import {
  FiLock,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Courses.css";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real course data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        if (data.success) {
          // Check for lock status (can be merged if API returns everything)
          // For now, we'll just use the efficient approach of using the data directly
          // The previous lock logic is redundant if we trust this fetch
          setCourses(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "web", name: "Web Development" },
    { id: "data", name: "Data Science" },
    { id: "design", name: "Design" },
    { id: "business", name: "Business" },
    { id: "mobile", name: "Mobile Development" },
    { id: "cloud", name: "Cloud & DevOps" },
    { id: "cyber", name: "Cybersecurity" },
    { id: "ai", name: "AI & ML" },
    { id: "gov", name: "Government Exams" },
  ];

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const durations = [
    { id: "all", name: "All Durations" },
    { id: "short", name: "< 30 hours" },
    { id: "medium", name: "30-50 hours" },
    { id: "long", name: "> 50 hours" },
  ];

  const ratings = [
    { id: "all", name: "All Ratings" },
    { id: "4.5", name: "4.5+ Stars" },
    { id: "4.0", name: "4.0+ Stars" },
    { id: "3.5", name: "3.5+ Stars" },
  ];

  // Map backend data to frontend structure
  const allCourses = courses.map((course) => ({
    ...course,
    instructor:
      typeof course.instructor === "string"
        ? { name: course.instructor }
        : course.instructor || { name: "Instructor" },
    price: parseFloat(course.price) || 0,
    rating: course.rating || 4.5, // Default if missing in DB
    students: course.students || 0, // Default if missing in DB
    level: course.level || "Beginner", // Default if missing in DB
    // Use stored image_url or fallback
    // Note: getCourseImage helper might need adjustment or we bypass it if we have a direct URL
    // For now, let's keep getCourseImage usage if possible or prefer the DB url
    image_url: course.image_url,
  }));

  const getDurationCategory = (duration) => {
    const hours = parseInt(duration);
    if (hours < 30) return "short";
    if (hours <= 50) return "medium";
    return "long";
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level.toLowerCase() === selectedLevel;
    const matchesDuration =
      selectedDuration === "all" ||
      getDurationCategory(course.duration) === selectedDuration;
    const matchesRating =
      selectedRating === "all" || course.rating >= parseFloat(selectedRating);
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return (
      matchesCategory &&
      matchesLevel &&
      matchesDuration &&
      matchesRating &&
      matchesSearch
    );
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedLevel,
    selectedDuration,
    selectedRating,
    searchQuery,
  ]);

  return (
    <div className="courses-page">
      <div className="container">
        <div className="courses-header">
          <h1>All Courses</h1>
          <p>Discover courses that match your interests and goals</p>
        </div>

        <div className="courses-search">
          <input
            type="search"
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const results = allCourses.filter(
                  (course) =>
                    course.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    course.instructor.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                );
                if (results.length > 0) {
                  navigate(`/courses/${results[0].id}`);
                }
              }
            }}
            className="search-input"
          />
          <button
            className="search-btn"
            onClick={() => {
              const results = allCourses.filter(
                (course) =>
                  course.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  course.instructor.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
              );
              if (results.length > 0) {
                navigate(`/courses/${results[0].id}`);
              }
            }}
          >
            <FiSearch /> Search
          </button>
        </div>

        <div className="courses-filters-container">
          <div className="filter-group">
            <label>Category</label>
            <div className="courses-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Level</label>
            <select
              className="filter-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Duration</label>
            <select
              className="filter-select"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              {durations.map((duration) => (
                <option key={duration.id} value={duration.id}>
                  {duration.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select
              className="filter-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratings.map((rating) => (
                <option key={rating.id} value={rating.id}>
                  {rating.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="courses-results">
          <p className="results-count">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {paginatedCourses.length > 0 ? (
          <>
            <div className="courses-grid">
              {paginatedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div
                    onClick={(e) => {
                      if (course.is_locked) {
                        e.preventDefault();
                        alert(
                          "This course is currently locked by the instructor.",
                        );
                      } else {
                        navigate(`/courses/${course.id}`);
                      }
                    }}
                    className={`course-card ${
                      course.is_locked ? "course-locked" : ""
                    }`}
                    style={{
                      cursor: course.is_locked ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="course-card-image">
                      <img
                        src={
                          course.image_url ||
                          getCourseImage(
                            course.id,
                            course.category,
                            course.title,
                          )
                        }
                        alt={course.title}
                        className="course-image"
                        loading="lazy"
                      />
                      {!!course.enrolled && !course.is_locked && (
                        <div className="enrollment-badge">Enrolled</div>
                      )}

                      {!!course.is_locked && (
                        <div className="lock-overlay">
                          <FiLock className="lock-icon-3d" />
                          <div className="lock-text"> Locked</div>
                        </div>
                      )}
                    </div>
                    <div className="course-card-content">
                      <div className="course-card-category">
                        {categories.find((c) => c.id === course.category)?.name}
                      </div>
                      <h3 className="course-card-title">{course.title}</h3>
                      <p className="course-card-instructor">
                        by {course.instructor.name}
                      </p>
                      <div className="course-card-meta">
                        <div className="course-rating">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#fbbf24"
                            stroke="#fbbf24"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>{course.rating}</span>
                        </div>
                        <div className="course-students">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          {course.students.toLocaleString()}
                        </div>
                        <div className="course-duration">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {course.duration}
                        </div>
                      </div>
                      <div className="course-level">Level: {course.level}</div>
                      <div className="course-card-footer">
                        <span className="course-price">
                          {formatPrice(course.price)}
                        </span>
                        <span className="course-card-link">
                          {course.is_locked ? "Locked" : "View Course →"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                >
                  <FiChevronLeft />
                </button>
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`pagination-page ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  className="pagination-btn"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>No courses found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
