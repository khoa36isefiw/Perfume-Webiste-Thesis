import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useTopProductSold() {
    const url = '/admin/top-product-sold';
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
