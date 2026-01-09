import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  UsersIcon,
  BookIcon,
  GraduationIcon,
  BuildingIcon
} from '../Icons/Icons'
import './Countdown.css'

const statsData = [
  { label: 'Total Learners', value: 50000, suffix: '+', icon: UsersIcon },
  { label: 'Courses Available', value: 1000, suffix: '+', icon: BookIcon },
  { label: 'Expert Instructors', value: 500, suffix: '+', icon: GraduationIcon },
  { label: 'Hiring Partners', value: 200, suffix: '+', icon: BuildingIcon }
]

const Countdown = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [counts, setCounts] = useState(statsData.map(() => 0))

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const start = performance.now()

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1)

      setCounts(
        statsData.map(stat =>
          Math.floor(stat.value * progress)
        )
      )

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView])

  return (
    <section className="countdown" ref={ref}>
      <div className="container">

        <motion.div
          className="countdown-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="countdown-item"
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="countdown-icon">
                  <Icon size={42} />
                </div>

                <div className="countdown-value">
                  {counts[index].toLocaleString()}
                  {stat.suffix}
                </div>

                <div className="countdown-label">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default Countdown
