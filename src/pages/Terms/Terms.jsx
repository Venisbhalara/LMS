import React from "react";
import "./Terms.css";

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <header className="terms-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: January 16, 2026</p>
        </header>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using various services and features provided by
              EduMaster (referred to as "we", "us", or "our"), you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts</h2>
            <p>
              To access certain features of the platform, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account. You agree to provide accurate and
              up-to-date information during regarding your account.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Course Enrollment and Access</h2>
            <p>
              When you enroll in a course, you get a license from us to view it
              via the EduMaster services and for no other use. You may not
              transfer or resell courses in any way. We grant you a lifetime
              access license, except when we must disable the course because of
              legal or policy reasons.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Payments and Refunds</h2>
            <p>
              <strong>Pricing:</strong> The prices of courses are determined
              based on the terms of the instructor and our promotional policies.
              We occasionally run promotions and sales for our courses, during
              which certain courses may be available at discounted prices.
            </p>
            <p>
              <strong>Refunds:</strong> If the course you purchased is not what
              you were expecting, you can request, within 30 days of your
              purchase of the course, that EduMaster apply a refund to your
              account. We reserve the right to apply your refund as a refund
              credit or a refund to your original payment method, at our
              discretion.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Intellectual Property Rights</h2>
            <p>
              The content on the EduMaster platform, including but not limited
              to text, graphics, logos, images, audio clips, digital downloads,
              and software, is the property of EduMaster or its content
              suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Prohibited Activities</h2>
            <p>You agree not to engage in any of the following activities:</p>
            <ul>
              <li>Sharing your account credentials with anyone else.</li>
              <li>
                Reproduction, redistribution, transmission, assignment, selling,
                broadcasting, renting, sharing, lending, modifying, adapting,
                editing, creating derivative works of, sublicensing, or
                otherwise transferring or using any course content unless we
                give you explicit permission to do so.
              </li>
              <li>
                Using the platform for any illegal purpose or in violation of
                any local, state, national, or international law.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Termination</h2>
            <p>
              We may terminate your access to all or any part of the service at
              any time, with or without cause, with or without notice, effective
              immediately. If you wish to terminate this agreement or your
              EduMaster account (if you have one), you may simply discontinue
              using the service.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Disclaimers and Limitation of Liability</h2>
            <p>
              The service is provided "as is". EduMaster and its suppliers and
              licensors hereby disclaim all warranties of any kind, express or
              implied, including, without limitation, the warranties of
              merchantability, fitness for a particular purpose and
              non-infringement.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Changes to These Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. What constitutes a material change will
              be determined at our sole discretion. By continuing to access or
              use our Service after those revisions become effective, you agree
              to be bound by the revised terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul>
              <li>
                By email:{" "}
                <a
                  href="mailto:support@edumaster.com"
                  className="terms-contact-link"
                >
                  support@edumaster.com
                </a>
              </li>
              <li>
                By visiting this page on our website:{" "}
                <a href="/contact" className="terms-contact-link">
                  Contact Page
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
