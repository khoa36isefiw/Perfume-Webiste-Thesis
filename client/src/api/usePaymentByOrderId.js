import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function usePaymentByOrderId(orderId) {
    const url = `/payments/detail/${orderId}`;
    const fetcher = (url) => axiosClient.get(url);
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
