import axiosClient from './axiosClient';

export const couponAPI = {
    createCoupon: (data) => {
        const url = '/promotions/';
        return axiosClient.post(url, data);
    },
    deleteCoupon: (id) => {
        const url = `/promotions/${id}/delete`;
        return axiosClient.put(url);
    },
    updateCoupon: (id, data) => {
        const url = `/promotions/${id}`;
        return axiosClient.put(url, data);
    },

    applyCoupon: (code) => {
        const url = `/promotions/apply`;
        return axiosClient.post(url, code);
    },
};
