import { Box } from '@mui/material';
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function UserLayouts({ children }) {
    return (
        <Box sx={{ height: '400vh', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <Header />
            {/* any components call this layout */}
            {/* {children} */}

            <Footer />
        </Box>
    );
}

export default UserLayouts;
