import { Container, Grid, Box } from '@mui/material';
import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { tabletScreen, theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

const aboutUsUnique = ['unique1', 'unique2', 'unique3'];

const thanks = ['thanks1', 'thanks2', 'thanks3'];

function WhyWeUnique() {
    const { t } = useTranslation('translate');
    return (
        <Container sx={{ my: 4 }}>
            <CustomizeTitle heading={t('common.aboutPage.aboutUnique')} />
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {aboutUsUnique.map((item, index) => (
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
                                [tabletScreen]: {
                                    p: 1,
                                },
                            }}
                        >
                            <CustomizeTypography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: theme.palette.text.secondary,
                                    [tabletScreen]: {
                                        fontSize: theme.fontSize.tablet.text,
                                    },
                                }}
                            >
                                {/* {item.title} */}
                                {t(`common.aboutPage.aboutUniqueList.${item}.title`)}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    textAlign: 'justify',
                                    fontSize: theme.fontSize.tablet.text14,
                                }}
                            >
                                {t(`common.aboutPage.aboutUniqueList.${item}.content`)}
                            </CustomizeTypography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ my: 4 }}>
                {thanks.map((thank, index) => (
                    <CustomizeTypography
                        key={index}
                        sx={{ mb: 2, fontSize: '16px', textAlign: 'justify' }}
                    >
                        {t(`common.aboutPage.aboutUniqueList.${thank}`)}
                    </CustomizeTypography>
                ))}
            </Box>
        </Container>
    );
}

export default WhyWeUnique;
