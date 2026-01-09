import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./PaymentPage.css";

// Icons (You might want to import these from your icon library if available, 
// using emojis/svgs here for immediate visual feedback)
const UpiIcon = () => <span className="payment-icon">📱</span>;
const CardIcon = () => <span className="payment-icon">💳</span>;
const BankIcon = () => <span className="payment-icon">🏦</span>;

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get plan details from navigation state (or default to Pro)
  const selectedPlan = location.state?.plan || "Pro Plan";
  const planPrice = location.state?.price || 1999;
  const tax = Math.round(planPrice * 0.18); // 18% GST
  const totalAmount = planPrice + tax;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState("summary"); // summary | gateway | success

  // Simulated Payment Processing
  const handlePayment = () => {
    setProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setProcessing(false);
      setPaymentStep("success");
      // Auto redirect after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 2000);
  };

  if (paymentStep === "success") {
    return (
      <div className="payment-page success-container">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="payment-success-card"
        >
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Thank you for enrolling in the <strong>{selectedPlan}</strong>.</p>
          <p>Transaction ID: IND{Math.floor(Math.random() * 1000000000)}</p>
          <p className="redirect-note">Redirecting to Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        
        {/* Left Side: Payment Methods */}
        <div className="payment-left">
          <div className="payment-header">
            <h2>Select Payment Method</h2>
            <p className="secure-badge">🔒 100% Secure Payment</p>
          </div>

          <div className="payment-methods">
            {/* UPI Section */}
            <div 
              className={`payment-method-card ${paymentMethod === "upi" ? "active" : ""}`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="method-header">
                <div className="method-radio"></div>
                <UpiIcon />
                <div>
                  <h3>UPI</h3>
                  <p>Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>
              {paymentMethod === "upi" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="method-details"
                >
                  <label>Enter UPI ID</label>
                  <input type="text" placeholder="example@upi" className="payment-input" />
                  <div className="upi-apps">
                    <span className="upi-app gpay">GPay</span>
                    <span className="upi-app phonepe">PhonePe</span>
                    <span className="upi-app paytm">Paytm</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Credit/Debit Card Section */}
            <div 
              className={`payment-method-card ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="method-header">
                <div className="method-radio"></div>
                <CardIcon />
                <div>
                  <h3>Credit / Debit Card</h3>
                  <p>Visa, MasterCard, Rupay, Maestro</p>
                </div>
              </div>
              {paymentMethod === "card" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="method-details"
                >
                  <div className="card-form">
                    <input type="text" placeholder="Card Number" className="payment-input card-number" maxLength="19" />
                    <div className="card-row">
                      <input type="text" placeholder="MM / YY" className="payment-input" maxLength="5" />
                      <input type="password" placeholder="CVV" className="payment-input" maxLength="3" />
                    </div>
                    <input type="text" placeholder="Cardholder Name" className="payment-input" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Net Banking Section */}
            <div 
              className={`payment-method-card ${paymentMethod === "netbanking" ? "active" : ""}`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              <div className="method-header">
                <div className="method-radio"></div>
                <BankIcon />
                <div>
                  <h3>Net Banking</h3>
                  <p>All Indian Banks Supported</p>
                </div>
              </div>
              {paymentMethod === "netbanking" && (
                <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   className="method-details"
                >
                  <select className="payment-select">
                    <option>Select your Bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="payment-right">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Plan</span>
              <span>{selectedPlan}</span>
            </div>
            <div className="summary-item">
              <span>Billing Cycle</span>
              <span>Yearly</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{planPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-item">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button 
              className="pay-btn" 
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing..." : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
            </button>

            <div className="trust-badges">
              <span>🔒 128-bit SSL Secured</span>
              <span>🛡️ Buyer Protection</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;
