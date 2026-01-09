import "./PaymentModal.css";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onClose();
    navigate("/payment", { state: { plan, price: plan === "Pro Plan" ? 1999 : 5000 } });
  };

  if (!isOpen) return null;

  return (
    <div className="lms-payment-overlay" onClick={onClose}>
      <div
        className="lms-payment-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Complete Your Purchase</h2>
        <p className="lms-payment-plan">
          Selected Plan: <strong>{plan}</strong>
        </p>

        <div className="lms-payment-summary">
          {plan === "Pro Plan" && (
            <>
              <p>✔ Unlimited Courses</p>
              <p>✔ Certificates</p>
              <p>✔ Premium Content</p>
              <h3>₹1,999 / year</h3>
            </>
          )}

          {plan === "Custom Plan" && (
            <>
              <p>✔ Enterprise Access</p>
              <p>✔ LMS Customization</p>
              <p>✔ Dedicated Support</p>
              <h3>Custom Pricing</h3>
            </>
          )}
        </div>

        <div className="lms-payment-actions">
          {plan === "Pro Plan" ? (
            <button className="lms-payment-pay-btn" onClick={handleProceed}>
              Proceed to Pay
            </button>
          ) : (
            <button className="lms-payment-pay-btn">
              Contact Sales
            </button>
          )}
          <button
            className="lms-payment-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
