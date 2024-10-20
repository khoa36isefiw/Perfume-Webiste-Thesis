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
        try {
            const response = axiosClient.get(url, {
                email,
            });
            return response;
        } catch (error) {
            console.log('error', error);
        }
    },

    createUser: (data) => {
        const url = '/users';
        return axiosClient.post(url, data);
    },
    updateUserProfile: (id, data) => {
        const url = `/users/${id}/profile`;
        return axiosClient.put(url, data);
    },
    changePassword: (id, data) => {
        const url = `/users/${id}/change-password`;

        try {
            const response = axiosClient.put(url, data);
            return response;
        } catch (error) {
            console.log('error', error);
        }
    },

    deleteUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.delete(url, id);
    },

    addProductToCart: (userId, data) => {
        const url = `/users/${userId}/add-to-cart`;
        return axiosClient.post(url, data);
    },
};
