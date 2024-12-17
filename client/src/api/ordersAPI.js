import axiosClient from './axiosClient';

export const ordersAPI = {
    // get all
    getAllOrders: () => {
        const url = '/orders/';
        return axiosClient.get(url);
    },
    createOrder: (data) => {
        const url = '/orders/';
        return axiosClient.post(url, data);
    },

    // cancel order
    cancelOrder: (id) => {
        const url = `/orders/${id}/cancel`;
        return axiosClient.post(url);
    },
};

// call data nhiều lần swr --> useProduct
// swr --> xài get all,filter

// get byId, update, delete
