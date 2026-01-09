import { motion } from 'framer-motion'
import { AwardIcon, GraduationIcon, BriefcaseIcon } from '../Icons/Icons'
import './BannerCards.css'

const BannerCards = () => {
  const cards = [
    {
      icon: AwardIcon,
      title: 'Explore Certificates',
      description: 'Earn industry-recognized certificates upon course completion',
      color: 'primary'
    },
    {
      icon: GraduationIcon,
      title: 'Awards & Recognition',
      description: 'Get recognized for your achievements and stand out',
      color: 'warning'
    },
    {
      icon: BriefcaseIcon,
      title: 'Get Hired',
      description: 'Connect with top companies actively hiring our graduates',
      color: 'success'
    }
  ]

  return (
    <section className="banner-cards">
      <div className="container">
        <div className="banner-cards-grid">
          {cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <motion.div
                key={index}
                className={`banner-card banner-card-${card.color}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="banner-card-icon-wrapper">
                  <IconComponent size={40} />
                </div>
                <h3 className="banner-card-title">{card.title}</h3>
                <p className="banner-card-description">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BannerCards
