import { Avatar, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import emptyImage4 from '../../assets/images/empty-cart-svg.svg';
import { theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                minHeight: '500px',
                bgcolor: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 22,
            }}
        >
            <Avatar
                src={emptyImage4}
                alt="Empty Cart Image"
                sx={{ width: '256px', height: '256px' }}
            />
            <CustomizeTypography
                sx={{ color: theme.palette.text.secondary, fontSize: '32px', fontWeight: 'bold' }}
            >
                Your cart is empty
            </CustomizeTypography>
            <CustomizeTypography sx={{ fontSize: '24px', mb: 1 }}>
                Looks like you have not added anything to your cart.
            </CustomizeTypography>
            <CustomizeButton
                onHandleClick={() => navigate('/shop')}
                textAction={'Continue Shopping'}
            />
        </Box>
    );
}

export default EmptyCart;
