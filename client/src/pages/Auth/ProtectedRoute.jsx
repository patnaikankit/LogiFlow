import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner'

const isAuthenticated = async (path) => {
  if (path.startsWith('/user') && localStorage.getItem('userToken')) {
    const userID = localStorage.getItem('userID');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/check/id/${userID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking user authentication:', error);
      localStorage.clear();
      return false;
    }
  }

  if (path.startsWith('/driver') && localStorage.getItem('driverToken')) {
    const driverID = localStorage.getItem('driverID');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/driver/check/id/${driverID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('driverToken')}` } }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking driver authentication:', error);
      localStorage.clear();
      return false;
    }
  }

  if (path.startsWith('/admin') && localStorage.getItem('adminToken')) {
    const adminID = localStorage.getItem('adminID');
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/admin/check/id/${adminID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking driver authentication:', error);
      localStorage.clear();
      return false;
    }
  }

  return false;
};

export const ProtectedRoute = ({ component: Component }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated(location.pathname);
      setIsAuth(auth);
      setLoading(false); 
    };
    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isAuth) {
    return <Component />;
  } else {
    if (location.pathname.startsWith('/user')) {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    } else if (location.pathname.startsWith('/driver')) {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    } else {
      return <Navigate to="/auth-admin" replace state={{ from: location }} />;
    }
  }
};

export default ProtectedRoute;
