import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useUserById(userId) {
    const url = userId ? `/users/${userId}` : null; // call api when has userId
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
