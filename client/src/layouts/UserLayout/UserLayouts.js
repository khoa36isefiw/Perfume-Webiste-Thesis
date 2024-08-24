import { Box, Divider } from '@mui/material';
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { theme } from '../../Theme/Theme';

function UserLayouts({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <Header />
            {/* any components call this layout */}
            <Box sx={{ mt: 10 }}>{children}</Box>
            <Divider sx={{ p: '2px', bgcolor: theme.palette.text.secondary, my: 10 }} />
            <Footer />
        </Box>
    );
}

export default UserLayouts;
