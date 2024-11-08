import axiosClient from './axiosClient';

export const productAPI = {
    createProduct: (data) => {
        const url = `/products/`;
        return axiosClient.post(url, data);
    },
    editProduct: (id, data) => {
        const url = `/products/${id}`;
        return axiosClient.put(url, data);
    },

    deleteProduct: (id) => {
        const url = `/products/${id}/delete`;
        return axiosClient.put(url);
    },
};