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
            state.listComments = {
                ...state.listComments,
                // [productId]: hold an array of userCommentInformation objects
                // check the current state of comments, if comment exist in the product
                //has id append the new comment to the existing array
                [productId]: state.listComments[productId] //
                    ? [...state.listComments[productId], data] // add new comment to existing array
                    : [data], // create a new array with the first comment
            };
        },
    },
});

const { actions, reducer } = commentsManagementSlice;
export const { saveComments } = actions; // named export
export default reducer; // export default
