import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useAuth } from '../../context/AuthContext'
import './Layout.css'

const Layout = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  // Public pages where footer should be shown
  const publicPages = ['/', '/courses', '/login', '/signup', '/about', '/contact', '/help', '/blog']
  const isPublicPage = publicPages.includes(location.pathname) || 
                      location.pathname.startsWith('/courses/') && !location.pathname.includes('/lessons/')

  // Don't show footer on authenticated dashboard pages or lesson pages
  const showFooter = !isAuthenticated || (isPublicPage && !location.pathname.includes('/dashboard'))

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout

