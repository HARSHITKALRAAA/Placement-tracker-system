import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Building2,
    Trash2,
    Calendar as CalendarIcon,
    MoreVertical,
    ExternalLink,
    Filter,
    ShieldCheck
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const handleDelete = async (id) => {
    const confirmed = window.confirm(
        'Are you sure you want to delete this application?'
    );

    if (!confirmed) return;

    try {
        await axios.delete(`${API_BASE_URL}/opportunities/${id}`);

        setApplications((prev) =>
            prev.filter((app) => app._id !== id)
        );
    } catch (err) {
        console.error(err);
        alert('Failed to delete the application.');
    }
};

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/opportunities`);
                setApplications(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    return (
        <div className="space-y-10 animate-gold-shine">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase">Applications</h1>
                    <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.2em] mt-2">Comprehensive data management of your career ventures.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH APPLICATIONS..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#151517] border border-[#27272A] rounded-lg pl-12 pr-6 py-3 text-[10px] font-black tracking-widest text-[#F5F5F4] focus:border-[#C9A96A]/30 outline-none w-64 transition-all placeholder:text-[#A1A1AA]/30 uppercase"
                        />
                    </div>
                    <Link to="/add" className="h-12 w-12 bg-[#C9A96A] hover:bg-[#8B7355] rounded-lg flex items-center justify-center text-[#0B0B0C] shadow-gold-aura transition-all active:scale-95">
                        <Plus size={24} strokeWidth={3} />
                    </Link>
                </div>
            </div>

            <div className="gold-card !p-0 overflow-hidden border-[#27272A] shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#1C1C1E] border-b border-[#27272A]">
                            <tr>
                                <th className="py-5 px-8 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Entity & Designation</th>
                                <th className="py-5 px-8 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Current Status</th>
                                <th className="py-5 px-8 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Registry Date</th>
                                <th className="py-5 px-8 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Asset ID</th>
                                <th className="py-5 px-8 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272A]">
                            {applications
                                .filter(app => app.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((app) => (
                                    <tr key={app._id} className="group hover:bg-[#1C1C1E]/30 transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded bg-[#1C1C1E] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] group-hover:text-[#C9A96A] group-hover:border-[#C9A96A]/20 transition-all">
                                                    <Building2 size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#F5F5F4] group-hover:text-[#C9A96A] transition-colors uppercase tracking-tight">{app.companyName}</div>
                                                    <div className="text-[9px] text-[#A1A1AA] mt-1 font-black uppercase tracking-widest">{app.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <StatusPill status={app.status} />
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-[#F5F5F4] uppercase tracking-widest">
                                                <CalendarIcon size={14} className="text-[#C9A96A]" />
                                                {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck size={12} className="text-[#8B7355]" />
                                                <span className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-widest tracking-tighter">REG-{app._id.slice(-6).toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-[#A1A1AA] hover:text-[#C9A96A] transition-colors">
                                                    <ExternalLink size={16} />
                                                </button>
                                               <button
                                                    type="button"
                                                    onClick={() => handleDelete(app._id)}
                                                    className="p-2 text-[#A1A1AA] hover:text-red-400 transition-all"
                                                    title="Delete application"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatusPill = ({ status }) => {
    const config = {
        'Selected': 'bg-[#C9A96A] text-[#0B0B0C]',
        'Interview': 'border border-[#C9A96A] text-[#C9A96A]',
        'Applied': 'bg-[#27272A] text-[#A1A1AA]',
        'Rejected': 'bg-rose-900/10 text-rose-500 border border-rose-900/20',
        'Missed': 'bg-rose-900/10 text-rose-500 border border-rose-900/20',
        'Not Applied': 'bg-amber-900/10 text-amber-500 border border-amber-900/20'
    };

    return (
        <span className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-[0.2em] ${config[status] || 'bg-[#27272A] text-[#A1A1AA]'}`}>
            {status}
        </span>
    );
};

export default Applications;
