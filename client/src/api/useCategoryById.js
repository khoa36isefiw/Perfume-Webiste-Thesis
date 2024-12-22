import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useCategoryById(cId) {
    const url = `/categories/${cId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
