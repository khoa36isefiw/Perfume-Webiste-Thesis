import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useLatestProduct() {
    // method 1:
    // const url = `/products?keyword=${keyword}`;
    // const fetcher = (url) => axiosClient.get(`${url}?keyword=${keyword}`);

    // method 2:
    const url = `/products/lastest`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
