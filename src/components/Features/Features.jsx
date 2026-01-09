import { motion } from 'framer-motion'
import { ClockIcon, GraduationIcon, AwardIcon, BriefcaseIcon } from '../Icons/Icons'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: ClockIcon,
      title: 'Learning Flexibility',
      description: 'Learn at your own pace with lifetime access to all course materials. Study anytime, anywhere, on any device.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GraduationIcon,
      title: 'Expert Instructors',
      description: 'Learn from industry-leading professionals with years of real-world experience and proven track records.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: AwardIcon,
      title: 'Industry Certification',
      description: 'Earn recognized certificates upon course completion that enhance your resume and career prospects.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: BriefcaseIcon,
      title: 'Practical Projects',
      description: 'Build real-world projects and portfolios that demonstrate your skills to potential employers.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="features">
      <div className="container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-title">Why Choose EduMaster</h2>
          <p className="features-subtitle">
            Everything you need to succeed in your learning journey
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon-wrapper">
                  <div className={`feature-icon-bg feature-icon-${index + 1}`}>
                    <IconComponent size={32} />
                  </div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features

