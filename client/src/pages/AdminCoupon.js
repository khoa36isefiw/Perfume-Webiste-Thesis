import React from 'react';
import AdminCouponsList from '../components/AdminCoupons/AdminCouponsList';
import { Box } from '@mui/material';
import AdminCouponTableNew from '../components/AdminCoupons/AdminCouponTableNew';

function AdminCoupon() {
    return (
        <Box sx={{ height: '120vh' }}>
            <AdminCouponsList />
        </Box>
    );
}

export default AdminCoupon;
