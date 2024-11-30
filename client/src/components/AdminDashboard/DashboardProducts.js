import * as React from 'react';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { Avatar, Box } from '@mui/material';

const DashboardProducts = ({ product }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} key={product.id}>
                <Avatar
                    src={product.image}
                    sx={{ width: '42px', height: '42px', borderRadius: 0 }}
                />
                <AdminTypography sx={{ fontSize: '12px', ml: 2 }}>{product.name}</AdminTypography>
            </Box>
        </Box>
    );
};

export default DashboardProducts;
