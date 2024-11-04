import useSWR from 'swr';
import axiosClient from './axiosClient';

export default function useProduct(keyword = '', brand = '', sortBy = '', sortOrder = 'asc') {
    // method 1:
    // const url = `/products?keyword=${keyword}`;
    // const fetcher = (url) => axiosClient.get(`${url}?keyword=${keyword}`);

    // method 2:
    const url = `/products?`;
    const fetcher = (url) =>
        axiosClient.get(url, {
            params: {
                keyword: keyword,
                brand: brand,
                sortBy: sortBy,
                sortOrder: sortOrder,
            },
        });
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);

    return {
        data,
        mutate,
        isLoading,
        error,
    };
}
