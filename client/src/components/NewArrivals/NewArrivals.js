import React from 'react';
import NewArrival from '../../assets/images/homepage_new_arrivals.png';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { fadeInAnimation } from '../AnimationEffects/AnimationEffects';
import { mobileScreen } from '../../Theme/Theme';

function NewArrivals() {
    return (
        <Container
            sx={{
                minHeight: '700px',
                [mobileScreen]: {
                    minHeight: '500px',
                },
            }}
        >
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item sm={12} md={8} lg={8}>
                    <Box sx={{ mb: 4 }}>
                        <CustomizeTypography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '56px',
                                ...fadeInAnimation,
                                [mobileScreen]: {
                                    fontSize: '32px',
                                },
                            }}
                        >
                            Elevate Your Spirit with Victory Scented Fragrances!
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '24px',
                                my: 2,
                                width: '550px',
                                animation: 'fadeIn 2.5s ease-in-out',
                                '@keyframes fadeIn': {
                                    from: { opacity: 0, transform: 'translateY(20px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
                                },
                                [mobileScreen]: {
                                    width: '100%',
                                    fontSize: '20px',
                                },
                            }}
                        >
                            Shop now and embrace the sweet smell of victory with Local Face.
                        </CustomizeTypography>
                    </Box>
                    <Box
                        sx={{
                            animation: 'fadeIn 2.5s ease-in-out',
                            // define animation
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(20px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}
                    >
                        <CustomizeButton textAction={'Shop Now'} />
                    </Box>
                </Grid>
                <Grid item sm={12} md={4} lg={4}>
                    <Box
                        component={'img'}
                        src={NewArrival}
                        sx={{
                            width: '450px',
                            height: '700px',
                            objectFit: 'cover',
                            [mobileScreen]: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                // height: '500px',
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewArrivals;
