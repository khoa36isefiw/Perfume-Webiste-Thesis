import axiosClient from './axiosClient';

export const paymentAPI = {
    createOrder: (user, items, address, email, phoneNumber, promotionCode, method) => {
        const url = '/payments/create-order';
        return axiosClient.post(url, {
            user,
            items,
            address,
            email,
            phoneNumber,
            promotionCode,
            method,
        });
    },
    capturePayPalPayment: (paymentId) => {
        const url = `/payments/paypal/capture-order`;
        return axiosClient.post(url, { paymentId });
    },

    createVnPayPayment: (data = {}) => {
        const url = '/payments/vnpay/create-payment-url';
        const tempData = {
            amount: 100000,
            orderId: 'ORDER123456',
            bankCode: 'VNBANK',
            language: 'vn',
        };
        return axiosClient.post(url, tempData);
    },

    getPaymentByPayRef: (payRef) => {
        const url = `/payments/details/${payRef}`;
        return axiosClient.get(url);
    },

    getPaymentById: (id) => {
        const url = `/payments/${id}`;
        return axiosClient.get(url);
    },
};
