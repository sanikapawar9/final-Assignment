import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isLoggedIn]);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (!isLoggedIn) {
    if (showAlert) {
      alert('Please log in first to access the dashboard page.');
      handleAlertClose();
    }
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

export default ProtectedRoute;