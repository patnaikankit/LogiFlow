import axios from "axios"
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = async (path) => {
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


export const ProtectedRoute = ({ component: Component }) => {
    const location = useLocation();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated(location.pathname);
            setIsAuth(auth);
            setLoading(false);
        };
        checkAuth();
    }, [location.pathname]);

    if (isAuth) {
        return <Component />;
    } else {
        return <Navigate to="/login" replace state={{ from: location }} />;
        
    }
};