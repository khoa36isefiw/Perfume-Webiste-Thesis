import { Avatar, Box, Container, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const perfumesData = [
    {
        perfumeUrl:
            'https://a.mktgcdn.com/p/U6cfqrozI8W0sA3pxU9T1WhZ1vgBwf0Fs9HdX-RUcL4/1080x1080.jpg',
        perfumeName: 'Golden',
        perfumePrice: '220.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt34e0f_ziCdQfq5ElorCiPgX-yTvA_pv8NT9I2KVk-_RHRZfPtBa2timx3DzZEQ7lnKk&usqp=CAU',
        perfumeName: 'Owl',
        perfumePrice: '160.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl:
            'https://media.cnn.com/api/v1/images/stellar/prod/220707134827-editors-perfume-missdior.jpg?q=w_1110,c_fill',
        perfumeName: 'Solutions',
        perfumePrice: '250.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl:
            'https://a.mktgcdn.com/p/U6cfqrozI8W0sA3pxU9T1WhZ1vgBwf0Fs9HdX-RUcL4/1080x1080.jpg',
        perfumeName: 'Golden',
        perfumePrice: '220.00',
        perfumeCapacity: '100',
    },
];

function BestSellingProducts() {
    return (
        <Container sx={{ minHeight: '50px', py: theme.spacingAxis.boxVerticalAxis }}>
            <CustomizeTypography
                sx={{
                    fontSize: '46px',
                    color: theme.palette.secondaryText,
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                Best Selling Products
            </CustomizeTypography>
            {/* swiper */}
            <Box sx={{ height: '600px' }}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {perfumesData.map((perfume, index) => (
                        <Grid item lg={3} md={3}>
                            <Box
                                sx={{
                                    bgcolor: '#333',
                                    borderRadius: 2,
                                    height: '450px',
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Avatar
                                    src={perfume.perfumeUrl}
                                    sx={{ borderRadius: 0, height: '350px', width: '200px' }}
                                />
                                <CustomizeTypography
                                    textAlign={'center'}
                                    sx={{ textAlign: 'center', mt: 2 }}
                                >
                                    {perfume.perfumeName}
                                </CustomizeTypography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{
                                            color: theme.palette.secondaryText,
                                            fontBold: 'weight',
                                        }}
                                    >
                                        $ {perfume.perfumePrice}
                                    </CustomizeTypography>
                                    <CustomizeTypography sx={{ marginLeft: 1 }}>
                                        {perfume.perfumeCapacity} ml
                                    </CustomizeTypography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default BestSellingProducts;
