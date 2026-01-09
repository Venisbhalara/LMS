import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '../Icons/Icons'
import './ConversionCTA.css'

const ConversionCTA = () => {
  return (
    <section className="conversion-cta">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-description">
            Join thousands of professionals who are already advancing their careers with EduMaster.
            Start learning today and unlock your potential.
          </p>
          <div className="cta-actions">
            <Link to="/courses" className="btn btn-primary btn-large cta-button-primary">
              Browse All Courses
              <ArrowRightIcon size={20} />
            </Link>
            <Link to="/signup" className="btn btn-outline-white btn-large cta-button-secondary">
              Sign Up Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ConversionCTA

