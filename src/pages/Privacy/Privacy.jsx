import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: January 16, 2026</p>
        </header>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to EduMaster ("we," "our," or "us"). We are committed to
              protecting your privacy and ensuring you have a positive
              experience on our website and in using our services. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our learning
              management system.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that identifies, relates to, describes,
              references, is capable of being associated with, or could
              reasonably be linked, directly or indirectly, with a particular
              consumer or device. The following are categories of information we
              may have collected:
            </p>
            <ul>
              <li>
                <strong>Personal Identification Information:</strong> Name,
                email address, phone number, and mailing address when you
                register or enroll in a course.
              </li>
              <li>
                <strong>Account Credentials:</strong> Usernames, passwords, and
                other security information for authentication and access.
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card numbers or
                other payment details facilitated by our third-party payment
                processors (we do not store your full credit card information).
              </li>
              <li>
                <strong>Course Data:</strong> Information about your progress,
                grades, quiz scores, and interactions with instructors and other
                students.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you access and
                use the site, including your IP address, browser type, device
                information, and pages visited.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the collected information for various purposes, including:
            </p>
            <ul>
              <li>To provide, operate, and maintain our LMS services.</li>
              <li>To process your transactions and manage your enrollments.</li>
              <li>
                To personalize your learning experience and improved course
                recommendations.
              </li>
              <li>
                To communicate with you, including sending updates, security
                alerts, and support messages.
              </li>
              <li>
                To monitor and analyze usage and trends to improve user
                experience.
              </li>
              <li>
                To prevent fraudulent activities and ensure the security of our
                platform.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal identification
              information to others. We may share detailed information in the
              following situations:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> We may share data with
                trusted third-party service providers who assist us in operating
                our website, conducting our business, or serving our users, so
                long as those parties agree to keep this information
                confidential.
              </li>
              <li>
                <strong>Instructors:</strong> Course instructors may have access
                to your name and progress within their specific courses.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information where we are legally required to do so to comply
                with applicable law, governmental requests, a judicial
                proceeding, court order, or legal process.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information. Cookies are
              files with a small amount of data which may include an anonymous
              unique identifier. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, if
              you do not accept cookies, you may not be able to use some
              portions of our Service.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul>
              <li>
                The right to access – You have the right to request copies of
                your personal data.
              </li>
              <li>
                The right to rectification – You have the right to request that
                we correct any information you believe is inaccurate.
              </li>
              <li>
                The right to erasure – You have the right to request that we
                erase your personal data, under certain conditions.
              </li>
              <li>
                The right to restrict processing – You have the right to request
                that we restrict the processing of your personal data, under
                certain conditions.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul>
              <li>
                By email:{" "}
                <a
                  href="mailto:support@edumaster.com"
                  className="privacy-contact-link"
                >
                  support@edumaster.com
                </a>
              </li>
              <li>
                By visiting this page on our website:{" "}
                <a href="/contact" className="privacy-contact-link">
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

export default Privacy;
