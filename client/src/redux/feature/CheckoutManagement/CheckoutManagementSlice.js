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
    listOrdersBasedOnProduct: [],
};

export const checkoutManagementSlice = createSlice({
    name: 'checkoutManagement',
    initialState,

    reducers: {
        saveOrders: (state, action) => {
            const { userId, purchaseInfo } = action.payload;
            // const findProductID = state.listOrdersBasedOnProduct.products.find((product)=>product.productId === )
            state.listOrders = {
                ...state.listOrders,
                // store by userId
                [userId]: [
                    ...(state.listOrders[userId] || []), // If the userId already exists, keep existing orders, otherwise create an empty array
                    { purchaseInfo }, // Append the new purchaseInfo and userInfor
                ],
            };

            // cập nhật số lượng sản phẩm đã bán theo productId
            purchaseInfo.products.forEach((product) => {
                const existingProduct = state.listOrdersBasedOnProduct[product.productId];
                if (existingProduct) {
                    // nếu đã có productId, cập nhật số lượng đã bán
                    state.listOrdersBasedOnProduct[product.productId] = {
                        ...existingProduct,
                        quantitySold: existingProduct.quantitySold + product.quantity,
                    };
                } else {
                    // nếu chưa có productId, thêm mới sản phẩm và set số lượng bán
                    state.listOrdersBasedOnProduct[product.productId] = {
                        ...product,
                        quantitySold: product.quantity,
                    };
                }
            });
        },
    },
});

const { actions, reducer } = checkoutManagementSlice;
export const { saveOrders } = actions; // named export
export default reducer; // export default
