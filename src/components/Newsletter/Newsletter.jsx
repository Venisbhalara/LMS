import { useState } from "react";
import { motion } from "framer-motion";
import { MailIcon, CheckIcon } from "../Icons/Icons";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    console.log("Newsletter signup:", email);
    setSubmitted(true);
    setEmail("");

    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="newsletter">
      <div className="container">
        <motion.div
          className="newsletter-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="newsletter-icon">
            <MailIcon size={42} />
          </div>

          <h2 className="newsletter-title">Join 25,000+ Learners</h2>

          <p className="newsletter-description">
            Weekly insights, new course launches, and exclusive learning
            resources — delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />

            <button
              type="submit"
              className="newsletter-button"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <CheckIcon size={18} />
                  Subscribed
                </>
              ) : (
                "Get Updates"
              )}
            </button>
          </form>

          {submitted && (
            <motion.p
              className="newsletter-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              You’re in! Check your inbox for confirmation.
            </motion.p>
          )}

          <div className="newsletter-footer">
            <span>🚫 No spam</span>
            <span>📬 Unsubscribe anytime</span>
            <span>🔒 Privacy guaranteed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
