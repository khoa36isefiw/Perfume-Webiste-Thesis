import axiosClient from './axiosClient';

export const paymentAPI = {
    createOrder: (user, items, method) => {
        const url = '/payments/create-order';
        return axiosClient.post(url, { user, items, method });
    },
    capturePayPalPayment: (paymentId) => {
        const url = `/payments/paypal/capture-order`;
        return axiosClient.post(url, { paymentId });
    },
};
