import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/about_us-bg.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function Introduce() {
    const { t } = useTranslation('translate');

    return (
        <Box
            sx={{
                my: theme.spacingAxis.boxVerticalAxis,
                height: '600px',
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

                position: 'relative',
                width: '100%',
                [tabletScreen]: {
                    width: '100%',
                    height: '600px',
                    backgroundPosition: 'center',
                },
                [mobileScreen]: {
                    width: '100%',
                    height: '600px',
                    backgroundPosition: 'center',
                },
            }}
        >
            {/* make overlay above background image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // overlay modal
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1,
                    [tabletScreen]: {
                        width: '100%',
                    },
                    [mobileScreen]: {
                        width: '100%',
                    },
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '50%',
                    transform: 'translate(50%,-50%)',
                    textAlign: 'center',
                    zIndex: 2,
                    [mobileScreen]: {
                        top: '25%',
                        right: 0,
                        transform: 'translate(0%,0%)',
                        textAlign: 'justify',
                        p: 2,
                    },
                }}
            >
                <CustomizeTitle heading={t('common.aboutPage.aboutUs')} />
                <CustomizeTypography sx={{ fontSize: '18px', color: '#FFFFFF' }}>
                    {t('common.aboutPage.aboutText')}
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default Introduce;
