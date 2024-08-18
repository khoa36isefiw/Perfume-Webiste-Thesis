import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/welcome-note-hp.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

function WelcomeHomePage() {
    return (
        <Box
            sx={{
                height: '600px',
                backgroundImage: `url(${bg})`,
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
                <CustomizeTypography sx={{ fontSize: '18px', color: '#FFFFFF' }}>
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
