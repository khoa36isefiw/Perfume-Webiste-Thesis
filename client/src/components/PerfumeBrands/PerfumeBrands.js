import { Box, Container } from '@mui/material';
import React from 'react';
import { brandsData } from './brandsData';
import { theme } from '../../Theme/Theme';

function PerfumeBrands() {
    return (
        <Container sx={{ mt: 16 }}>
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
                        p: '4px',
                        objectFit: 'contain',
                        transition: 'border 0.3s ease',
                        '&:hover': {
                            cursor: 'pointer',
                            border: `4px solid ${theme.palette.secondaryText}`,
                        },
                    }}
                    lazy="loading"
                />
            ))}
        </Container>
    );
}

export default PerfumeBrands;
