import { createContext, useState } from 'react';
import { login, register } from '../services/api'; // საჭიროა სწორად იმპორტირება

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const navigate = useNavigate();
    // const loginUser = async (email, password) => {
    //     try {
    //         const data = await login(email, password);
    //         setUser(data); // შეგიძლიათ მნიშვნელობად დაუშვათ JWT Token-ი
    //         localStorage.setItem('user', JSON.stringify(data));
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //     }
    // };

    const loginUser = async (email, password) => {
        try {
            const data = await login(email, password);

            if (data.token) {
                localStorage.setItem('token', data.token); // Save JWT token
                localStorage.setItem('user', JSON.stringify(data)); // Save user data
                setUser(data);
                setIsAuthenticated(true);
            } else {
                console.error('No token returned from server');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setIsAuthenticated(false);
        }
    };

    const registerUser = async (name, email, password) => {
        try {
            const data = await register(name, email, password);
            setUser(data); // რეგისტრაციის შემდეგ შეიძლება, დავაბრუნოთ JWT
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, registerUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
