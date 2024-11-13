import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useOrders() {
    const url = `/orders`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
