import { motion } from "framer-motion";
import "./Alumni.css";

const alumniData = [
  {
    name: "Alex Johnson",
    role: "Senior Developer",
    company: "Google",
    avatar: "👨‍💻",
    testimonial: "The courses helped me land my dream job at Google!",
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist",
    company: "Microsoft",
    avatar: "👩‍💼",
    testimonial: "Best investment in my career. Highly recommend!",
  },
  {
    name: "Michael Brown",
    role: "Product Designer",
    company: "Apple",
    avatar: "👨‍🎨",
    testimonial: "The design courses are world-class. Worth every penny.",
  },
  {
    name: "Emily Davis",
    role: "Software Engineer",
    company: "Amazon",
    avatar: "👩‍🔬",
    testimonial: "From beginner to professional in just 6 months!",
  },
  {
    name: "David Wilson",
    role: "Marketing Manager",
    company: "Meta",
    avatar: "👨‍💼",
    testimonial: "The business courses transformed my career path.",
  },
  {
    name: "Lisa Anderson",
    role: "UX Researcher",
    company: "Netflix",
    avatar: "👩‍🎓",
    testimonial: "Outstanding curriculum and expert instructors.",
  },
];

/* Animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Alumni = () => {
  return (
    <section className="alumni">
      <div className="container">
        {/* Header */}
        <motion.div
          className="alumni-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="alumni-title">Our Alumni Success Stories</h2>
          <p className="alumni-subtitle">
            See where our graduates are building their careers
          </p>
        </motion.div>

        {/* Alumni Grid */}
        <motion.div
          className="alumni-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {alumniData.map((person, index) => (
            <motion.div
              key={index}
              className="alumni-card"
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              <div className="alumni-avatar" aria-hidden>
                {person.avatar}
              </div>

              <h3 className="alumni-name">{person.name}</h3>

              <p className="alumni-role">
                {person.role}
                <span className="alumni-company"> · {person.company}</span>
              </p>

              <p className="alumni-testimonial">“{person.testimonial}”</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Alumni;
