import { Box, Container } from '@mui/material';
import React from 'react';
import { brandsData } from './brandsData';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

function PerfumeBrands() {
    return (
        <Container
            sx={{
                mt: 16,
                display: 'flex',
                // Wrap items into multiple lines
                flexWrap: 'wrap',
            }}
        >
            {brandsData.map((brand, index) => (
                <Box
                    key={index}
                    component={'img'}
                    alt={brand.brandName}
                    src={brand.brandImage}
                    sx={{
                        bgcolor: '#fff',
                        height: '60px',
                        width: '140px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        ml: 1,
                        mb: 2,
                        p: '4px',
                        objectFit: 'contain',
                        transition: 'border 0.3s ease',
                        '&:hover': {
                            cursor: 'pointer',
                            border: `4px solid ${theme.palette.secondaryText}`,
                        },
                        // Set fixed width for larger screens
                        flexBasis: '140px',
                        [ipadProScreen]: {
                            width: '20%',
                            flexBasis: '20%',
                            marginLeft: '4%',
                        },
                        [tabletScreen]: {
                            width: '20%',
                            flexBasis: '20%',
                            marginLeft: '4%',
                        },
                        [mobileScreen]: {
                            // Set width to 45% for mobile to display 2 items per row
                            width: '45%',
                            flexBasis: '45%',
                            // Center items on mobile screens
                            marginLeft: '3.5%',
                        },
                    }}
                    lazy="loading"
                />
            ))}
        </Container>
    );
}

export default PerfumeBrands;
