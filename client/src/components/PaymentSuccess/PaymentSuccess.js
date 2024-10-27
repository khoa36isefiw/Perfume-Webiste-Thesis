import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                margin: 'auto',
                mt: 8,
                minHeight: '400px',
                width: '380px',
                bgcolor: '#000',
                border: '1px solid #fff',
                zIndex: 2,
                position: 'relative',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderBottom: '1px dashed #ccc',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        height: '20px',
                        width: '20px',
                        background: 'linear-gradient(90deg, #000 50%, #fff 50%)',
                        borderRadius: '50%',
                        zIndex: -1,
                        position: 'absolute',
                        bottom: '-10px',
                        left: '-10px',
                    },
                    '&::after': {
                        content: '""',
                        height: '20px',
                        width: '20px',
                        background: 'linear-gradient(-90deg, #000 50%, #fff 50%)',
                        borderRadius: '50%',
                        zIndex: -1,
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-10px',
                    },
                }}
            >
                <iframe
                    src="https://lottie.host/embed/9c1bccd5-bac7-4a16-b491-5aaea61690dd/UcsJQFV6Qe.json"
                    style={{ border: 0, width: '50%', height: '50%' }}
                />
                <CustomizeTypography
                    sx={{
                        mb: 0,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '22px',
                        color: '#08e508',
                    }}
                >
                    Payment Success
                </CustomizeTypography>
                <CustomizeTypography sx={{ textAlign: 'center' }}>
                    Your payment has been successfully done.
                </CustomizeTypography>
            </Box>
            <Grid container spacing={4} sx={{ p: 1 }}>
                <Grid item lg={12}>
                    <CustomizeTypography
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Total Payment
                    </CustomizeTypography>
                    <CustomizeTypography sx={{ textAlign: 'center', mb: 0 }}>
                        1.000.000 VND
                    </CustomizeTypography>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Ref Number</CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0 }}>090909909</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Payment Time</CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0 }}>25 Feb 2024, 13:22</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Payment Method</CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0 }}>Paypal</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Sender Name</CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0 }}>Luna Kei</CustomizeTypography>
                    </Box>
                </Grid>
            </Grid>

            {/* Render circles dynamically across the bottom */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-1em',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                {[...Array(12)].map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: '20px',
                            width: '20px',
                            background: 'linear-gradient(0deg, #000 50%, #fff 50%)',
                            borderRadius: '50%',
                            zIndex: -1,
                        }}
                    />
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    mt: 2,
                    mb: 4,
                }}
            >
                <Button
                    onClick={() => navigate('/shop')}
                    variant="outlined"
                    sx={{
                        py: 1,
                        borderRadius: '24px',
                        color: theme.palette.text.secondary,
                        borderColor: theme.palette.text.secondary,

                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'initial',
                        '&:hover': {
                            borderColor: theme.palette.text.secondary,
                            filter: 'drop-shadow(2em 0 0.75rem #000)',
                        },
                    }}
                >
                    View Order
                </Button>
                <Button
                    onClick={() => navigate('/shop')}
                    variant="contained"
                    sx={{
                        py: 1,
                        borderRadius: '24px',
                        bgcolor: theme.palette.text.secondary,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'initial',
                        '&:hover': {
                            filter: 'drop-shadow(0 0 0.75rem #000)',
                            bgcolor: theme.palette.text.secondary,
                        },
                    }}
                >
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    );
}

export default PaymentSuccess;
