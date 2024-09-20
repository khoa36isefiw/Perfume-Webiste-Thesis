import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listOrders: [],
};

export const checkoutManagementSlice = createSlice({
    name: 'checkoutManagement',
    initialState,

    reducers: {
        saveOrders: (state, action) => {
            const purchaseInfo = action.payload;
            state.listOrders.push(purchaseInfo);
        },
    },
});

const { actions, reducer } = checkoutManagementSlice;
export const { saveOrders } = actions; // named export
export default reducer; // export default
