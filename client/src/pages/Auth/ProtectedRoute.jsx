import axios from "axios"
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = async (path) => {
    const [auth, setAuth] = useState(null);

    if (path.startsWith('/user') && localStorage.getItem('accessTokenToken')) {
        const userID = localStorage.getItem('userID');
        try {
            const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/user/check/id/${userID}`, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('studentToken')}` } }
            );
            return response.status === 200;
        } catch (error) {
            console.error('Error checking student:', error);
            localStorage.clear();
            return false;
        }
    }

    if (path.startsWith('/driver') && localStorage.getItem('accessTokenToken')) {
        const driverID = localStorage.getItem('driverID');
        try {
            const response = await axios.get(`${import.meta.env.BACKEND_URL}/api/user/check/id/${driverID}`, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('studentToken')}` } }
            );
            return response.status === 200;
        } catch (error) {
            console.error('Error checking student:', error);
            localStorage.clear();
            return false;
        }
    }
}


export const ProtectedRoute = ({ Component, path }) => {
    const [auth, setAuth] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        const isUserAuthenticated = await isAuthenticated(path);
        setAuth(isUserAuthenticated);
      };
      checkAuth();
    }, [path]);
  
    if (auth === null) {
      return <div>Loading...</div>;
    }
  
    return auth ? <Component /> : <Navigate to="/login" />;
  };
  