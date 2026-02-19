import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import AdminHomepage from './pages/AdminHomepage';
import UserHomepage from './pages/UserHomepage';
import { authAPI } from './services/api';

// Protected Route Component for authentication
const ProtectedRoute = ({ children, requiredRole }) => {
  const isLoggedIn = authAPI.isLoggedIn();
  const user = authAPI.getCurrentUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminHomepage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user" 
          element={
            <ProtectedRoute requiredRole="user">
              <UserHomepage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
 );
}

export default App;
