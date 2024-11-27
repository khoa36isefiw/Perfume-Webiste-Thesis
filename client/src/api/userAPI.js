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

    checkMailExist: (email) => {
        try {
            const url = '/users/check-email-availability';
            const response = axiosClient.post(url, email);
            return response;
        } catch (err) {
            console.log(err);
        }
    },
    sendNewPassword: (email) => {
        try {
            const url = '/users/recover-password';
            const response = axiosClient.post(url, { email });
            return response;
        } catch (err) {
            console.log(err);
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
        const url = `/users/${id}`;
        return axiosClient.delete(url, id);
    },

    addProductToCart: (userId, data) => {
        const url = `/users/${userId}/add-to-cart`;
        return axiosClient.post(url, data);
    },

    updateProductQuantity: (userId, data) => {
        // /:id/update-cart
        const url = `/users/${userId}/update-cart`;
        return axiosClient.put(url, data);
    },

    // /:id/remove-from-cart
    removeProductFromCart: (userId, data) => {
        const url = `/users/${userId}/remove-item`;
        return axiosClient.post(url, data);
    },

    subscribe: (data) => {
        const url = '/users/subscribe';
        return axiosClient.post(url, data);
    },
};
