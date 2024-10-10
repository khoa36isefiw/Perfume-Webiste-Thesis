// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     listComments: [],
// };

// export const commentsManagementSlice = createSlice({
//     name: 'commentsManagement',
//     initialState,

//     reducers: {
// saveComments: (state, action) => {
//     const { productId, data } = action.payload;
//     state.listComments = {
//         ...state.listComments,
//         // [productId]: hold an array of userCommentInformation objects
//         // check the current state of comments, if comment exist in the product
//         //has id append the new comment to the existing array
//         [productId]: state.listComments[productId] //
//             ? [...state.listComments[productId], data] // add new comment to existing array
//             : [data], // create a new array with the first comment
//     };
// },
//     },
// });

// const { actions, reducer } = commentsManagementSlice;
// export const { saveComments } = actions; // named export
// export default reducer; // export default

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listComments: [],
};
export const commentsManagementSlice = createSlice({
    name: 'commentsManagement',
    initialState,

    reducers: {
        saveComments: (state, action) => {
            const { productId, data } = action.payload;

            // Lấy danh sách comment hiện có của productId (hoặc mảng rỗng nếu chưa có)
            const existingComments = state.listComments[productId] || [];

            // Tìm kiếm xem người dùng đã comment trước đó chưa
            const userIndex = existingComments.findIndex(
                (comment) => comment.userId === data.userId,
            );

            if (userIndex !== -1) {
                // Nếu người dùng đã comment, cập nhật bình luận hiện tại
                existingComments[userIndex] = {
                    ...data, // Cập nhật thông tin bình luận mới
                    ...existingComments[userIndex],

                    isCommented: true, // Đánh dấu người dùng đã comment
                };
            } else {
                // Nếu người dùng chưa comment, thêm bình luận mới
                existingComments.push({
                    ...data,
                    isCommented: true, // Đánh dấu người dùng đã comment
                });
            }

            // Cập nhật lại state với danh sách bình luận mới hoặc đã được cập nhật
            state.listComments = {
                ...state.listComments,
                [productId]: existingComments,
            };
        },

        resetIsCommented: (state, action) => {
            const { productIds, userId } = action.payload;

            productIds.forEach((productId) => {
                // Tìm kiếm comment của người dùng hiện tại trong productId đã cho
                const existingComments = state.listComments[productId] || [];
                const userIndex = existingComments.findIndex(
                    (comment) => comment.userId === userId,
                );

                // Nếu comment của người dùng tồn tại, set isCommented về false
                if (userIndex !== -1) {
                    existingComments[userIndex] = {
                        ...existingComments[userIndex],
                        isCommented: false, // Reset trạng thái về false sau khi mua hàng
                    };
                }

                // Cập nhật lại state với danh sách bình luận đã chỉnh sửa
                state.listComments = {
                    ...state.listComments,
                    [productId]: existingComments,
                };
            });
        },
    },
});

const { actions, reducer } = commentsManagementSlice;
export const { saveComments, resetIsCommented } = actions; // named export
export default reducer; // export default
