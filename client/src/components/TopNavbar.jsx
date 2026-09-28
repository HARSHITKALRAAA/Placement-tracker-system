import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0B0B0C]/80 backdrop-blur-xl border-b border-[#27272A] flex items-center justify-between px-8 z-[100] shadow-sm">
            <div className="flex items-center gap-10">
                <Link to="/" className="flex items-center group">
                    <img
                    src="/assets/careertrack-logo.svg"
                        alt="CareerTrack"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    <Link to="/" className="text-xs font-black text-[#A1A1AA] hover:text-[#C9A96A] tracking-widest uppercase transition-colors">Overview</Link>
                    <Link to="/applications" className="text-xs font-black text-[#A1A1AA] hover:text-[#C9A96A] tracking-widest uppercase transition-colors">Applications</Link>
                    <Link to="/calendar" className="text-xs font-black text-[#A1A1AA] hover:text-[#C9A96A] tracking-widest uppercase transition-colors">Calendar</Link>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center bg-[#151517] border border-[#27272A] rounded-lg px-4 py-1.5 focus-within:border-[#C9A96A]/30 transition-all w-64 shadow-inner">
                    <Search className="text-[#A1A1AA]" size={14} />
                    <input
                        type="text"
                        placeholder="SEARCH APPLICATIONS..."
                        className="bg-transparent border-none outline-none pl-3 text-[10px] font-black tracking-widest text-[#F5F5F4] placeholder:text-[#A1A1AA]/40 w-full uppercase"
                    />
                </div>

                <button className="p-2 text-[#A1A1AA] hover:text-[#C9A96A] transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C9A96A] rounded-full border border-[#0B0B0C]"></span>
                </button>

                <div className="flex items-center gap-4 pl-4 border-l border-[#27272A]">
                    <Link to="/settings" className="flex items-center gap-3 group">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-[#F5F5F4] tracking-widest uppercase leading-none group-hover:text-[#C9A96A] transition-colors">{user?.name || 'EXECUTIVE USER'}</p>
                            <p className="text-[8px] font-bold text-[#A1A1AA] tracking-[0.2em] uppercase mt-1">Career Explorer</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-[#1C1C1E] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] group-hover:text-[#C9A96A] group-hover:border-[#C9A96A]/30 transition-all shadow-2xl">
                            <User size={16} />
                        </div>
                    </Link>

                    <button
                        onClick={logout}
                        title="Logout"
                        className="h-9 w-9 rounded-lg bg-[#151517] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-red-400 hover:border-red-400/30 transition-all"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
