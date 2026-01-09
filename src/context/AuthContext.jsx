import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// User roles
export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('lms_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('lms_user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password, role = ROLES.STUDENT) => {
    // In real app, this would be an API call
    const newUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role,
      avatar: '👤',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      enrolledCourses: [],
      completedCourses: [],
      certificates: []
    }

    // Mock different users based on email
    if (email.includes('instructor') || email.includes('teacher')) {
      newUser.role = ROLES.INSTRUCTOR
      newUser.name = 'Instructor User'
    } else if (email.includes('admin')) {
      newUser.role = ROLES.ADMIN
      newUser.name = 'Admin User'
    }

    setUser(newUser)
    localStorage.setItem('lms_user', JSON.stringify(newUser))
    return newUser
  }

  const signup = (name, email, password, role = ROLES.STUDENT) => {
    // In real app, this would be an API call
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: '👤',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      enrolledCourses: [],
      completedCourses: [],
      certificates: []
    }

    setUser(newUser)
    localStorage.setItem('lms_user', JSON.stringify(newUser))
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lms_user')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('lms_user', JSON.stringify(updatedUser))
  }

  const enrollInCourse = (courseId) => {
    if (!user || !user.enrolledCourses) return

    if (!user.enrolledCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      }
      setUser(updatedUser)
      localStorage.setItem('lms_user', JSON.stringify(updatedUser))
    }
  }

  const isEnrolled = (courseId) => {
    return user?.enrolledCourses?.includes(courseId) || false
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    enrollInCourse,
    isEnrolled,
    hasRole,
    isAuthenticated: !!user,
    isStudent: user?.role === ROLES.STUDENT,
    isInstructor: user?.role === ROLES.INSTRUCTOR,
    isAdmin: user?.role === ROLES.ADMIN
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

