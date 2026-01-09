import Hero from '../../components/Hero/Hero'
import BannerCards from '../../components/BannerCards/BannerCards'
import Companies from '../../components/Companies/Companies'
import Features from '../../components/Features/Features'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import Countdown from '../../components/Countdown/Countdown'
import Alumni from '../../components/Alumni/Alumni'
import Testimonials from '../../components/Testimonials/Testimonials'
import ConversionCTA from '../../components/ConversionCTA/ConversionCTA'
import Newsletter from '../../components/Newsletter/Newsletter'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />
      
      {/* Banner Cards - Quick Features */}
      <BannerCards />
      
      {/* Partner Companies */}
      <Companies />
      
      {/* Features Overview */}
      <Features />
      
      {/* Course Showcase - Popular Courses */}
      <PopularCourses />
      
      {/* Stats Countdown */}
      <Countdown />
      
      {/* Alumni Section */}
      <Alumni />
      
      {/* Social Proof - Testimonials */}
      <Testimonials />
      
      {/* Conversion CTA */}
      <ConversionCTA />
      
      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  )
}

export default Home
