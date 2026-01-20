import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import "./ManageCourseModal.css";

const ManageCourseModal = ({
  isOpen,
  onClose,
  onDeleteCourse,
  courseTitle,
}) => {
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
              <h2>Manage Course</h2>
              <button className="close-btn" onClick={onClose}>
                <XMarkIcon className="w-6 h-6" style={{ width: "24px" }} />
              </button>
            </div>

            <div className="modal-content">
              <p className="manage-desc">
                Managing: <strong>{courseTitle}</strong>
              </p>

              <div className="manage-actions">
                <button className="btn-delete-course" onClick={onDeleteCourse}>
                  <TrashIcon className="w-5 h-5 icon" />
                  Delete Course
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManageCourseModal;
