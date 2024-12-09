import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useOrderById(oId) {
    const url = `/orders/${oId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
