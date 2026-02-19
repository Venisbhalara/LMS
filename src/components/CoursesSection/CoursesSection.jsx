import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/format";
import "./CoursesSection.css";

/* =========================
   STATIC DATA (MOVE TO API LATER)
========================= */

const CATEGORIES = [
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

const CATEGORY_MAP = CATEGORIES.reduce((acc, cur) => {
  acc[cur.id] = cur.name;
  return acc;
}, {});

const COURSES = [
  {
    id: 1,
    title: "React Complete Guide",
    instructor: "Jhon Doe",
    category: "web",
    rating: 4.8,
    students: 12500,
    price: 4999,
    duration: "40 hours",
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Jane Smith",
    category: "data",
    rating: 4.9,
    students: 8900,
    price: 3499,
    duration: "50 hours",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Johnson",
    category: "design",
    rating: 4.7,
    students: 15200,
    price: 2999,
    duration: "30 hours",
  },
  {
    id: 4,
    title: "Business Strategy & Growth",
    instructor: "Michael Brown",
    category: "business",
    rating: 4.6,
    students: 6700,
    price: 1999,
    duration: "45 hours",
  },
  {
    id: 5,
    title: "Flutter Development",
    instructor: "David Wilson",
    category: "mobile",
    rating: 4.8,
    students: 9800,
    price: 3999,
    duration: "55 hours",
  },
  {
    id: 6,
    title: "Advanced JavaScript",
    instructor: "Emily Davis",
    category: "web",
    rating: 4.9,
    students: 11200,
    price: 2499,
    duration: "35 hours",
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    instructor: "Robert Taylor",
    category: "web",
    rating: 4.8,
    students: 10200,
    price: 2499,
    duration: "42 hours",
  },
  {
    id: 8,
    title: "Vue.js Complete Guide",
    instructor: "Lisa Anderson",
    category: "web",
    rating: 4.7,
    students: 8500,
    price: 1999,
    duration: "38 hours",
  },
  {
    id: 9,
    title: "Angular Framework Mastery",
    instructor: "James White",
    category: "web",
    rating: 4.6,
    students: 7200,
    price: 3499,
    duration: "48 hours",
  },
  {
    id: 10,
    title: "Machine Learning with Python",
    instructor: "Dr. Alex Chen",
    category: "ai",
    rating: 4.9,
    students: 15600,
    price: 5999,
    duration: "60 hours",
  },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    instructor: "Dr. Maria Garcia",
    category: "ai",
    rating: 4.8,
    students: 9800,
    price: 6999,
    duration: "65 hours",
  },
  {
    id: 12,
    title: "Data Analysis with Pandas",
    instructor: "Chris Lee",
    category: "data",
    rating: 4.7,
    students: 11200,
    price: 2999,
    duration: "35 hours",
  },
];

/* =========================
   COMPONENT
========================= */

const CoursesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") return COURSES;
    return COURSES.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="courses-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="courses-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="courses-section-title">Explore Our Courses</h2>
          <p className="courses-section-subtitle">
            Choose from hundreds of courses taught by industry experts
          </p>
        </motion.div>

        {/* Filters */}
        <div className="courses-filters">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={selectedCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.length === 0 && (
            <p className="courses-empty">
              No courses available in this category.
            </p>
          )}

          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link to={`/courses/${course.id}`} className="course-card">
                <div className="course-card-content">
                  <span className="course-card-category">
                    {CATEGORY_MAP[course.category]}
                  </span>

                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-instructor">
                    by {course.instructor}
                  </p>

                  <div className="course-card-meta">
                    <div className="course-rating">⭐ {course.rating}</div>

                    <div className="course-students">
                      👥 {course.students.toLocaleString()}
                    </div>

                    <div className="course-duration">⏱ {course.duration}</div>
                  </div>

                  <div className="course-card-footer">
                    <span className="course-price">
                      {formatPrice(course.price)}
                    </span>
                    <span className="course-card-link">View Course →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="courses-section-action">
          <Link to="/courses" className="btn btn-outline btn-large">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
