import { motion } from "framer-motion";

/**
 * ScrollReveal — Framer Motion powered scroll-triggered animations.
 *
 * Uses spring physics instead of CSS cubic-bezier curves, giving a
 * genuinely organic, premium feel — the way Apple/Linear/Stripe animate.
 *
 * Props:
 *  direction  "left" | "right" | "up" | "down"  (default "up")
 *  delay      number in seconds                  (default 0)
 *  duration   spring duration override           (default auto via spring)
 *  distance   pixels to travel                   (default 80)
 *  once       animate only once                  (default true)
 *  margin     viewport root margin               (default "-80px")
 */
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  distance = 80,
  once = true,
  margin = "-80px",
  className = "",
}) => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign =
    direction === "right" || direction === "down" ? distance : -distance;

  const hidden = { opacity: 0, [axis]: sign };
  const visible = { opacity: 1, [axis]: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin }}
      transition={{
        type: "spring",
        stiffness: 60, // lower = slower, smoother spring
        damping: 20, // controls the oscillation / overshoot
        mass: 1,
        delay,
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // opacity uses ease
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
