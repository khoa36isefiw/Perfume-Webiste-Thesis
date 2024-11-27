const getDateRange = (timeframe) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust for Monday start

    if (timeframe === 'week') {
        const startOfLastWeek = new Date(startOfCurrentWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Go back 7 days
        const endOfLastWeek = new Date(startOfLastWeek);
        endOfLastWeek.setDate(endOfLastWeek.getDate() + 6); // Add 6 days for the end of the week
        return { startDate: startOfLastWeek, endDate: endOfLastWeek };
    }

    // Other timeframes (day, month)
    if (timeframe === 'day') {
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        return { startDate, endDate: now };
    } else if (timeframe === 'month') {
        const startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return { startDate, endDate: now };
    }

    throw new Error('Invalid timeframe');
};

module.exports = { getDateRange };
