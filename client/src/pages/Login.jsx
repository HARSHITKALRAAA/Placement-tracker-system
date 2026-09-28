import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setLocalError(res.error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full animate-gold-shine">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A96A] text-[#0B0B0C] mb-6 shadow-[0_0_30px_rgba(201,169,106,0.3)]">
                        <Crown size={32} fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase mb-2">Executive Access</h1>
                    <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.3em]">Sign in to your professional registry</p>
                </div>

                <div className="gold-card border-[#27272A] p-10 space-y-8 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={100} className="text-[#C9A96A]" />
                    </div>

                    {localError && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm animate-shake">
                            <AlertCircle size={18} />
                            <span className="font-medium">{localError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Registry Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                <input
                                    type="email"
                                    className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                    placeholder="executive@placement.pro"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                <input
                                    type="password"
                                    className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold w-full !py-4 text-xs tracking-[0.2em] uppercase transition-all hover:shadow-[0_0_25px_rgba(201,169,106,0.4)] disabled:opacity-50 group"
                        >
                            {loading ? 'Authenticating...' : (
                                <span className="flex items-center justify-center gap-2">
                                    Login to Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">
                            New member? <Link to="/register" className="text-[#C9A96A] hover:text-[#8B7355] transition-colors">Request Membership</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
