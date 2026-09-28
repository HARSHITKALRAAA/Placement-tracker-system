import React from 'react';
import {
    HelpCircle,
    BookOpen,
    MessageSquare,
    Mail,
    ChevronRight,
    ArrowUpRight,
    Shield
} from 'lucide-react';

const Support = () => {
    return (
        <div className="space-y-10 animate-gold-shine max-w-4xl">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <HelpCircle className="text-[#C9A96A]" size={20} />
                    <h1 className="text-4xl font-black text-[#F5F5F4] tracking-tighter uppercase">Support Center</h1>
                </div>
                <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-[0.2em]">Comprehensive assistance and documentation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="gold-card p-8 group hover:border-[#C9A96A]/20 transition-all border-[#27272A]">
                    <BookOpen size={24} className="text-[#C9A96A] mb-4" />
                    <h3 className="text-lg font-bold text-[#F5F5F4] mb-2">Documentation</h3>
                    <p className="text-sm text-[#A1A1AA] mb-6 leading-relaxed">Detailed guides on managing applications, tracking analytics, and optimizing your calendar.</p>
                    <button className="text-[10px] font-black text-[#C9A96A] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                        EXPLORE GUIDES <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className="gold-card p-8 group hover:border-[#C9A96A]/20 transition-all border-[#27272A]">
                    <MessageSquare size={24} className="text-[#C9A96A] mb-4" />
                    <h3 className="text-lg font-bold text-[#F5F5F4] mb-2">Community</h3>
                    <p className="text-sm text-[#A1A1AA] mb-6 leading-relaxed">Join our exclusive network of professionals to share interview experiences and insights.</p>
                    <button className="text-[10px] font-black text-[#C9A96A] uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                        JOIN NETWORK <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-sm font-black text-[#F5F5F4] uppercase tracking-[0.2em] border-b border-[#27272A] pb-4">Common Inquiries</h2>
                <div className="space-y-4">
                    <FAQItem question="How do I backup my registry data?" />
                    <FAQItem question="Can I export the timeline to external calendars?" />
                    <FAQItem question="How does the risk intelligence brief function?" />
                </div>
            </div>

            <div className="gold-card p-8 border-[#27272A] bg-gradient-to-r from-[#151517] to-[#1C1C1E] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#1C1C1E] border border-[#27272A] flex items-center justify-center text-[#C9A96A]">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-[#F5F5F4]">Direct Assistance</h4>
                        <p className="text-xs text-[#A1A1AA] mt-1 uppercase tracking-widest">Connect with our support executives</p>
                    </div>
                </div>
                <button className="btn-gold !px-10 text-[10px] tracking-widest uppercase">
                    OPEN TICKET
                </button>
            </div>
        </div>
    );
};

const FAQItem = ({ question }) => (
    <div className="gold-card !p-5 border-[#27272A] hover:bg-[#1C1C1E]/50 transition-colors cursor-pointer flex items-center justify-between group">
        <span className="text-sm font-medium text-[#E5E7EB]">{question}</span>
        <ChevronRight size={16} className="text-[#A1A1AA] group-hover:text-[#C9A96A] group-hover:translate-x-1 transition-all" />
    </div>
);

export default Support;
