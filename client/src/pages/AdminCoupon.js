import React from 'react';
import AdminCouponsList from '../components/AdminCoupons/AdminCouponsList';
import { Box } from '@mui/material';

function AdminCoupon() {
    return (
        <Box sx={{ height: '100vh' }}>
            <AdminCouponsList />
        </Box>
    );
}

export default AdminCoupon;
