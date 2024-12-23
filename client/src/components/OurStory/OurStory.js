import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';
import { ipadProScreen, mobileScreen, tabletScreen } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function OurStory() {
    const { t } = useTranslation('translate');
    return (
        <Box sx={{ position: 'relative', height: '400px' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    [ipadProScreen]: {
                        top: '35%',
                    },
                    [tabletScreen]: {
                        top: '40%',
                    },
                    [mobileScreen]: {
                        top: '-5%',
                        left: 0,
                        transform: 'translate(0%,0%)',
                        textAlign: 'justify',
                        p: 2,
                    },
                }}
            >
                <CustomizeTitle heading={t('common.aboutPage.aboutStory')} />
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center',

                        [mobileScreen]: {
                            textAlign: 'justify',
                        },
                    }}
                >
                    {/* Tomtoc Perfumes was founded by a group of perfume enthusiasts with a shared
                    vision to create a haven for perfume lovers seeking authentic, locally-inspired
                    fragrances. Inspired by the diversity and richness of cultures around the world,
                    we set out on a journey to curate a collection of scents that capture the
                    essence of each region. Our aim is to bring you closer to the heart and soul of
                    different cultures through the art of perfumery. */}
                    {t('common.aboutPage.aboutStoryText')}
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default OurStory;
