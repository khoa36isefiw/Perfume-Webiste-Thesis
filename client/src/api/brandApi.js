import axiosClient from './axiosClient';

export const brandApi = {
    getBrandById: (id) => {
        const url = `/brands/${id}`;
        return axiosClient.get(url);
    },
};
