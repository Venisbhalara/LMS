import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Courses from "./pages/Courses/Courses";
import CourseDetail from "./pages/CourseDetail/CourseDetail";
import Lesson from "./pages/Lesson/Lesson";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ScrollToTop from "./scrolltop";
import HelpWidget from "./components/HelpWidget/HelpWidget"; // ✅ Import Help Widget
import About from "./pages/about/about";
import Careers from "./pages/Careers/Careers";
import Blog from "./pages/blog/blog";
import Contact from "./pages/contact/contact";
import Pricing from "./pages/pricing/pricing";
import Quiz from "./pages/Quiz/Quiz";
import QuizResult from "./pages/Quiz/QuizResult";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import PaymentPage from "./pages/Payment/PaymentPage";
import AdminUsers from "./pages/Admin/AdminUsers";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import Cookies from "./pages/Cookies/Cookies";
import ContactSales from "./pages/ContactSales/ContactSales";
// import ContactSales from "./pages/ContactSales/ContactSales";
import CertificateVerification from "./pages/CertificateVerification/CertificateVerification";
import MyCertificates from "./pages/MyCertificates/MyCertificates";
import Apply from "./pages/Apply/Apply";
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ This fixes footer jump */}
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="courses/:id/lessons/:lessonId" element={<Lesson />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/result" element={<QuizResult />} />
          <Route path="/course/:courseId/quiz/:quizId" element={<Quiz />} />
          <Route path="/course/:courseId/quiz/:quizId" element={<Quiz />} />
          <Route
            path="/course/:courseId/quiz/:quizId/result"
            element={<QuizResult />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/instructor/dashboard"
            element={<InstructorDashboard />}
          />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/my-certificates" element={<MyCertificates />} />
          <Route path="/verify/:code" element={<CertificateVerification />} />
          <Route path="/apply" element={<Apply />} />
        </Route>  
      </Routes>
      {/* Help Widget: Appears on all pages */}
      <HelpWidget />
    </Router>
  );
}

export default App;
