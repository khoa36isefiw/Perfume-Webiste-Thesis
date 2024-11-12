import axiosClient from './axiosClient';

export const couponAPI = {
    createCoupon: (data) => {
        const url = '/promotions/';
        return axiosClient.post(url, data);
    },
};
