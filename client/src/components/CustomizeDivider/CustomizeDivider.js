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

export function CustomizeDividerVertical8() {
    return <Divider sx={{ bgcolor: '#fff', my: 4 }} />;
}

export function CustomizeDividerVertical() {
    return <Divider sx={{ bgcolor: '#fff', my: 1 }} />;
}
