import { Box, Container } from '@mui/material';
import React from 'react';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { unisexInformation } from '../PerfumesCard/perfumeData';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

function ShopPageInformation() {
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
                        {information.title}
                    </CustomizeTypography>
                    <Box>
                        {information.contents.map((content, index) => {
                            // split content into another array if it contains Tomtoc
                            const parts = content.split(/(Tomtoc Perfumes)/g);
                            console.log(parts);
                            return (
                                <CustomizeTypography
                                    key={index}
                                    sx={{ fontSize: '16px', mb: 1, textAlign: 'justify' }}
                                >
                                    {parts.map((part, index) =>
                                        part === 'Tomtoc Perfumes' ? (
                                            <span
                                                key={index}
                                                style={{
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                    color: theme.palette.secondaryText,
                                                }}
                                                onClick={handleBackToTop}
                                            >
                                                {part}
                                            </span>
                                        ) : (
                                            part
                                        ),
                                    )}
                                </CustomizeTypography>
                            );
                        })}
                    </Box>
                </Box>
            ))}
        </Container>
    );
}

export default ShopPageInformation;
