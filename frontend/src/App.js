import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ItemList from './components/ItemList';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/itemlist" element={<ItemList />} /> {/* Route for ItemList */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
