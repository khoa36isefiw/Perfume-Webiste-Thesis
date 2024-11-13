import useSWR from 'swr';
import { userAPI } from './userAPI';

// Hàm fetcher để lấy thông tin người dùng
const fetchUsersByIds = async (userIds) => {
    const userPromises = userIds.map((userId) => userAPI.getUserById(userId));
    const users = await Promise.all(userPromises);
    return users.map((response) => response?.data);
};

const useUsersByIds = (userIds) => {
    const { data, error, mutate } = useSWR(
        userIds ? ['/users', userIds] : null,
        () => fetchUsersByIds(userIds),
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
        },
    );

    return {
        usersData: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

export default useUsersByIds;
