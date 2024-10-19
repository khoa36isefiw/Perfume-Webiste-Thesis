import axiosClient from './axiosClient';

export const userAPI = {
    // get all list users
    getAllUsers: () => {
        const url = '/users';
        return axiosClient.get(url);
    },
    getUserById: (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    checkEmailAvailability: (email) => {
        const url = '/users/check-email-availability';
        return axiosClient.get(url, {
            params: email,
        });
    },

    createUser: (data) => {
        const url = '/users';
        return axiosClient.post(url, data);
    },
    updateUserProfile: (id, data) => {
        const url = `/users/${id}/profile`;
        return axiosClient.put(url, data);
    },

    deleteUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.delete(url, id);
    },
};
