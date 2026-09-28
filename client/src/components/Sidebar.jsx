import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Settings, Archive, HelpCircle, Briefcase, Minus } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="fixed top-16 left-0 w-20 h-[calc(100vh-64px)] bg-[#151517] border-r border-[#27272A] flex flex-col items-center py-8 z-[60]">
            <div className="flex flex-col gap-6 flex-1">
                <SidebarItem
                    to="/"
                    icon={<LayoutDashboard size={20} />}
                    label="Overview"
                    active={location.pathname === '/'}
                />
                <SidebarItem
                    to="/applications"
                    icon={<Briefcase size={20} />}
                    label="Applications"
                    active={location.pathname === '/applications'}
                />
                <SidebarItem
                    to="/calendar"
                    icon={<Calendar size={20} />}
                    label="Calendar"
                    active={location.pathname === '/calendar'}
                />
                <SidebarItem
                    to="/add"
                    icon={<Archive size={20} />}
                    label="Add Application"
                    active={location.pathname === '/add'}
                />
            </div>

            <div className="flex flex-col gap-6 mb-4">
                <SidebarItem
                    to="/support"
                    icon={<HelpCircle size={20} />}
                    label="Support"
                    active={location.pathname === '/support'}
                />
                <SidebarItem
                    to="/settings"
                    icon={<Settings size={20} />}
                    label="Settings"
                    active={location.pathname === '/settings'}
                />
            </div>
        </aside>
    );
};

const SidebarItem = ({ to, icon, active, label }) => (
    <Link
        to={to}
        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group relative ${active
            ? 'bg-[#C9A96A] text-[#0B0B0C] shadow-[0_0_15px_rgba(201,169,106,0.3)]'
            : 'text-[#A1A1AA] hover:text-[#C9A96A] hover:bg-[#1C1C1E]'
            }`}
    >
        {React.cloneElement(icon, { strokeWidth: active ? 2.5 : 2 })}

        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#1C1C1E] text-[#F5F5F4] text-[10px] font-black uppercase tracking-widest rounded border border-[#27272A] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] shadow-2xl">
            {label}
        </div>
    </Link>
);

export default Sidebar;
