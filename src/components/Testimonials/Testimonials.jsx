import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, UserIcon } from "../Icons/Icons";
import "./Testimonials.css";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Web Developer",
      image: "👩‍💻",
      rating: 5,
      text: "This platform completely changed my career. The courses are well-structured, the instructors are knowledgeable, and the community is supportive. I went from zero coding experience to landing a job at a tech startup in just 8 months!",
    },
    {
      name: "Robert Kim",
      role: "Data Analyst",
      image: "👨‍🔬",
      rating: 5,
      text: "The data science track is phenomenal. The hands-on projects and real-world examples make learning practical and engaging. The certificate I earned helped me stand out in interviews and I got multiple job offers!",
    },
    {
      name: "Amanda Taylor",
      role: "UX Designer",
      image: "👩‍🎨",
      rating: 5,
      text: "As someone switching careers, I was nervous about online learning. But EduMaster made it easy with their structured curriculum and excellent support. The design courses are top-notch and I'm now working at my dream company.",
    },
    {
      name: "James Wilson",
      role: "Business Consultant",
      image: "👨‍💼",
      rating: 5,
      text: "The business courses provided insights I couldn't find anywhere else. The case studies and expert sessions are invaluable. I've applied what I learned directly to grow my consulting practice by 200%.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="testimonials-title">What Our Students Say</h2>
          <p className="testimonials-subtitle">
            Don't just take our word for it - hear from our community
          </p>
        </motion.div>

        <div className="testimonials-carousel">
          <button
            className="testimonials-nav-btn testimonials-nav-prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                type: "smooth",
                duration: 0.3,
                stiffness: 120, // how "bouncy" the slide is
                damping: 20, // smoothness of the slide
                mass: 0.5,
              }}
            >
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon key={i} size={24} className="testimonial-star" />
                ))}
              </div>
              <p className="testimonial-text">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonials[currentIndex].image}
                </div>
                <div className="testimonial-info">
                  <div className="testimonial-name">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="testimonial-role">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            className="testimonials-nav-btn testimonials-nav-next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
