import { Avatar, Box, Grid } from '@mui/material';
import React from 'react';
import ourValues from '../../assets/images/our_values.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function OurValues() {
    const { t } = useTranslation('translate');
    return (
        <Box
            sx={{
                my: theme.spacingAxis.boxVerticalAxis,
                height: '600px',
                [tabletScreen]: {
                    height: '700px',
                    mb: 30,
                },
                [mobileScreen]: {
                    height: '700px',
                    mb: 30,
                },
            }}
        >
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item sm={12} md={6} lg={6}>
                    <Avatar
                        src={ourValues}
                        sx={{ height: '100%', width: '100%', borderRadius: 0 }}
                        alt="Our Values"
                    />
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={6}
                    lg={6}
                    className="animate__animated animate__backInRight"
                    sx={{
                        p: 6, // apply animation

                        // happeans only when the particular element is visible on the screen
                        animationTimeline: 'view()',
                        animationRange: 'entry 20% cover 20%',
                        [mobileScreen]: {
                            p: 2,
                        },
                    }}
                >
                    <CustomizeTypography
                        sx={{
                            textAlign: 'center',
                            fontSize: '48px',
                            mb: 4,
                            fontWeight: 'bold',
                            color: theme.palette.secondaryText,
                            [mobileScreen]: {
                                fontSize: theme.fontSize.mobile.heading,
                            },
                        }}
                    >
                        {/* Our Values */}
                        {t('common.homeValuesTitle')}
                    </CustomizeTypography>
                    <CustomizeTypography
                        sx={{ fontSize: '18px', textIndent: '48px', textAlign: 'justify', mb: 4 }}
                    >
                        {/* At Local Face, our perfume retail store is built on a foundation of passion
                        and authenticity. We believe in celebrating the individuality of every
                        customer, providing a diverse collection of scents that resonate with their
                        unique personality and style. Our dedicated team of fragrance enthusiasts is
                        committed to creating a welcoming and inclusive environment, where
                        connections are forged, and inspiration thrives. */}
                        {t('common.homeValuesText')}
                    </CustomizeTypography>

                    <CustomizeTypography
                        sx={{ fontSize: '18px', textIndent: '48px', textAlign: 'justify' }}
                    >
                        Embracing sustainability and continuous learning, Local Face strives to be
                        more than just a shopping destination; we are a community that inspires and
                        empowers individuals on their fragrance journey.
                    </CustomizeTypography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default OurValues;
