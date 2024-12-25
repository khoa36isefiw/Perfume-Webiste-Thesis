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
            const { productId, data, userId } = action.payload;

            // Lấy danh sách bình luận hiện có của productId (hoặc mảng rỗng nếu chưa có)
            const existingComments = state.listComments[productId] || [];

            // Tìm xem người dùng đã có bình luận nào trước đó không
            const userIndex = existingComments.findIndex((comment) => comment._id === userId);

            // Nếu người dùng đã có bình luận trước đó
            if (userIndex !== -1) {
                // Cập nhật trạng thái của bình luận cũ (ví dụ như reset isCommented)
                existingComments[userIndex].isCommented = true;
            }

            // Thêm bình luận mới vào danh sách (không ghi đè bình luận cũ)
            existingComments.push({
                ...data, // Thông tin bình luận mới
                userId,
                isCommented: true, // Đánh dấu người dùng đã bình luận
            });

            // Cập nhật lại state với danh sách bình luận mới
            state.listComments[productId] = existingComments;

            console.log(
                'Updated comments for productId:',
                productId,
                state.listComments[productId],
            );
        },

        resetIsCommented: (state, action) => {
            const { productIds, userId } = action.payload;

            productIds.forEach((productId) => {
                // Tìm kiếm comment của người dùng hiện tại trong productId đã cho
                const existingComments = state.listComments[productId] || [];
                const userIndex = existingComments.findIndex((comment) => comment._id === userId);

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

        resetAllIsCommented: (state, action) => {
            const { productIds, userId } = action.payload;

            productIds.forEach((productId) => {
                const existingComments = state.listComments[productId] || [];

                // Reset trạng thái isCommented về false cho tất cả bình luận của userId
                existingComments.forEach((comment) => {
                    if (comment._id === userId) {
                        comment.isCommented = false; // Reset trạng thái
                    }
                });

                // Cập nhật lại state với danh sách bình luận đã chỉnh sửa
                state.listComments[productId] = existingComments;
            });
        },
    },
});

const { actions, reducer } = commentsManagementSlice;
export const { saveComments, resetIsCommented, resetAllIsCommented } = actions; // named export
export default reducer; // export default
