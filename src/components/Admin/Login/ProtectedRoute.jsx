import { useEffect, useState } from 'react';
import { account } from '../../../lib/appwrite';
import Login from './Login';
import Loader from '../../Loader/Loader';
import classes from './ProtectedRoute.module.css';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkUser = async () => {
        try {
            await account.get();
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    if (isAuthenticated === null) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Login onLoginSuccess={checkUser} />;
    }

    return children;
}

export default ProtectedRoute;
