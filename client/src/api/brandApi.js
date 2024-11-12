import axiosClient from './axiosClient';

export const brandApi = {
    getBrandById: (id) => {
        const url = `/brands/${id}`;
        return axiosClient.get(url);
    },
    deleteBrand: (id) => {
        const url = `/brands/${id}`;
        return axiosClient.delete(url);
    },
    createBrand: (data) => {
        const url = `/brands/`;
        return axiosClient.post(url, data);
    },
    updateBrand: (id, data) => {
        const url = `/brands/${id}`;
        return axiosClient.put(url, data);
    },
};
