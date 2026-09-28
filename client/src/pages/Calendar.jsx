import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Briefcase, Plus, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchOps = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/opportunities`);
                setOpportunities(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOps();
    }, []);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderHeader = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#C9A96A]/20 flex items-center justify-center text-[#C9A96A]">
                        <Landmark size={24} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase leading-none">Application Calendar</h1>
                        <p className="text-[#A1A1AA] text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-[#151517] border border-[#27272A] rounded p-1">
                        <button
                            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                            className="p-2 hover:bg-[#1C1C1E] rounded text-[#A1A1AA] hover:text-[#C9A96A] transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                            className="p-2 hover:bg-[#1C1C1E] rounded text-[#A1A1AA] hover:text-[#C9A96A] transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <Link to="/add" className="btn-gold !py-3 px-8 text-[10px] font-black tracking-widest uppercase shadow-gold-aura">
                        <Plus size={16} /> ADD ENTRY
                    </Link>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const prevMonthDays = daysInMonth(year, month - 1);

        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(
                <div key={`prev-${i}`} className="h-32 border-b border-r border-[#27272A] bg-[#0B0B0C]/50 p-4 opacity-10">
                    <span className="text-[10px] font-black text-[#A1A1AA]">{prevMonthDays - startDay + i + 1}</span>
                </div>
            );
        }

        for (let d = 1; d <= totalDays; d++) {
            const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = opportunities.filter(op => {
                if (!op.deadline) return false;
                const deadlineStr = typeof op.deadline === 'string' ? op.deadline : op.deadline.toISOString();
                return deadlineStr.startsWith(dateStr);
            });

            days.push(
                <div key={d} className={`h-32 border-b border-r border-[#27272A] p-4 transition-all ${isToday ? 'bg-[#C9A96A]/5' : 'hover:bg-[#1C1C1E]/50'}`}>
                    <div className="flex justify-between items-start mb-3">
                        <span className={`text-[11px] font-black ${isToday ? 'text-[#C9A96A]' : 'text-[#A1A1AA]'}`}>{d}</span>
                        {isToday && <div className="w-1 h-1 bg-[#C9A96A] rounded-full shadow-[0_0_5px_#C9A96A]"></div>}
                    </div>
                    <div className="space-y-1.5">
                        {dayEvents.map((ev, idx) => (
                            <div key={idx} className="bg-[#1C1C1E] border border-[#27272A] border-l-[#C9A96A] border-l-2 px-2 py-1 flex items-center gap-2 group cursor-pointer hover:border-[#C9A96A] transition-all">
                                <span className="text-[8px] font-black text-[#F5F5F4] truncate uppercase tracking-tighter">
                                    {ev.companyName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="gold-card !p-0 overflow-hidden border-[#27272A] shadow-2xl">
                <div className="grid grid-cols-7 bg-[#1C1C1E] border-b border-[#27272A]">
                    {weekdays.map(day => (
                        <div key={day} className="py-5 text-center text-[9px] font-black text-[#A1A1AA] uppercase tracking-[0.3em]">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 border-l border-[#27272A]">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-gold-shine pb-10">
            {renderHeader()}
            {renderDays()}
        </div>
    );
};

export default Calendar;
