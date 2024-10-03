import { Box } from '@mui/material';
import React from 'react';
import {
    AdminHeadingTypography,
    AdminTypography,
} from '../CustomizeTypography/CustomizeTypography';
import AdminCouponsTable from './AdminCouponsTable';

function AdminCouponsList() {
    return (
        <Box>
            <AdminHeadingTypography>List Coupons</AdminHeadingTypography>
            <AdminCouponsTable />
        </Box>
    );
}

export default AdminCouponsList;
