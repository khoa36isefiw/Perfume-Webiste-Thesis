import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useReviewOnProduct(pId) {
    const url = `/reviews/product/${pId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
