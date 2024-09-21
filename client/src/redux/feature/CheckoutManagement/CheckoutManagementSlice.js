import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    /*
     {
    userId1: [
        { purchaseInfo1 }, 
        { purchaseInfo2 }
    ],
    userId2: [
        { purchaseInfo3 }
    ]
}
 */
    listOrders: [],
};

export const checkoutManagementSlice = createSlice({
    name: 'checkoutManagement',
    initialState,

    reducers: {
        saveOrders: (state, action) => {
            const { userId, purchaseInfo } = action.payload;

            state.listOrders = {
                ...state.listOrders,
                // store by userId
                [userId]: [
                    ...(state.listOrders[userId] || []), // If the userId already exists, keep existing orders, otherwise create an empty array
                    { purchaseInfo }, // Append the new purchaseInfo and userInfor
                ],
            };
        },
    },
});

const { actions, reducer } = checkoutManagementSlice;
export const { saveOrders } = actions; // named export
export default reducer; // export default
