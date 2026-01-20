import React from "react";
import "./Cookies.css";

const Cookies = () => {
  return (
    <div className="cookies-page">
      <div className="cookies-container">
        <header className="cookies-header">
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last Updated: January 16, 2026</p>
        </header>

        <div className="cookies-content">
          <section className="cookies-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device by
              websites that you visit. They are widely used in order to make
              websites work, or work more efficiently, as well as to provide
              information to the owners of the site. Cookies allow us to
              remember your actions and preferences (such as login via auth
              token, language, font size and other display preferences) over a
              period of time.
            </p>
          </section>

          <section className="cookies-section">
            <h2>2. How We Use Cookies</h2>
            <p>
              We use cookies for a variety of reasons detailed below.
              Unfortunately, in most cases, there are no industry standard
              options for disabling cookies without completely disabling the
              functionality and features they add to this site. It is
              recommended that you leave on all cookies if you are not sure
              whether you need them or not, in case they are used to provide a
              service that you use.
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the
                website to function properly. They enable basic features like
                page navigation and access to secure areas of the website. The
                website cannot function properly without these cookies.
              </li>
              <li>
                <strong>Performance & Analytics Cookies:</strong> These cookies
                allow us to count visits and traffic sources so we can measure
                and improve the performance of our site. They help us to know
                which pages are the most and least popular and see how visitors
                move around the site.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies enable the
                website to provide enhanced functionality and personalisation.
                They may be set by us or by third party providers whose services
                we have added to our pages.
              </li>
            </ul>
          </section>

          <section className="cookies-section">
            <h2>3. Third-Party Cookies</h2>
            <p>
              In some special cases, we also use cookies provided by trusted
              third parties. The following section details which third party
              cookies you might encounter through this site:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to
                help us understand how you use the site and ways that we can
                improve your experience. These cookies may track things such as
                how long you spend on the site and the pages that you visit.
              </li>
              <li>
                <strong>Social Media Buttons and/or Plugins:</strong> We use
                social media buttons and/or plugins on this site that allow you
                to connect with your social network in various ways. For these
                to work, social media sites will set cookies through our site
                which may be used to enhance your profile on their site or
                contribute to the data they hold for various purposes outlined
                in their respective privacy policies.
              </li>
            </ul>
          </section>

          <section className="cookies-section">
            <h2>4. Managing Your Cookie Preferences</h2>
            <p>
              You can prevent the setting of cookies by adjusting the settings
              on your browser (see your browser Help for how to do this). Be
              aware that disabling cookies will affect the functionality of this
              and many other websites that you visit. Disabling cookies will
              usually result in also disabling certain functionality and
              features of this site. Therefore, it is recommended that you do
              not disable cookies.
            </p>
          </section>

          <section className="cookies-section">
            <h2>5. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal or regulatory reasons. Please therefore
              re-visit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
          </section>

          <section className="cookies-section">
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other
              technologies, please contact us:
            </p>
            <ul>
              <li>
                By email:{" "}
                <a
                  href="mailto:support@edumaster.com"
                  className="cookies-contact-link"
                >
                  support@edumaster.com
                </a>
              </li>
              <li>
                By visiting this page on our website:{" "}
                <a href="/contact" className="cookies-contact-link">
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

export default Cookies;
