import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve data from localStorage
        const token = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');  // Retrieve the userId

        if (token) {
            setCurrentUser({ token, username, email, role, userId });
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Store user data in localStorage
        localStorage.setItem('jwtToken', userData.token);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('userId', userData.userId);  // Store the userId
        setCurrentUser(userData);
    };

    const logout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');  // Remove the userId
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
