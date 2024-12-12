import axiosClient from './axiosClient';

export const productAPI = {
    createProduct: (data) => {
        const url = `/products/`;
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    editProduct: (id, data) => {
        const url = `/products/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteProduct: (id) => {
        const url = `/products/${id}/delete`;
        return axiosClient.put(url);
    },

    getProductByCategory: (categoryId) => {
        const url = `/products/category/${categoryId}`;
        return axiosClient.get(url);
    },

    getProductById: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
};
