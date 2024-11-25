import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import useOrderByUser from '../../api/useOrderByUser';
import { converToVND } from '../convertToVND/convertToVND';
import usePaymentByOrderId from '../../api/usePaymentByOrderId';
import { useTranslation } from 'react-i18next';

function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation('translate');

    const currentPaymentData = JSON.parse(window.localStorage.getItem('payment_data')) || null;

    const [refValue, setRefValue] = React.useState('');

    useEffect(() => {
        const currentQueryParams = new URLSearchParams(location.search);
        // console.log('location.search: ', location.search);
        setRefValue(currentQueryParams.get('Ref')); // Get the value of 'Ref'
    }, [location.search]); // Add location.search as a dependency to re-run when the query string changes
    // get payment by id
    const { data: paymentData } = usePaymentByOrderId(refValue);
    console.log('paymentData response: ', paymentData?.data);

    // handle time
    const createdAt = paymentData?.data.createdAt;

    // Convert the string to a Date object
    const dateObject = new Date(createdAt);

    // Format the date and time for Vietnam timezone
    const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false };
    const date = dateObject.toLocaleDateString('en-GB', options); // Format: DD/MM/YYYY
    const time = dateObject.toLocaleTimeString('en-GB', options); // Format: HH:MM:SS

    console.log(`Date (Vietnam Time): ${date}`); // e.g., "05/11/2024"
    console.log(`Time (Vietnam Time): ${time}`); // e.g., "12:50:26"

    return (
        <Box
            sx={{
                margin: 'auto',
                mt: 20,
                minHeight: '400px',
                width: '380px',
                bgcolor: '#000',

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
                    borderLeft: '1px solid #ccc',
                    borderRight: '1px solid #ccc',
                    borderTop: '1px solid #ccc',
                    borderBottom: '1px dashed #ccc',
                    borderRadius: 4,
                }}
            >
                <iframe
                    title="payment success"
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
            <Box
                sx={{
                    borderRadius: 4,
                    borderLeft: '1px solid #ccc',
                    borderRight: '1px solid #ccc',
                    borderTop: '1px dashed #ccc',
                    borderBottom: '1px solid #ccc',
                }}
            >
                <Grid
                    container
                    spacing={4}
                    sx={{
                        p: 1,
                    }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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
                        {paymentData?.data.amount && (
                            <CustomizeTypography sx={{ textAlign: 'center', mb: 0 }}>
                                {converToVND(paymentData?.data.amount)}
                            </CustomizeTypography>
                        )}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}
                        >
                            <CustomizeTypography sx={{ fontSize: '15px' }}>
                                Ref Number
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {currentPaymentData?.userPhoneNumber}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}
                        >
                            <CustomizeTypography sx={{ fontSize: '15px' }}>
                                Payment Time
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {date} - {time}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}
                        >
                            <CustomizeTypography sx={{ fontSize: '15px' }}>
                                Payment Method
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {paymentData?.data?.paymentMethod}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Box
                            sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}
                        >
                            <CustomizeTypography sx={{ fontSize: '15px' }}>
                                Sender Name
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                                Tomtoc Stores
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
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
                                onClick={() => navigate(`/${i18n.language}/shop`)}
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
                    </Grid>
                </Grid>
            </Box>
            {/* Render circles dynamically across the bottom */}
        </Box>
    );
}

export default PaymentSuccess;
