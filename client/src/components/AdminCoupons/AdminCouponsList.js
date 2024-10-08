import { Box } from '@mui/material';
import React from 'react';
import { AdminHeadingTypography } from '../CustomizeTypography/CustomizeTypography';
import AdminCouponsTable from './AdminCouponsTable';
import AdminCouponsTableV2 from './AdminCouponsTableV2';

function AdminCouponsList() {
    return (
        <Box>
            <AdminHeadingTypography>List Coupons</AdminHeadingTypography>
            {/* <AdminCouponsTable /> */}
            <AdminCouponsTableV2 />
        </Box>
    );
}

export default AdminCouponsList;
