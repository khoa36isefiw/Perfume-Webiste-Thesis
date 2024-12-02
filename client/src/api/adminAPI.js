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
    //-----------

    statisticUser: (timeframe) => {
        const url = `/admin/user?timeframe=${timeframe}`;
        return axiosClient.get(url);
    },
    statisticOrder: (timeframe) => {
        const url = `/admin/order?timeframe=${timeframe}`;
        return axiosClient.get(url);
    },
    statisticProduct: (timeframe) => {
        const url = `/admin/product?timeframe=${timeframe}`;
        return axiosClient.get(url);
    },
    statisticReview: (timeframe) => {
        const url = `/admin/review?timeframe=${timeframe}`;
        return axiosClient.get(url);
    },
};
