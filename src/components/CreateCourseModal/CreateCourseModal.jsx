  import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./CreateCourseModal.css";

const CreateCourseModal = ({
  isOpen,
  onClose,
  onAddCourse,
  onEditCourse,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    lessons: "",
    quizzes: "",
    price: "",
    category: "Web Development",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        lessons: initialData.lessons_count || initialData.lessons || "",
        quizzes: initialData.quizzes_count || initialData.quizzes || "",
        price: initialData.price || "",
        category: initialData.category || "Web Development",
      });
    } else {
      setFormData({
        title: "",
        lessons: "",
        quizzes: "",
        price: "",
        category: "Web Development",
      });
    }
  }, [initialData, isOpen]);

  const COURSE_ICONS = {
    "Web Development":
      "https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5617616-4674327.png",
    "Data Science":
      "https://cdn3d.iconscout.com/3d/premium/thumb/data-science-5353110-4468656.png",
    Design:
      "https://cdn3d.iconscout.com/3d/premium/thumb/web-design-4437048-3684815.png",
    Business:
      "https://cdn3d.iconscout.com/3d/premium/thumb/business-growth-4966601-4127530.png",
    "Mobile Development":
      "https://cdn3d.iconscout.com/3d/free/thumb/mobile-app-development-2978861-2476837.png",
    General:
      "https://cdn3d.iconscout.com/3d/premium/thumb/online-course-4437042-3684809.png",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.lessons) return;

    const selectedIcon =
      COURSE_ICONS[formData.category] || COURSE_ICONS["General"];

    const courseData = {
      ...formData,
      lessons_count: parseInt(formData.lessons) || 0,
      quizzes_count: parseInt(formData.quizzes) || 0,
      price: parseFloat(formData.price) || 0,
      image_url: selectedIcon,
    };

    if (initialData) {
      onEditCourse({
        ...initialData,
        ...courseData,
        lastUpdated: new Date().toISOString(),
      });
    } else {
      onAddCourse({
        ...courseData,
        earnings: 0,
        studentsEnrolled: 0,
        lastUpdated: new Date().toISOString(),
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{initialData ? "Edit Course" : "Create Course"}</h2>
              <button className="close-btn" onClick={onClose}>
                <XMarkIcon className="w-6 h-6" style={{ width: "24px" }} />
              </button>
            </div>

            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Advanced React Patterns"
                    value={formData.title}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      marginTop: "0.5rem",
                    }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total Lessons</label>
                    <input
                      type="number"
                      name="lessons"
                      placeholder="0"
                      value={formData.lessons}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quizzes</label>
                    <input
                      type="number"
                      name="quizzes"
                      placeholder="0"
                      value={formData.quizzes}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  {/* Discount removed from API payload for now, keeping commented or removal if simpler */}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    {initialData ? "Save Changes" : "Add Course"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateCourseModal;
