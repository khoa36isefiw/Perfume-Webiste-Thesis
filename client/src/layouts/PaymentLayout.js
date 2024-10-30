import { Box } from '@mui/material';
import React from 'react';
import NewHeader from '../components/Header/NewHeader';

function PaymentLayout({ children }) {
    return (
        <Box sx={{ height: '100vh' }}>
            <NewHeader />
            {children}
        </Box>
    );
}

export default PaymentLayout;
