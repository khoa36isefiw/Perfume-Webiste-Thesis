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
            console.log('product here:...', product);
            const existingProduct = state.productInfor.find(
                (item) =>
                    item.perfumeID === product.perfumeID &&
                    item.perfumeSize === product.perfumeSize,
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
            const { productId, productSize } = action.payload;
            console.log('product has id: ', productId);
            console.log('product has productSize: ', productSize);
            // only the product with the matching perfumeId and
            // productSize is removed from the cart
            state.productInfor = state.productInfor.filter(
                (item) => item.perfumeID !== productId || item.perfumeSize !== productSize,
            );
        },
        increaseQuantity: (state, action) => {
            const { productId, productSize } = action.payload;
            const existingProduct = state.productInfor.find(
                (item) => item.perfumeID === productId && item.perfumeSize === productSize,
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const { productId, productSize } = action.payload;
            const existingProduct = state.productInfor.find(
                (item) => item.perfumeID === productId && item.perfumeSize === productSize,
            );
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
