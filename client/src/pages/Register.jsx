import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Mail, Lock, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localError, setLocalError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password !== formData.confirmPassword) {
            return setLocalError('Passwords do not match');
        }

        const res = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-[#C9A96A] text-[#C9A96A] mb-6 shadow-[0_0_20px_rgba(201,169,106,0.1)]">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase mb-2">Member Registry</h1>
                    <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.3em]">Initialize your professional profile</p>
                </div>

                <div className="gold-card border-[#27272A] p-10 space-y-8 relative overflow-hidden backdrop-blur-sm">
                    {localError && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle size={18} />
                            <span className="font-medium">{localError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Full Identity</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                <input
                                    name="name"
                                    type="text"
                                    className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                    placeholder="John Executive"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                    placeholder="executive@placement.pro"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Security Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                    <input
                                        name="password"
                                        type="password"
                                        className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest ml-1">Confirm Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] group-focus-within:text-[#C9A96A] transition-colors" size={18} />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className="input-gold w-full !pl-12 !bg-[#0B0B0C]/50 focus:!bg-[#0B0B0C] transition-all"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold w-full !py-4 text-xs tracking-[0.2em] uppercase mt-4 transition-all hover:shadow-[0_0_25px_rgba(201,169,106,0.2)] disabled:opacity-50 group"
                        >
                            {loading ? 'Processing Registry...' : (
                                <span className="flex items-center justify-center gap-2">
                                    Complete Enrollment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">
                            Already enrolled? <Link to="/login" className="text-[#C9A96A] hover:text-[#8B7355] transition-colors">Portal Access</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
