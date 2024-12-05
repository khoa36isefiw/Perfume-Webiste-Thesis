import axiosClient from './axiosClient';

export const categoriesAPI = {
    getAllCategory: () => {
        const url = '/categories/';
        return axiosClient.get(url);
    },
    getAllParentCategory: () => {
        const url = '/categories/parent';
        return axiosClient.get(url);
    },
    createCategory: (data) => {
        const url = '/categories/';
        return axiosClient.post(url, data);
    },
    getChildCategoryByPId: (id) => {
        const url = `/categories/${id}/child`;
        return axiosClient.get(url);
    },

    getCategoryById: (id) => {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    deleteCategory: (id) => {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
    updateCategory: (id, data) => {
        const url = `/categories/${id}`;
        return axiosClient.put(url, data);
    },
};
