import { Box, Container } from '@mui/material';
import React from 'react';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { unisexInformation } from '../PerfumesCard/perfumeData';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ShopPageInformation() {
    const { t, i18n } = useTranslation('translate');
    const handleBackToTop = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // return the top
    };
    const navigate = useNavigate();
    return (
        <Container sx={{ mt: 12 }}>
            {unisexInformation.map((information, index) => (
                <Box key={index}>
                    <CustomizeTypography
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: theme.palette.secondaryText,
                            mb: 2,
                        }}
                    >
                        {t(`common.categoriesType.unisex.${information.title}`)}
                    </CustomizeTypography>

                    {information.contents.map((content, idx) => {
                        return (
                            <CustomizeTypography
                                key={idx}
                                sx={{ fontSize: '16px', mb: 1, textAlign: 'justify' }}
                            >
                                {t(`common.categoriesType.unisex.${content}`)}
                            </CustomizeTypography>
                        );
                    })}
                </Box>
            ))}
        </Container>
    );
}

export default ShopPageInformation;
