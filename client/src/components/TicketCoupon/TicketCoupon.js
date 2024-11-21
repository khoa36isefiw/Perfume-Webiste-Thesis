import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import useCoupons from '../../api/useCoupons';
import { formatDateDD } from '../FormatDate/formatDate';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TicketCoupon() {
    const { data: couponsData } = useCoupons();
    const { t } = useTranslation('translate');
    const [claimedCoupon, setClaimedCoupon] = useState([]);

    const handleCopy = (couponId, couponCode) => {
        // Copy the coupon code to clipboard
        navigator.clipboard
            .writeText(couponCode)
            .then(() => {
                console.log('Coupon code copied to clipboard:', couponCode);
                // Add the coupon to claimed list
                setClaimedCoupon((prev) => [...prev, couponId]);
            })
            .catch((err) => {
                console.error('Failed to copy coupon code:', err);
            });
    };

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
                {t('common.promotions.title')}
            </CustomizeTypography>
            <Box>
                {couponsData?.data.map(
                    (coupon) =>
                        coupon.status === 'active' && (
                            <Box sx={{ height: '200px', display: 'flex', mb: 4 }} key={coupon._id}>
                                {/* Coupon Box */}
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
                                        borderLeft: '3px dashed #ccc',
                                    }}
                                >
                                    {/* Description */}
                                    <CustomizeTypography
                                        sx={{
                                            fontSize: '20px',
                                            color: '#000',
                                            textAlign: 'center',
                                            zIndex: 2,
                                            fontFamily: 'Libre Barcode',
                                        }}
                                    >
                                        {coupon.description}
                                    </CustomizeTypography>
                                    {/* Coupon Code */}
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
                                        {t('common.promotions.valid')}:{' '}
                                        <strong>{formatDateDD(coupon.startDate)}</strong>
                                    </CustomizeTypography>
                                    <Button
                                        variant="contained"
                                        disabled={claimedCoupon.includes(coupon._id)}
                                        onClick={() => handleCopy(coupon._id, coupon.code)}
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
                                                color: 'green',
                                                borderColor: '#ccc',
                                                bgcolor: '#ccc',
                                            },
                                        }}
                                    >
                                        {!claimedCoupon.includes(coupon._id) ? 'Copy' : 'Copied'}
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
