import { Box } from '@mui/material';
import React from 'react';
import service from '../../assets/images/our_services_1.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { mobileScreen } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';

function ServicesIntroduction() {
    const { t } = useTranslation('translate');
    return (
        <Box
            sx={{
                height: '600px',
                backgroundImage: `url(${service})`,
                objectFit: 'cover',
                backgroundSize: 'cover',
                position: 'relative',
                width: '100%',
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
                        p: 2,
                        top: '20%',
                        right: '0',
                        transform: 'translate(0,-0)',
                    },
                }}
            >
                <CustomizeTitle heading={t('common.servicesPage.ourService')} />
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        color: '#FFFFFF',
                        [mobileScreen]: {
                            textAlign: 'justify',
                            mt: 4,
                        },
                    }}
                >
                    {/* At Tomtoc, we are dedicated to providing you with a delightful and immersive
                    perfume shopping experience. Our services are tailored to ensure that you find
                    the perfect fragrance that complements your unique personality and style. We
                    take pride in offering a range of services that go beyond just selling perfumes,
                    aiming to make your journey with us truly special. */}
                    {t('common.servicesPage.ourServiceText')}
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default ServicesIntroduction;
