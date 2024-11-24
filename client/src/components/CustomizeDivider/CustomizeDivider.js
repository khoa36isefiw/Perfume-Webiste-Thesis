import React from 'react';
import { Container, Divider } from '@mui/material';
import { mobileScreen } from '../../Theme/Theme';

function CustomizeDivider() {
    return (
        <Container
            sx={{
                [mobileScreen]: {
                    mt: 70,
                },
            }}
        >
            <Divider
                sx={{
                    bgcolor: '#fff',
                    my: 8,
                    [mobileScreen]: {
                        my: 0,
                    },
                }}
            />
            ;
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
