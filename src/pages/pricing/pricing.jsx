import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pricing.css";
import PaymentModal from "./PaymentModal";

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="lms-pricing-page">
        <div className="lms-pricing-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose a plan that fits your learning journey</p>
        </div>

        <div className="lms-pricing-grid">
          {/* FREE PLAN */}
          <div className="lms-pricing-card">
            <h3>Free Plan</h3>
            <p className="lms-pricing-price">₹0</p>
            <ul>
              <li>✔ Access to free courses</li>
              <li>✔ Limited video lessons</li>
              <li>✔ Community access</li>
              <li>✔ Basic progress tracking</li>
            </ul>
            <button
              className="lms-pricing-btn-outline"
              onClick={() => navigate("/?scroll=hero")}
            >
              Get Started
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="lms-pricing-card lms-pricing-featured">
            <span className="lms-pricing-badge">Most Popular</span>
            <h3>Pro Plan</h3>
            <p className="lms-pricing-price">
              ₹1999 <span>/ year</span>
            </p>
            <ul>
              <li>✔ Unlimited courses</li>
              <li>✔ Certificates</li>
              <li>✔ Premium content</li>
            </ul>
            <button
              className="lms-pricing-btn-primary"
              onClick={() => openModal("Pro Plan")}
            >
              Upgrade Now
            </button>
          </div>

          {/* CUSTOM PLAN */}
          <div className="lms-pricing-card">
            <h3>Custom Plan</h3>
            <p className="lms-pricing-price">Custom Pricing</p>
            <ul>
              <li>✔ Enterprise LMS</li>
              <li>✔ Custom features</li>
              <li>✔ Dedicated support</li>
            </ul>
            <button
              className="lms-pricing-btn-outline"
              onClick={() => navigate("/contact-sales")}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </>
  );
};

export default Pricing;
