import React from 'react';
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Globe,
    Moon,
    ChevronRight,
    Save
} from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-10 animate-gold-shine max-w-4xl">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <SettingsIcon className="text-[#C9A96A]" size={20} />
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase">Preferences</h1>
                </div>
                <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.2em]">Configure your professional workspace.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-2">
                        <SettingsNav icon={<User size={18} />} label="PROFILE" active />
                        <SettingsNav icon={<Bell size={18} />} label="NOTIFICATIONS" />
                        <SettingsNav icon={<Shield size={18} />} label="SECURITY" />
                        <SettingsNav icon={<Globe size={18} />} label="SYSTEM" />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="gold-card border-[#27272A] p-8 space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-[#C9A96A] uppercase tracking-[0.3em]">Profile Registry</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest">Full Name</label>
                                    <input className="input-gold w-full !bg-[#0B0B0C]" value="EXECUTIVE USER" readOnly />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-widest">Email Address</label>
                                    <input className="input-gold w-full !bg-[#0B0B0C]" value="executive@placement.pro" readOnly />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-[#27272A]">
                            <h3 className="text-sm font-black text-[#C9A96A] uppercase tracking-[0.3em]">System Appearance</h3>
                            <div className="flex items-center justify-between gold-card !p-4 border-[#27272A] bg-[#1C1C1E]/50">
                                <div className="flex items-center gap-4">
                                    <Moon size={18} className="text-[#C9A96A]" />
                                    <span className="text-sm font-medium text-[#F5F5F4]">Executive Mode (Dark)</span>
                                </div>
                                <div className="w-10 h-5 bg-[#C9A96A] rounded-full relative p-1">
                                    <div className="w-3 h-3 bg-[#0B0B0C] rounded-full ml-auto shadow-inner"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button className="btn-gold !py-3 !px-10 text-[10px] tracking-widest uppercase flex items-center gap-3">
                                <Save size={16} /> SAVE PREFERENCES
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingsNav = ({ icon, label, active }) => (
    <div className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-all ${active
            ? 'bg-[#C9A96A]/5 border-[#C9A96A]/20 text-[#C9A96A]'
            : 'bg-[#151517] border-[#27272A] text-[#A1A1AA] hover:border-[#C9A96A]/20 hover:text-[#C9A96A]'
        }`}>
        <div className="flex items-center gap-4">
            {icon}
            <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
        </div>
        <ChevronRight size={14} className={active ? 'opacity-100' : 'opacity-0'} />
    </div>
);

export default Settings;
