import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            // Potentially fetch user data here if needed
            // For now we trust the stored user if it exists
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
        setLoading(false);
    }, [token]);

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            const { token: newToken, user: newUser } = res.data;

            setToken(newToken);
            setUser(newUser);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            return { success: true };
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            return { success: false, error: err.response?.data?.msg || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            const { token: newToken, user: newUser } = res.data;

            setToken(newToken);
            setUser(newUser);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            return { success: true };
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
            return { success: false, error: err.response?.data?.msg || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
