import axiosClient from './axiosClient';

export const paymentAPI = {
    createPayPalPayment: (user, items) => {
        const url = '/payments/create-order';
        return axiosClient.post(url, { user, items });
    },
    capturePayPalPayment: (paymentId) => {
        const url = `/payments/capture-order`;
        return axiosClient.post(url, { paymentId });
    },
};
