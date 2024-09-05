import { Avatar, Box, Grid } from '@mui/material';
import React from 'react';
import ourValues from '../../assets/images/our_values.png';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

function OurValues() {
    return (
        <Box sx={{ height: '600px' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item lg={6}>
                    <Avatar
                        src={ourValues}
                        sx={{ height: '100%', width: '100%', borderRadius: 0 }}
                        alt="Our Values"
                    />
                </Grid>
                <Grid
                    item
                    lg={6}
                    className="animate__animated animate__backInRight"
                    sx={{
                        p: 6, // apply animation

                        // happeans only when the particular element is visible on the screen
                        animationTimeline: 'view()',
                        animationRange: 'entry 20% cover 20%',
                    }}
                >
                    <CustomizeTypography sx={{ textAlign: 'center', fontSize: '48px', mb: 4 }}>
                        Our Values
                    </CustomizeTypography>
                    <CustomizeTypography
                        sx={{ fontSize: '18px', textIndent: '48px', textAlign: 'justify', mb: 4 }}
                    >
                        At Local Face, our perfume retail store is built on a foundation of passion
                        and authenticity. We believe in celebrating the individuality of every
                        customer, providing a diverse collection of scents that resonate with their
                        unique personality and style. Our dedicated team of fragrance enthusiasts is
                        committed to creating a welcoming and inclusive environment, where
                        connections are forged, and inspiration thrives.
                    </CustomizeTypography>

                    <CustomizeTypography
                        sx={{ fontSize: '18px', textIndent: '48px', textAlign: 'justify' }}
                    >
                        Embracing sustainability and continuous learning, Local Face strives to be
                        more than just a shopping destination; we are a community that inspires and
                        empowers individuals on their fragrance journey.
                    </CustomizeTypography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default OurValues;
