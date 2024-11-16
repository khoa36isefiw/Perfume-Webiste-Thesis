import React, { useEffect } from 'react';
import NewArrival from '../../assets/images/homepage_new_arrivals.png';
import { Box, Container, Grid, Modal } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { fadeInAnimation } from '../AnimationEffects/AnimationEffects';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function NewArrivals() {
    const { t, i18n } = useTranslation('translate');
    const language = window.localStorage.getItem('language') || 'en';
    const navigate = useNavigate();

    useEffect(() => {
        // prevent change to default language

        i18n.changeLanguage(language); // Set the language for i18n
    }, []);
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            {/* <Grid container sx={{ display: 'flex', alignItems: 'center' }}> */}
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} sm={6} md={8} lg={8}>
                    <Box>
                        <Box sx={{ mb: 4 }}>
                            <CustomizeTypography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '56px',
                                    ...fadeInAnimation,
                                    [tabletScreen]: {
                                        fontSize: '24px',
                                    },
                                    [mobileScreen]: {
                                        fontSize: '32px',
                                    },
                                }}
                            >
                                {/* Elevate Your Spirit with Victory Scented Fragrances! */}
                                {/* {language === 'vi'
                                    ? t('common.newArrivalHeading')
                                    : t('common.newArrivalHeadingVN')} */}
                                {t('common.newArrivalHeading')}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '24px',
                                    my: 2,
                                    width: '550px',
                                    animation: 'fadeIn 2.5s ease-in-out',
                                    '@keyframes fadeIn': {
                                        from: { opacity: 0, transform: 'translateY(20px)' },
                                        to: { opacity: 1, transform: 'translateY(0)' },
                                    },
                                    [tabletScreen]: {
                                        width: '100%',
                                        fontSize: '22px',
                                    },
                                    [mobileScreen]: {
                                        width: '100%',
                                        fontSize: '20px',
                                    },
                                }}
                            >
                                {/* Shop now and embrace the sweet smell of victory with Tomtoc. */}
                                {t('common.newArrivalText')}
                            </CustomizeTypography>
                        </Box>
                        <Box
                            sx={{
                                animation: 'fadeIn 2.5s ease-in-out',
                                // define animation
                                '@keyframes fadeIn': {
                                    from: { opacity: 0, transform: 'translateY(20px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                                display: 'flex',
                            }}
                        >
                            <CustomizeButton
                                textAction={t('common.shopNow')}
                                onHandleClick={() => navigate(`/${language}/shop`)}
                            />

                            <Box sx={{ mx: 2 }}>
                                <CustomizeButtonOutlined
                                    textAction={t('common.coupon')}
                                    onHandleClick={() => navigate(`/${language}/coupon`)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Box
                        component={'img'}
                        src={NewArrival}
                        sx={{
                            overflow: 'hidden',
                            width: '450px',
                            height: '700px',

                            objectFit: 'cover',
                            [mobileScreen]: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                // height: '500px',
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewArrivals;
