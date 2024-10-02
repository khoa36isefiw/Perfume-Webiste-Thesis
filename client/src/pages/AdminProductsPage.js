import { Box } from '@mui/material';
import React from 'react';
import ProductTable from '../components/ProductTable/ProductTable';

function AdminProducts() {
    return (
        <Box sx={{ height: '100vh' }}>
            <ProductTable />
        </Box>
    );
}

export default AdminProducts;
