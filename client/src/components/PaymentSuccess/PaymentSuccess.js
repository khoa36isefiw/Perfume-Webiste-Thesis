import { Box, Grid } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

function PaymentSuccess() {
    const boxRef = useRef(null); // Tạo một ref cho Box
    const [boxWidth, setBoxWidth] = useState(0); // Lưu độ dài width của Box

    useEffect(() => {
        // Kiểm tra nếu boxRef.current có giá trị và lấy độ rộng của Box
        if (boxRef.current) {
            setBoxWidth(boxRef.current.offsetWidth);
        }
    }, []); // useEffect chạy một lần khi component được render

    return (
        <Box
            ref={boxRef}
            sx={{
                margin: 'auto',
                mt: 12,
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
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        color: theme.palette.text.secondary,
                    }}
                >
                    Payment Success
                </CustomizeTypography>
                <CustomizeTypography sx={{ textAlign: 'center' }}>
                    Your payment has been successfully done.
                </CustomizeTypography>
            </Box>
            <Grid container spacing={4} sx={{ p: 1, mb: 2 }}>
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
                        <CustomizeTypography>090909909</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Payment Time</CustomizeTypography>
                        <CustomizeTypography>25 Feb 2024, 13:22</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Payment Method</CustomizeTypography>
                        <CustomizeTypography>Paypal</CustomizeTypography>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, margin: 'auto', p: 1 }}>
                        <CustomizeTypography>Sender Name</CustomizeTypography>
                        <CustomizeTypography>Luna Kei</CustomizeTypography>
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
        </Box>
    );
}

export default PaymentSuccess;
