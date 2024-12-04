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

    getStatisticUser: (timeFrame) => {
        const url = `/admin/user?timeframe=${timeFrame}`;
        return axiosClient.get(url);
    },

    getStatisticOrder: (timeFrame) => {
        const url = `/admin/order?timeframe=${timeFrame}`;
        return axiosClient.get(url);
    },

    getStatisticProduct: (timeFrame) => {
        const url = `/admin/product?timeframe=${timeFrame}`;
        return axiosClient.get(url);
    },

    getStatisticReview: (timeFrame) => {
        const url = `/admin/review?timeframe=${timeFrame}`;
        return axiosClient.get(url);
    },
};
