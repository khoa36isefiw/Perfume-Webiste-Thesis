import React from 'react';
import { Container, Divider } from '@mui/material';

function CustomizeDivider() {
    return (
        <Container>
            <Divider sx={{ bgcolor: '#fff', my: 8 }} />;
        </Container>
    );
}

export default CustomizeDivider;
