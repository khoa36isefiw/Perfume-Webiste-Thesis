import React from 'react';
import AdminHeader from './AdminHeader';
import { Box, Grid } from '@mui/material';
import AdminSidebar from './AdminSidebar';

function AdminLayout({ children }) {
    return (
        <Box sx={{ bgcolor: '#f5f4fe', height: '120vh', width: '100vw' }}>
            <AdminHeader />
            <Grid container spacing={4} sx={{ mt: 8 }}>
                <Grid item lg={3}>
                    <AdminSidebar />
                </Grid>
                <Grid item lg={9}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminLayout;
