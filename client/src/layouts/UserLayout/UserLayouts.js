import { Box } from '@mui/material';
import React from 'react';
import Header from '../../components/Header/Header';

function UserLayouts({ children }) {
    return (
        <Box sx={{ minHeight: '200vh' }}>
            <Header />
            {/* pre-defined layout */}
            UserLayouts
            {/* any components call this layout */}
        </Box>
    );
}

export default UserLayouts;
