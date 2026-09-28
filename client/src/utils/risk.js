export const getRiskInfo = (status, deadline) => {
    if (!deadline) return { label: 'Standard', color: 'text-[#A1A1AA]' };

    const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

    if (status === 'OFFER' || status === 'ACCEPTED') {
        return { label: 'Complete', color: 'text-[#C9A96A]' };
    }

    if (daysLeft < 0) return { label: 'Missed', color: 'text-rose-500' };
    if (daysLeft <= 3) return { label: 'High', color: 'text-rose-500' };
    if (daysLeft <= 7) return { label: 'Medium', color: 'text-amber-500' };

    return { label: 'Optimal', color: 'text-[#C9A96A]' };
};
