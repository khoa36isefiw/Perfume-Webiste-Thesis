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
                // does not exist, add product to cart with quantity : 1
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
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.productInfor.find((item) => item.perfumeID === productId);
            // if existing and quantity > 1
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.productInfor = []; // remove all products after checkout
        },
    },
});

const { actions, reducer } = cartManagementSlice;
export const { addToCart, removeProduct, increaseQuantity, decreaseQuantity, clearCart } = actions; // named export
export default reducer; // export default
