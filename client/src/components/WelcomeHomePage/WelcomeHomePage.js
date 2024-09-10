import { Box } from '@mui/material';
import React from 'react';
import bg from '../../assets/images/about_us-bg2.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
// import { scrollAppearingAnimation } from '../AnimationEffects/AnimationEffects';

function WelcomeHomePage() {
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
                // overflow: 'hidden',

                // '@keyframes appear': {
                //     from: { opacity: 0, scale: 0.5 },
                //     to: { opacity: 1, scale: 1 },
                // },

                // animation: 'appear 5s linear',

                // happeans only when the particular element is visible on the screen
                // animationTimeline: 'view()',
                // animationRange: 'entry 30% cover 60%',
                // ...scrollAppearingAnimation,
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
                        top: '5%',
                        right: 0,
                        transform: 'translate(0%,0%)',
                        textAlign: 'justify',
                        p: 2,
                    },
                }}
            >
                <CustomizeTypography
                    sx={{
                        mb: 4,
                        fontSize: '46px',
                        fontWeight: 'bold',
                        color: theme.palette.secondaryText,
                        [mobileScreen]: {
                            fontSize: theme.fontSize.mobile.heading,
                            textAlign: 'center',
                        },
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
