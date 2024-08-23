import { Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function Copyrights() {
    return (
        <Box sx={{ p: 2, borderTop: '1px solid #333' }}>
            {/* <Box sx={{ width: '100%', height: '1px', bgcolor: '#333' }} /> */}
            <CustomizeTypography textAlign={'center'} sx={{ mb: 0 }}>
                &copy; 2024 Tomtoc. All rights reversed
            </CustomizeTypography>
        </Box>
    );
}

export default Copyrights;
