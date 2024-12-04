import axiosClient from './axiosClient';

export const adminAPI = {
    getStatitics: (what, timeframe) => {
        const url = `/admin/${what}?timeframe=${timeframe}`;
        return axiosClient.get(url);
    },

    // total revenue on year
    getStatisticRevenue: () => {
        const url = `/admin/revenue?year=2024`;
        return axiosClient.get(url);
    },
};
