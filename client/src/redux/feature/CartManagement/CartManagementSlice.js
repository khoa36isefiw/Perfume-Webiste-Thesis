import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productInfor: [],
};

export const cartManagementSlice = createSlice({
    name: 'cartManagement',
    initialState,

    reducers: {
        addToCart: (state, action) => {
            console.log('state: ', state);
            const product = action.payload;
            const existingProduct = state.productInfor.find(
                (item) => item.perfumeID === product.perfumeID,
            );
            if (existingProduct) {
                // if product is exisited, increase the quantity
                existingProduct.quantity += 1;
            } else {
                // does not exist, add product to cart
                state.productInfor.push({ ...product, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const productId = action.payload;
            state.productInfor = state.productInfor.filter((item) => item.perfumeID !== productId);
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.productInfor.find((item) => item.perfumeID === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            }
        },
    },
});

const { actions, reducer } = cartManagementSlice;
export const { addToCart, removeProduct, increaseQuantity } = actions; // named export
export default reducer; // export default
