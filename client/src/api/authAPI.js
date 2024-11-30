import axiosClient from './axiosClient';

export const authAPI = {
    registerAccount: (data) => {
        // register
        try {
            const url = '/auth/register';
            const response = axiosClient.post(url, data);
            return response;
        } catch (error) {
            console.log('error', error);
        }
    },
    login: (data) => {
        try {
            const url = '/auth/login';
            const response = axiosClient.post(url, {
                email: data.email,
                password: data.password,
            });
            return response;
        } catch (error) {
            console.log('error', error);
        }
    },

    logout: (email) => {
        const url = '/auth/logout';
        return axiosClient.post(url, { email });
    },

    googleLogin: (data) => {
        try {
            const url = '/auth/google/callback';
            const response = axiosClient.post(url, data);
            return response;
        } catch (error) {
            console.log('error', error);
        }
    },
};
