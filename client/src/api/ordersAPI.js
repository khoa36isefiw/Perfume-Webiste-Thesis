import axiosClient from './axiosClient';

export const ordersAPI = {
    createOrder: (data) => {
        const url = '/orders/';
        return axiosClient.post(url, data);
    },
};

// call data nhiều lần swr --> useProduct
// swr --> xài get all,filter

// get byId, update, delete
