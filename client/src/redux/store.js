import { configureStore } from '@reduxjs/toolkit';
import cartManagementReducer from './feature/CartManagement/CartManagementSlice';

const rootReducer = {
    cartManagement: cartManagementReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
