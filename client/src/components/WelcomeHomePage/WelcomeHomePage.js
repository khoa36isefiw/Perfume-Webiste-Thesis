import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/welcome-note-hp.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

function WelcomeHomePage() {
    return (
        <Box sx={{ height: '600px', position: 'relative' }}>
            <Box
                component={'img'}
                src={bg}
                sx={{ height: '100%', opacity: '0.15' }}
                alt={'Home Page Image'}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '50%',
                    transform: 'translate(50%,-50%)',
                    textAlign: 'center',
                }}
            >
                <CustomizeTypography
                    sx={{
                        mb: 4,
                        fontSize: '46px',
                        fontWeight: 'bold',
                        color: theme.palette.secondaryText,
                    }}
                >
                    Welcome to Tomtoc Perfumes
                </CustomizeTypography>
                <CustomizeTypography sx={{ fontSize: '18px' }}>
                    Welcome to Tomtoc Perfumes, where the spirit of victory and triumph come alive
                    through scents that empower and inspire. Our curated collection, aptly named
                    "Victory Scented," is a celebration of success and elegance, designed to unleash
                    your victorious essence. Indulge in the sweet taste of triumph with captivating
                    fragrances that tell the tale of your achievements. At Local Face, we believe
                    that every victory deserves a signature scent, and we are dedicated to providing
                    unforgettable fragrances that elevate your spirit and empower your journey.
                </CustomizeTypography>
            </Box>
        </Box>
    );
}

export default WelcomeHomePage;
