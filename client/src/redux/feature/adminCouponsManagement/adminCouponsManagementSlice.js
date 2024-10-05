import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listCoupons: [],
};

export const adminCouponsManagementSlice = createSlice({
    name: 'couponsManagement',
    initialState,

    reducers: {
        createNewCoupon: (state, action) => {
            const { data } = action.payload;
            console.log('data:', data);
            state.listCoupons = [...state.listCoupons, data];
        },
    },
});

const { actions, reducer } = adminCouponsManagementSlice;
export const { createNewCoupon } = actions; // named export
export default reducer; // export default
