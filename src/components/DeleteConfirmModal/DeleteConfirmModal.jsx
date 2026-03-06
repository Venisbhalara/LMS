import { createPortal } from "react-dom";
import "./DeleteConfirmModal.css";

/**
 * DeleteConfirmModal — shared across all admin pages
 *
 * Props:
 *   isOpen    {boolean}   — whether the modal is visible
 *   itemName  {string}    — name of the item being deleted (shown in body)
 *   itemType  {string}    — label like "user", "course", "message" etc.
 *   onConfirm {function}  — called when Delete button is clicked
 *   onCancel  {function}  — called when Cancel or overlay is clicked
 */
const DeleteConfirmModal = ({
  isOpen,
  itemName,
  itemType = "item",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="dcm-overlay" onClick={onCancel}>
      <div className="dcm-card" onClick={(e) => e.stopPropagation()}>
        {/* Warning icon */}
        <div className="dcm-icon-wrap">
          <div className="dcm-icon-ring" />
          <div className="dcm-icon-inner">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="dcm-body">
          <h2 className="dcm-title">Delete {itemType}?</h2>
          <p className="dcm-desc">
            You are about to permanently delete{" "}
            {itemName ? (
              <strong className="dcm-name">&ldquo;{itemName}&rdquo;</strong>
            ) : (
              "this " + itemType
            )}
            . This action <span className="dcm-emphasis">cannot be undone</span>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="dcm-actions">
          <button className="dcm-btn dcm-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="dcm-btn dcm-btn-delete" onClick={onConfirm}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeleteConfirmModal;
