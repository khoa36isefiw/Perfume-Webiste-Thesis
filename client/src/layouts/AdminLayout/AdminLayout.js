import React from 'react';
import AdminHeader from './AdminHeader';
import { Box } from '@mui/material';

function AdminLayout({ children }) {
    return (
        <div>
            <AdminHeader />
            <Box>{children}</Box>
        </div>
    );
}

export default AdminLayout;
