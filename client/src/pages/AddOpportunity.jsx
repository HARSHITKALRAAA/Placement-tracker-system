import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    ArrowLeft,
    Building2,
    Calendar as CalendarIcon,
    Globe,
    Link as LinkIcon,
    ClipboardList,
    Rocket,
    Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const AddOpportunity = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        deadline: '',
        link: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post(`${API_BASE_URL}/opportunities`, formData);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to initialize record.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-10 animate-gold-shine">
            <div className="flex items-center gap-8">
                <Link to="/" className="w-12 h-12 rounded-lg bg-[#151517] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#C9A96A] hover:border-[#C9A96A]/30 transition-all shadow-xl">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase leading-none">New Entry</h1>
                    <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.2em] mt-2">Initialize a new professional venture.</p>
                </div>
            </div>

            <div className="gold-card p-12 relative overflow-hidden bg-gradient-to-br from-[#151517] to-[#0B0B0C] border-[#27272A]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C9A96A]/5 rounded-bl-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C9A96A]/3 rounded-tr-full -ml-8 -mb-8"></div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            <Shield size={16} /> {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <Building2 size={12} className="text-[#C9A96A]" /> Venture Entity
                            </label>
                            <input
                                required
                                className="input-gold w-full"
                                placeholder="E.G. GOLDMAN SACHS"
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <Rocket size={12} className="text-[#C9A96A]" /> Professional Role
                            </label>
                            <input
                                required
                                className="input-gold w-full"
                                placeholder="E.G. QUANT ANALYST"
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <ClipboardList size={12} className="text-[#C9A96A]" /> Status Phase
                            </label>
                            <select
                                className="input-gold w-full appearance-none cursor-pointer"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Applied">Applied Phase</option>
                                <option value="Interview">Interviewing</option>
                                <option value="Selected">Contract Received</option>
                                <option value="Rejected">Processed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <Globe size={12} className="text-[#C9A96A]" /> Official URI
                            </label>
                            <div className="relative">
                                <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
                                <input
                                    className="input-gold w-full pl-11"
                                    placeholder="CAREERS.ENTITY.COM"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <CalendarIcon size={12} className="text-[#C9A96A]" /> Application Date
                            </label>
                            <input
                                type="date"
                                required
                                className="input-gold w-full"
                                value={formData.appliedDate}
                                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em] flex items-center gap-2">
                                <Shield size={12} className="text-[#C9A96A]" /> Maturity Deadline
                            </label>
                            <input
                                type="date"
                                className="input-gold w-full"
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-10 border-t border-[#27272A]">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold w-full py-5 text-[11px] tracking-[0.3em] uppercase font-black shadow-gold-focal disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (
                                <span className="flex items-center justify-center gap-2">
                                    INITIALIZE RECORD <Plus size={20} strokeWidth={3} />
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOpportunity;
