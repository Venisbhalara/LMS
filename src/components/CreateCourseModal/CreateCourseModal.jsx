import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./CreateCourseModal.css";

const CreateCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [formData, setFormData] = useState({
    title: "",
    lessons: "",
    quizzes: "",
    price: "",
  });

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
    
    onAddCourse({
      ...formData,
      lessons: parseInt(formData.lessons) || 0,
      quizzes: parseInt(formData.quizzes) || 0,
      earnings: 0, // Default for new course
      studentsEnrolled: 0,
      lastUpdated: "Just now",
      id: Date.now(), // Simple ID generation
    });
    
    // Reset and close
    setFormData({ title: "", lessons: "", quizzes: "", price: "" });
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
              <h2>Create Course</h2>
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
                  <div className="form-group">
                    <label>Discount</label>
                    <input
                      type="number"
                      name="discount"
                      placeholder="0"
                      value={formData.discount}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>       

                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Add Course
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
