import { Box } from '@mui/material';
import React from 'react';
import { brandsData } from './brandsData';

function PerfumeBrands() {
    return (
        <div>
            {brandsData.map((brand, index) => (
                <Box
                    component={'img'}
                    alt={brand.brandName}
                    src={brand.brandImage}
                    sx={{
                        bgcolor: '#fff',
                        height: '80px',
                        width: '150px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        objectFit: 'contain',
                    }}
                    lazy="loading"
                />
            ))}
        </div>
    );
}

export default PerfumeBrands;
