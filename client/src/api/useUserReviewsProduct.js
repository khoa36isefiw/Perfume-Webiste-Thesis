import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useUserReviewsProduct(userId) {
    const url = `/reviews/user/${userId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
