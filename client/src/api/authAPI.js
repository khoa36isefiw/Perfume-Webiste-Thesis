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
        const url = '/auths/login';
        console.log('data auth: ', data);
        return axiosClient.post(url, {
            email: data.email,
            password: data.password,
        });
        // try {
        //     const url = '/auths/login';
        //     return axiosClient.post(url, {
        //         params: {
        //             email: data.email,
        //             password: data.password,
        //         },
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    },

    logout: (email) => {
        const url = '/auths/logout';
        return axiosClient.post(url, { email });
    },
};
