import axiosClient from './axiosClient';

export const addressApi = {
    getAll(params) {
        const url = '/province';
        return axiosClient.get(url, {
            params: params,
        });
    },
    get(id) {
        const url = `/province/${id}`;
        return axiosClient.get(url);
    },

    // example
    add(data) {
        const url = `/categories`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },

    getProvinceApi() {
        const url = '/province/';
        return axiosClient.get(url);
    },
    getDistrictApi(provinceID) {
        const url = `/province/district/${provinceID}`;
        return axiosClient.get(url);
    },
};
