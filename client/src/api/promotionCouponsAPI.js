import axiosClient from './axiosClient';

export const promotionCouponAPI = {
    getAllCoupons: () => {
        const url = 'promotions/';
        return axiosClient.get(url);
    },
    createCoupon: () => {
        const url = 'promotions/';
        return axiosClient.post(url);
    },
    editCoupon: () => {},
};
