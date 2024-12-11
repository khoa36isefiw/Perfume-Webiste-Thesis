import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useProductByBrand(bId) {
    const url = `/products/brand/${bId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
