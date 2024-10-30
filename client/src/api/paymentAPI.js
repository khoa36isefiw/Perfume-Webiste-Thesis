import axiosClient from './axiosClient';

export const paymentAPI = {
    createPayPalPayment: (user, items) => {
        const url = '/payments/paypal/create-order';
        return axiosClient.post(url, { user, items });
    },
    capturePayPalPayment: (paymentId) => {
        const url = `/payments/paypal/capture-order`;
        return axiosClient.post(url, { paymentId });
    },
};
