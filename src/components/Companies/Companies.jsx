import { motion } from 'framer-motion'
import { getCompanyImage } from '../../utils/images'
import './Companies.css'

const Companies = () => {
  const companies = [
    { name: 'Google' },
    { name: 'Microsoft' },
    { name: 'Amazon' },
    { name: 'Apple' },
    { name: 'Meta' },
    { name: 'Netflix' },
    { name: 'Tesla' },
    { name: 'Adobe' },
    { name: 'IBM' },
    { name: 'Oracle' }, 
  ]

  return (
    <section className="companies">
      <div className="container">
        <motion.div
          className="companies-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="companies-title">Trusted by leading companies</h2>
          <p className="companies-subtitle">
            Our graduates work at world's leading companies
          </p>
        </motion.div>
        
        <div className="companies-marquee">
          <div className="companies-track">
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="company-item">
                <div className="company-logo">
                  <img 
                    src={getCompanyImage(company.name)} 
                    alt={company.name}
                    className="company-image"
                    loading="lazy"
                  />
                </div>
                <span className="company-name">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Companies
