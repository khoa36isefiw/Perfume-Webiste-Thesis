import { Avatar, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import emptyOrder from '../../assets/images/box.png';
import { mobileScreen, theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';

function EmptyOrders() {
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
                [mobileScreen]: {
                    width: '100%',
                },
            }}
        >
            <Avatar
                src={emptyOrder}
                alt="Empty Cart Image"
                sx={{ width: '256px', height: '256px' }}
            />
            <CustomizeTypography
                sx={{ color: theme.palette.text.secondary, fontSize: '32px', fontWeight: 'bold' }}
            >
                No order placed yet!
            </CustomizeTypography>
            <CustomizeTypography
                sx={{
                    fontSize: '24px',
                    mb: 1,
                    width: '650px',
                    textAlign: 'center',
                    [mobileScreen]: {
                        fontSize: '18px',
                        width: '100%',
                    },
                }}
            >
                You have not placed an order yet. Please add items to your cart and checkout when
                you are ready.
            </CustomizeTypography>
            <CustomizeButton
                onHandleClick={() => navigate('/shop')}
                textAction={'Start Shopping'}
            />
        </Box>
    );
}

export default EmptyOrders;
