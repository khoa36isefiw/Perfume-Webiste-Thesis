import React from 'react';
import NewArrival from '../../assets/images/homepage_new_arrivals.png';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeButton from '../CustomizeButton/CustomizeButton';

function NewArrivals() {
    return (
        <Container sx={{ height: '700px' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item lg={8}>
                    <Box sx={{ mb: 4 }}>
                        <CustomizeTypography sx={{ fontWeight: 'bold', fontSize: '56px' }}>
                            Elevate Your Spirit with Victory Scented Fragrances!
                        </CustomizeTypography>
                        <CustomizeTypography fontSize="24px" sx={{ my: 2, width: '550px' }}>
                            Shop now and embrace the sweet smell of victory with Local Face.
                        </CustomizeTypography>
                    </Box>
                    <CustomizeButton textAction={'Shop Now'} />
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
