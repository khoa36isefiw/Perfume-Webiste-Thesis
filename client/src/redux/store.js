import { configureStore } from '@reduxjs/toolkit';
import cartManagementReducer from './feature/CartManagement/CartManagementSlice';
import accountManagementReducer from './feature/AccountManagement/AccountManagementSlice';

const rootReducer = {
    cartManagement: cartManagementReducer,
    accountManagement: accountManagementReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
