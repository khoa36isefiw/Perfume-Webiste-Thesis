import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import useCoupons from '../../api/useCoupons';
import { formatDate, formatDateDD } from '../FormatDate/formatDate';

function TicketCoupon() {
    const { data: couponsData } = useCoupons();
    console.log('couponsData: ', couponsData?.data);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 24,
            }}
        >
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: 'Libre Barcode',
                    textAlign: 'start',
                    zIndex: 2,

                    mb: 2,
                }}
            >
                Tomtoc Promotions Code 🎉
            </CustomizeTypography>
            <Box>
                {couponsData?.data.map(
                    (coupon) =>
                        coupon.status === 'active' && (
                            <Box sx={{ height: '200px', display: 'flex', mb: 4 }} key={coupon?._id}>
                                {/*  */}
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: '140px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'gold',
                                        borderRadius: 2,
                                        position: 'relative',
                                        borderRight: '3px dashed #ccc',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            height: 50,
                                            width: 50,
                                            top: '50%',
                                            left: '0%',
                                            transform: 'translate(0%, -50%)',
                                            bgcolor: '#000',
                                            backgroundImage:
                                                'radial-gradient(circle at 0 50%,transparent 20px,gold 15px)',
                                        },
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '20px',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontFamily: 'Libre Barcode',
                                            textAlign: 'center',
                                            zIndex: 2,

                                            mb: 2,
                                        }}
                                    >
                                        Tomtoc
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '18px',
                                            color: '#000',
                                            textAlign: 'center',
                                            zIndex: 2,
                                            fontWeight: 'bold',
                                            fontFamily: 'Libre Barcode',
                                        }}
                                    >
                                        Summer
                                    </CustomizeTypography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        width: '400px',
                                        bgcolor: 'gold',
                                        borderRadius: 2,
                                        position: 'relative',
                                        borderleft: '3px dashed #ccc',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            height: 50,
                                            width: 50,
                                            top: '50%',
                                            right: '0%',
                                            transform: 'translate(0%, -50%)',
                                            bgcolor: '#000',
                                            backgroundImage:
                                                'radial-gradient(circle at 100% 50%,transparent 20px,gold 15px)',
                                        },
                                    }}
                                >
                                    {/* Discription */}
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '20px',
                                            color: '#000',
                                            textAlign: 'center',
                                            zIndex: 2,
                                            fontFamily: 'Libre Barcode',
                                        }}
                                    >
                                        {/* Summer discount 10% off. */}
                                        {coupon.description}
                                    </CustomizeTypography>
                                    {/* Code */}

                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '32px',
                                            textAlign: 'center',
                                            padding: '0 14px',
                                            zIndex: 2,
                                            color: 'gold',
                                            fontFamily: 'Libre Barcode',
                                            bgcolor: '#000',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {/* Summer2020 */}
                                        {coupon.code}
                                    </CustomizeTypography>
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '18px',
                                            color: '#000',
                                            textAlign: 'center',
                                            zIndex: 2,
                                            fontFamily: 'Libre Barcode',
                                        }}
                                    >
                                        Valid until:
                                        {/* 30/11/2024 */}
                                        {/* //DD/MM/YYYY */}
                                        {formatDateDD(coupon.startDate)}
                                    </CustomizeTypography>
                                    <Button
                                        variant="contained"
                                        // disabled={true}
                                        sx={{
                                            p: '4px 24px',
                                            borderRadius: '24px',
                                            color: 'gold',
                                            bgcolor: '#000',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            textTransform: 'initial',

                                            borderColor: theme.palette.text.main,
                                            '&:hover': {
                                                cursor: 'pointer',
                                                borderColor: theme.palette.text.main,
                                                bgcolor: '#000',
                                            },
                                            '&.Mui-disabled': {
                                                color: '#ccc',
                                                borderColor: '#ccc',
                                                bgcolor: '#ccc',
                                            },
                                        }}
                                    >
                                        Claim
                                    </Button>
                                </Box>
                            </Box>
                        ),
                )}
            </Box>
        </Box>
    );
}

export default TicketCoupon;
