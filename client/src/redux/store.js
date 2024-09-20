import { configureStore } from '@reduxjs/toolkit';
import cartManagementReducer from './feature/CartManagement/CartManagementSlice';
import accountManagementReducer from './feature/AccountManagement/AccountManagementSlice';
import checkoutManagementReducer from './feature/CheckoutManagement/CheckoutManagementSlice';

const rootReducer = {
    cartManagement: cartManagementReducer,
    accountManagement: accountManagementReducer,
    checkoutManagement: checkoutManagementReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
