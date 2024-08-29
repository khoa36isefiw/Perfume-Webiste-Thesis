import React from 'react';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';

function OurStory() {
    return (
        <Box sx={{ position: 'relative', height: '400px' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }}
            >
                <CustomizeTitle heading={'Our Story'} />
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center',
                    }}
                >
                    Tomtoc Perfumes was founded by a group of perfume enthusiasts with a shared
                    vision to create a haven for perfume lovers seeking authentic, locally-inspired
                    fragrances. Inspired by the diversity and richness of cultures around the world,
                    we set out on a journey to curate a collection of scents that capture the
                    essence of each region. Our aim is to bring you closer to the heart and soul of
                    different cultures through the art of perfumery.
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default OurStory;
