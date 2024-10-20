import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
    // api url from server
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.resolve({ error: true, message: 'Request failed' });
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response; // only get response of data
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            console.error('Error response:', error.response);
            return Promise.resolve({ error: true, status, data });
        } else {
            console.error('Error:', error);
            return Promise.resolve({ error: true, message: 'No response from server' });
        }
    },
);

export default axiosClient;
