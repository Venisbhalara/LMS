import Hero from "../../components/Hero/Hero";
import BannerCards from "../../components/BannerCards/BannerCards";
import Companies from "../../components/Companies/Companies";
import Features from "../../components/Features/Features";
import PopularCourses from "../../components/PopularCourses/PopularCourses";
import Countdown from "../../components/Countdown/Countdown";
import Alumni from "../../components/Alumni/Alumni";
import Testimonials from "../../components/Testimonials/Testimonials";
import ConversionCTA from "../../components/ConversionCTA/ConversionCTA";
import Newsletter from "../../components/Newsletter/Newsletter";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero — above the fold, no animation */}
      <Hero />

      {/* 1 ← from left */}
      <ScrollReveal direction="left">
        <BannerCards />
      </ScrollReveal>

      {/* 2 → from right */}
      <ScrollReveal direction="right">
        <Companies />
      </ScrollReveal>

      {/* 3 ← from left */}
      <ScrollReveal direction="left">
        <Features />
      </ScrollReveal>

      {/* 4 → from right */}
      <ScrollReveal direction="right">
        <PopularCourses />
      </ScrollReveal>

      {/* 5 ← from left */}
      <ScrollReveal direction="left">
        <Countdown />
      </ScrollReveal>

      {/* 6 → from right */}
      <ScrollReveal direction="right">
        <Alumni />
      </ScrollReveal>

      {/* 7 ← from left */}
      <ScrollReveal direction="left">
        <Testimonials />
      </ScrollReveal>

      {/* 8 → from right */}
      <ScrollReveal direction="right">
        <ConversionCTA />
      </ScrollReveal>

      {/* 9 ← from left */}
      <ScrollReveal direction="left">
        <Newsletter />
      </ScrollReveal>
    </div>
  );
};

export default Home;
