import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';




// const Login = () => {
//     const { loginUser } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // React Router's hook for navigation

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const result = await loginUser(email, password);
//         if (result) {
//             navigate('/itemlist'); // Redirect to the item list
//         } else {
//             alert('Login failed!');
//         }
//     };

const Login = () => {
    const { loginUser } = useContext(AuthContext);  // Get login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataInfo = loginUser(email, password);  // Call the login function when form is submitted
        console.log('Login data:', dataInfo);
        // console.log('Login data:', { email, password });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
