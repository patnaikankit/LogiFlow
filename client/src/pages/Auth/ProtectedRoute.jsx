import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = async (path) => {
  if (path.startsWith('/user') && localStorage.getItem('accessToken')) {
    const userID = localStorage.getItem('userID');
    try {
      const response = await axios.get(
        `${import.meta.env.BACKEND_URL}/api/user/check/id/${userID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking user authentication:', error);
      localStorage.clear();
      return false;
    }
  }

  if (path.startsWith('/driver') && localStorage.getItem('accessTokenToken')) {
    const driverID = localStorage.getItem('driverID');
    try {
      const response = await axios.get(
        `${import.meta.env.BACKEND_URL}/api/user/check/id/${driverID}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('driverToken')}` } }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking driver authentication:', error);
      localStorage.clear();
      return false;
    }
  }

  return false;  // Default case when no authentication is available
};

export const ProtectedRoute = ({ Component }) => {
  const [auth, setAuth] = useState(null);
  const location = useLocation();  // Get the current location/path from the router

  useEffect(() => {
    const checkAuth = async () => {
      const isUserAuthenticated = await isAuthenticated(location.pathname); // Pass the current path
      setAuth(isUserAuthenticated);
    };
    checkAuth();
  }, [location.pathname]);

  if (auth === null) {
    return <div>Loading...</div>; // You can display a loading spinner here
  }

  return auth ? <Component /> : <Navigate to="/login" />;
};
