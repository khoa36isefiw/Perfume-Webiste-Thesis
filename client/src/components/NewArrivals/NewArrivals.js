import React from 'react';
import NewArrival from '../../assets/images/homepage_new_arrivals.png';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { fadeInAnimation } from '../AnimationEffects/AnimationEffects';

function NewArrivals() {
    return (
        <Container sx={{ height: '700px' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item lg={8}>
                    <Box sx={{ mb: 4 }}>
                        <CustomizeTypography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '56px',
                                ...fadeInAnimation,
                            }}
                        >
                            Elevate Your Spirit with Victory Scented Fragrances!
                        </CustomizeTypography>
                        <CustomizeTypography
                            fontSize="24px"
                            sx={{
                                my: 2,
                                width: '550px',
                                animation: 'fadeIn 2.5s ease-in-out',
                                '@keyframes fadeIn': {
                                    from: { opacity: 0, transform: 'translateY(20px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' },
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
                <Grid item lg={4}>
                    <Box
                        component={'img'}
                        src={NewArrival}
                        sx={{ width: '450px', height: '700px' }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewArrivals;
