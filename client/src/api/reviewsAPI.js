import axiosClient from './axiosClient';

export const reviewsAPI = {
    // get all list users
    createReview: (data) => {
        const url = `/users/review`;
        return axiosClient.post(url, data);
    },
    getReviewOnProduct: (pId) => {
        const url = `/reviews/product/${pId}`;
        return axiosClient.get(url);
    },
    getReviewByUserId: (uId) => {
        const url = `/reviews/user/${uId}`;
        return axiosClient.get(url);
    },
    getAllReview: () => {
        const url = `/reviews/`;
        return axiosClient.get(url);
    },
};

// router.get('/product/:productId', productReviewController.getByProductId);
// router.get('/user/:userId', productReviewController.getByUserId);
// router.get('/', productReviewController.getAll);
