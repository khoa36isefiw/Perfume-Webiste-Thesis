import React from 'react';
import AdminOrdersTable from '../components/AdminOrders/AdminOrdersTable';
import { Box } from '@mui/material';

function AdminOrdersPage() {
    return (
        <Box sx={{ height: '100vh' }}>
            <AdminOrdersTable />
        </Box>
    );
}

export default AdminOrdersPage;
