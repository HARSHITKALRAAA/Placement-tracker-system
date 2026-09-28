import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    Calendar,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    Clock,
    Building2,
    ChevronRight,
    Trophy,
    Sparkles
} from 'lucide-react';
import { getRiskInfo } from '../utils/risk';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        interviews: 0,
        conversions: 0,
        critical: 0
    });
    const [recentApps, setRecentApps] = useState([]);
    const [focusApp, setFocusApp] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/opportunities`);
                const apps = res.data;

                setStats({
                    total: apps.length,
                    interviews: apps.filter(a => a.status === 'Interview').length,
                    conversions: apps.filter(a => a.status === 'Selected').length,
                    critical: apps.filter(a => getRiskInfo(a.status, a.deadline).label === 'High').length
                });

                setRecentApps(apps.slice(0, 5));
                if (apps.length > 0) setFocusApp(apps[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-10 animate-gold-shine">
            {/* Header section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-[#C9A96A]" size={20} />
                    <h1 className="text-5xl font-black text-[#F5F5F4] tracking-tighter uppercase">Dashboard</h1>
                </div>
                <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.2em]">Welcome back, {user?.name || 'Executive'}. Curated progression of your professional journey.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Applications"
                    value={stats.total}
                    icon={<Briefcase size={22} />}
                    trend="+12%"
                    color="gold"
                />
                <StatCard
                    title="Interviews"
                    value={stats.interviews}
                    icon={<Clock size={22} />}
                    trend="Phasing"
                    color="gold"
                />
                <StatCard
                    title="Selection Rate"
                    value={`${stats.conversions > 0 ? Math.round((stats.conversions / stats.total) * 100) : 0}%`}
                    icon={<Trophy size={22} />}
                    trend="Stable"
                    color="gold"
                />
                <StatCard
                    title="Urgent Applications"
                    value={stats.critical}
                    icon={<AlertCircle size={22} />}
                    trend="Urgent"
                    color="gold"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
                        <h2 className="text-sm font-black text-[#F5F5F4] uppercase tracking-[0.2em] flex items-center gap-2">
                            Recent Applications
                        </h2>
                        <Link to="/applications" className="text-[10px] font-black text-[#C9A96A] hover:text-[#8B7355] transition-colors tracking-widest uppercase flex items-center gap-1">
                            FULL ARCHIVE <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="gold-card !p-0 overflow-hidden border-[#27272A] shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-[#1C1C1E] border-b border-[#27272A]">
                                <tr>
                                    <th className="py-4 px-6 text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest">Entity</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest text-center">Current Phase</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest text-right">Application Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#27272A]">
                                {recentApps.map((app) => (
                                    <tr key={app._id} className="group hover:bg-[#1C1C1E]/50 transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="font-bold text-[#F5F5F4] group-hover:text-[#C9A96A] transition-colors uppercase tracking-tight">{app.companyName}</div>
                                            <div className="text-[10px] text-[#A1A1AA] mt-1 font-bold uppercase tracking-wider">{app.role}</div>
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${app.status === 'Interview' ? 'bg-[#C9A96A] text-[#0B0B0C]' :
                                                'border border-[#27272A] text-[#A1A1AA]'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right text-[10px] font-bold text-[#A1A1AA] uppercase tracking-widest">
                                            {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar/Right Panel Area */}
                <div className="space-y-8">
                    <h2 className="text-sm font-black text-[#F5F5F4] uppercase tracking-[0.2em]">Priority Focus</h2>

                    {focusApp ? (
                        <div className="gold-card bg-gradient-to-b from-[#151517] to-[#0B0B0C] border-[#C9A96A]/20 p-8 group active:scale-[0.98] transition-all cursor-default relative overflow-hidden shadow-gold-aura">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96A]/5 rounded-bl-full -mr-12 -mt-12"></div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-black text-xl text-[#F5F5F4] uppercase tracking-tighter leading-none">{focusApp.companyName}</p>
                                        <p className="text-[10px] font-black text-[#A1A1AA] mt-2 uppercase tracking-widest">{focusApp.role}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded bg-[#C9A96A] flex items-center justify-center text-[#0B0B0C] shadow-[0_0_20px_rgba(201,169,106,0.3)]">
                                        <Building2 size={24} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em]">
                                        <span className="text-[#A1A1AA]">Progression Metric</span>
                                        <span className="text-[#C9A96A]">Optimal</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#1C1C1E] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#C9A96A] w-2/3 rounded-full shadow-[0_0_10px_rgba(201,169,106,0.5)]"></div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-[#C9A96A] hover:bg-[#8B7355] text-[#0B0B0C] hover:text-[#F5F5F4] rounded font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2">
                                    ENTER PREP MODE <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="gold-card border-dashed border-[#27272A] flex items-center justify-center h-48 text-[#A1A1AA] text-[10px] font-black uppercase tracking-widest">
                            No high priority assets
                        </div>
                    )}

                    <div className="gold-card p-6 border-[#27272A] bg-[#1C1C1E]/30">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border border-[#27272A] flex items-center justify-center text-[#C9A96A]">
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-[#C9A96A]">Intelligence Brief</p>
                                <p className="text-[11px] text-[#A1A1AA] mt-1 font-medium leading-relaxed">System has flagged 3 critical deadlines requiring immediate attention.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div className="gold-card group hover:border-[#C9A96A]/30 transition-all relative overflow-hidden bg-[#151517]">
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded border border-[#27272A] flex items-center justify-center text-[#A1A1AA] group-hover:text-[#C9A96A] group-hover:border-[#C9A96A]/30 transition-all">
                    {icon}
                </div>
                <div className="px-2 py-0.5 rounded bg-[#1C1C1E] text-[8px] font-black text-[#C9A96A] uppercase tracking-widest border border-[#27272A]">
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.2em] mb-1">{title}</p>
                <p className="text-3xl font-black text-[#F5F5F4] tracking-tighter">{value}</p>
            </div>
        </div>
        <div className="h-0.5 w-full bg-[#1C1C1E] mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A96A]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
    </div>
);

export default Dashboard;
