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
        updateCoupon: (state, action) => {
            const { couponId, data } = action.payload;
            console.log('couponId: ', couponId);
            console.log('data: ', data);
            // get coupon index in list want to change their information
            const couponIndex = state.listCoupons.findIndex((c) => c.id === couponId);

            // update coupon information at this index
            if (couponIndex !== -1) {
                state.listCoupons[couponIndex] = { ...state.listCoupons[couponIndex], ...data };
            }
        },

        // remove the current coupon information
        deleteCoupon: (state, action) => {
            const { codeId } = action.payload;
            state.listCoupons = state.listCoupons.filter((c) => c.id !== codeId);
        },
    },
});

const { actions, reducer } = adminCouponsManagementSlice;
export const { createNewCoupon, updateCoupon, deleteCoupon } = actions; // named export
export default reducer; // export default
