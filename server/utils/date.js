const getDateRange = (timeframe) => {
    const now = new Date();

    if (timeframe === 'week') {
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return { startDate, endDate: now };
    } else if (timeframe === 'day') {
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        return { startDate, endDate: now };
    } else if (timeframe === 'month') {
        const startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return { startDate, endDate: now };
    }

    throw new Error('Invalid timeframe');
};

module.exports = { getDateRange };
