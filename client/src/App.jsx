import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddOpportunity from './pages/AddOpportunity';
import Applications from './pages/Applications';
import Calendar from './pages/Calendar';

import Support from './pages/Support';
import Settings from './pages/Settings';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

import { useNavigate, useLocation } from 'react-router-dom';

const AppContent = () => {
    const { token } = useAuth();
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-[#0B0B0C] flex text-[#F5F5F4]">
            {token && !isAuthPage && <TopNavbar />}
            {token && !isAuthPage && <Sidebar />}
            <main className={`flex-1 ${token && !isAuthPage ? 'ml-20 pt-16' : ''} min-h-screen`}>
                <div className={`${token && !isAuthPage ? 'p-8 max-w-7xl mx-auto' : ''}`}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/add" element={<ProtectedRoute><AddOpportunity /></ProtectedRoute>} />
                        <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
                        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;
