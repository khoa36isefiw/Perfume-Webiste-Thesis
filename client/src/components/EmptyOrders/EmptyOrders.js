import { Avatar, Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import emptyOrder from '../../assets/images/box.png';
import { mobileScreen, theme } from '../../Theme/Theme';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function EmptyOrders() {
    const navigate = useNavigate();
    const { t } = useTranslation('translate');
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
                {/* No order placed yet! */}
                {t('common.accountSettings.purchase.title')}
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
                {t('common.accountSettings.purchase.noOrder.content')}
            </CustomizeTypography>
            <CustomizeButton
                onHandleClick={() => navigate('/shop')}
                textAction={t('common.accountSettings.purchase.noOrder.shopping')}
            />
        </Box>
    );
}

export default EmptyOrders;
