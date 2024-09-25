import React from 'react';
import AdminHeader from './AdminHeader';
import { Box } from '@mui/material';

function AdminLayout({ children }) {
    return (
        <Box sx={{ bgcolor: '#f5f4fe', height: '100vh' }}>
            <AdminHeader />
            <Box>{children}</Box>
        </Box>
    );
}

export default AdminLayout;
