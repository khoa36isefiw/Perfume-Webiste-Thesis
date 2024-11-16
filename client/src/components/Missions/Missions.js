import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box, Container, Grid, IconButton } from '@mui/material';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { missionsData } from './missionsData';
import { useTranslation } from 'react-i18next';

function Missions() {
    const { t } = useTranslation('translate');
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <Box sx={{ textAlign: 'center' }}>
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        [mobileScreen]: {
                            textAlign: 'justify',
                        },
                    }}
                >
                    {/* Our mission is to empower individuals with knowledge and facilitate meaningful
                    connections through our platform. */}
                    {t(`common.servicesPage.ser1`)}
                </CustomizeTypography>
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        [mobileScreen]: {
                            textAlign: 'justify',
                        },
                    }}
                >
                    {/* We understand the importance of reliable and up-to-date information in today's
                    fast-paced world. */}
                    {t(`common.servicesPage.ser2`)}
                </CustomizeTypography>
            </Box>
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {missionsData.map((mission, index) => (
                    <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                        <Box
                            sx={{
                                p: 2,
                                background: theme.palette.bestSelling,
                                borderRadius: 2,
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                height: '100%',
                                // Smooth transition
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'translateY(-20px)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        color: theme.palette.secondaryText,
                                        [tabletScreen]: {
                                            fontSize: theme.fontSize.tablet.heading20,
                                            mb: 0,
                                        },
                                    }}
                                >
                                    {t(
                                        `common.servicesPage.listBenefits.${mission.missionKey}.title`,
                                    )}
                                </CustomizeTypography>
                                <IconButton>{mission.missionIcon}</IconButton>
                            </Box>
                            <CustomizeTypography
                                sx={{
                                    textAlign: 'justify',
                                }}
                            >
                                {t(
                                    `common.servicesPage.listBenefits.${mission.missionKey}.content`,
                                )}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
                <CustomizeTypography
                    sx={{
                        mb: 2,
                        [tabletScreen]: {
                            textAlign: 'justify',
                        },
                        [mobileScreen]: {
                            textAlign: 'justify',
                        },
                    }}
                >
                    {/* At Tomtoc, our passion for perfumery drives us to go above and beyond to serve
                    you better. We invite you to experience our exceptional services and indulge in
                    the world of luxurious scents. Let us be your trusted fragrance destination,
                    where your olfactory dreams come to life. */}
                    {t(`common.servicesPage.ser3`)}
                </CustomizeTypography>
                <CustomizeTypography
                    sx={{
                        mb: 2,
                        [tabletScreen]: {
                            textAlign: 'justify',
                        },
                        [mobileScreen]: {
                            textAlign: 'justify',
                        },
                    }}
                >
                    {/* If you have any questions or need assistance, please do not hesitate to reach
                    out to our friendly team. We're here to make your fragrance exploration a truly
                    memorable one. */}
                    {t(`common.servicesPage.ser4`)}
                </CustomizeTypography>
                <CustomizeTypography>{t(`common.servicesPage.ser5`)}</CustomizeTypography>
            </Box>
        </Container>
    );
}

export default Missions;
