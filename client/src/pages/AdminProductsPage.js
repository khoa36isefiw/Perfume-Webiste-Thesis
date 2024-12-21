import { Box } from '@mui/material';
import React from 'react';
import ProductTable from '../components/AdminProductTable/AdminProductTable';

function AdminProducts() {
    return (
        <Box sx={{ height: '100vh' }}>
            <ProductTable />
        </Box>
    );
}

export default AdminProducts;
