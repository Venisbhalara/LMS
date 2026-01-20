import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UserDashboard from './components/Auth/UserDashboard';

function AuthDemo() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
  };

  const handleSignupSuccess = (userData) => {
    console.log('Signup successful:', userData);
  };

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return <UserDashboard onLogout={handleLogout} />;
  }

  return (
    <div>
      {showLogin ? (
        <Login 
          onLogin={handleLoginSuccess}
          switchToSignup={() => setShowLogin(false)}
        />
      ) : (
        <Signup 
          onSignup={handleSignupSuccess}
          switchToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
}

function AuthDemoApp() {
  return (
    <AuthProvider>
      <AuthDemo />
    </AuthProvider>
  );
}

export default AuthDemoApp;
