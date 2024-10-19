import axiosClient from './axiosClient';

export const brandApi = {
    getById: (id) => {
        const url = `/brands/${id}`;
        return axiosClient.get(url);
    },
};
