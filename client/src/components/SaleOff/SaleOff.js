import { Box, Container } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import saleOff from '../../assets/images/hp_sell_of.png';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { mobileScreen, theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';

function SaleOff() {
    const { t, i18n } = useTranslation('translate');
    const navigate = useNavigate();
    return (
        <Container
            sx={{
                backgroundImage: `url(${saleOff})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                width: '100%',
                my: 8,
                p: 2,
                // border: '1px solid #d1d1d1',
                [mobileScreen]: {
                    p: 0,
                    height: '100%',
                    width: '100%',
                },
            }}
        >
            <Box sx={{ mt: 4, p: 4 }}>
                <CustomizeTypography
                    sx={{
                        fontSize: i18n.language === 'vi' ? '36px' : ' 48px',
                        fontWeight: 'bold',
                        width: '40%',
                        mb: 2,
                        [mobileScreen]: {
                            width: '80%',
                            fontSize: theme.fontSize.mobile.heading,
                        },
                    }}
                >
                    {t('common.saleOff.title')}
                </CustomizeTypography>
                <CustomizeTypography
                    sx={{
                        fontSize: '16px',
                        mb: 4,
                        width: '40%',
                        [mobileScreen]: {
                            width: '60%',
                        },
                    }}
                >
                    {t('common.saleOff.content')}
                </CustomizeTypography>
                <CustomizeButton
                    textAction={t('common.saleOff.know')}
                    onHandleClick={() => {
                        navigate(`/${i18n.language}/coupon`);
                        setTimeout(() => {
                            backTop();
                        }, 0);
                    }}
                />
            </Box>
        </Container>
    );
}

export default SaleOff;
