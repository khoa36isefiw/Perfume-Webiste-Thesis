import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function DeliveryAnimation() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');

    return (
        <Box
            sx={{
                margin: 'auto',
                height: 'auto',
                width: '100%',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 0 0.75rem #ccc)',
            }}
            class="animate__animated animate__bounceInLeft"
        >
            <iframe
                title="Delivery Animation"
                src="https://lottie.host/embed/487ec28f-5cf8-49bb-85da-03879c7a0421/ni4ErUpPwn.lottie"
                style={{ border: 0, width: '600px', height: '600px' }}
            />

            {/* <CustomizeTypography
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'red',
                }}
            >
                We are comming
            </CustomizeTypography>
            <CustomizeTypography sx={{ textAlign: 'center' }}>Wait for ussss</CustomizeTypography>
            <Button
                onClick={() => navigate(`/${i18n.language}`)}
                variant="contained"
                sx={{
                    mt: 2,
                    width: '200px',
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
                Back home
            </Button> */}
        </Box>
    );
}

export default DeliveryAnimation;
