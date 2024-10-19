import axios from 'axios';
import axiosClient from './axiosClient';

export const authAPI = {
    registerAccount: (data) => {
        // register

        const url = '/auths/register';
        return axiosClient.post(url, data);
    },
    login: (data) => {
        // login

        try {
            const url = '/auths/login';
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
        const url = '/auths/logout';
        return axiosClient.post(url, { email });
    },
};
