import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoggedIn(false);
            setLoading(false);
            return;
        }
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decodedToken.exp < currentTime) {
                    // Token is expired
                    localStorage.removeItem('token');
                    setLoggedIn(false);
                    navigate(`/${i18n.language}/sign-in`);
                } else {
                    setRole(decodedToken.isAdmin);
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error('Failed to decode token', error);
                localStorage.removeItem('token');
                setLoggedIn(false);
                navigate(`/${i18n.language}/sign-in`);
            } finally {
                setLoading(false);
            }
        }
    }, [navigate, i18n.language]);

    return (
        <AuthContext.Provider value={{ role, loggedIn, loading }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
