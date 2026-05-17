import { useEffect, useState } from 'react';
import { account } from '../../../lib/appwrite';
import Login from './Login';

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
        return <div>Loading...</div>;
    }

    // Якщо не авторизований — показуємо сторінку входу
    if (!isAuthenticated) {
        return <Login onLoginSuccess={checkUser} />;
    }

    // Якщо все добре — рендеримо дочірній компонент (Admin)
    return children;
}

export default ProtectedRoute;
