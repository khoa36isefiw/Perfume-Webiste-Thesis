import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useTranslation } from 'react-i18next';

function PaymentFailed() {
    const { t } = useTranslation('translate');
    return (
        <Box
            sx={{
                margin: 'auto',
                mt: 24,
                minHeight: '400px',
                width: '380px',
                bgcolor: '#000',
                border: '1px solid #fff',
                zIndex: 2,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 0 0.75rem #ccc)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '350px',
                    height: '350px',
                }}
            >
                <iframe
                    title="payment failed"
                    src="https://lottie.host/embed/fb326bcc-21c5-4f37-9779-c4d3c888a88f/zDdD1MoRsl.json"
                    style={{ border: 0, width: '70%', height: '70%' }}
                />
                <CustomizeTypography
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        color: 'red',
                    }}
                >
                    {t('common.payment.failed.title')}
                </CustomizeTypography>
                <CustomizeTypography sx={{ textAlign: 'center' }}>
                    {t('common.payment.failed.content')}
                </CustomizeTypography>
                <Button
                    // onClick={onHandleClick}
                    variant="contained"
                    sx={{
                        mt: 4,
                        width: '50%',
                        py: 1,
                        borderRadius: '24px',
                        bgcolor: 'red',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'initial',
                        '&:hover': {
                            filter: 'drop-shadow(0 0 0.75rem #ccc)',
                            bgcolor: 'red',
                        },
                    }}
                >
                    {t('common.payment.failed.tryAgain')}
                </Button>
            </Box>
        </Box>
    );
}

export default PaymentFailed;
