import axiosClient from './axiosClient';

export const adminAPI = {
    statisticUser: (timeFrame) => {
        const url = '/admin/user';
        return axiosClient.get(url, timeFrame);
    },
    statisticOrder: (timeFrame) => {
        const url = '/admin/order';
        return axiosClient.get(url, timeFrame);
    },
    statisticProduct: (timeFrame) => {
        const url = '/admin/product';
        return axiosClient.get(url, timeFrame);
    },
    statisticReview: (timeFrame) => {
        const url = '/admin/review';
        return axiosClient.get(url, timeFrame);
    },
};
