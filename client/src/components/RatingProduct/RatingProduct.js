import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { ratingData } from './ratingData';
import CustomizeButton from '../CustomizeButton/CustomizeButton';

function RatingProduct() {
    return (
        <Container sx={{ mt: 2 }}>
            <CustomizeTypography
                sx={{ fontSize: '32px', fontWeight: 'bold', color: theme.palette.text.primary }}
            >
                Đánh giá & Hỏi đáp về sản phẩm
            </CustomizeTypography>
            {/* number of ratings */}
            <CustomizeTypography>
                2 đánh giá cho Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum
            </CustomizeTypography>
            <Grid container>
                <Grid container item lg={9} sx={{ border: '1px solid #333', minheight: '20px' }}>
                    <Grid item lg={3}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    5.0
                                </CustomizeTypography>
                                <StarIcon
                                    sx={{
                                        ml: 1,
                                        fontSize: '32px',
                                        color: theme.palette.text.primary,
                                        mb: 1,
                                    }}
                                />
                            </Box>
                            <CustomizeTypography>Đánh giá trung bình</CustomizeTypography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        sx={{ borderLeft: '1px solid #333', borderRight: '1px solid #333', p: 1 }}
                    >
                        <Box>
                            {ratingData.map((rating, index) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                                    <CustomizeTypography>
                                        {rating.numberOfRating}
                                    </CustomizeTypography>
                                    <StarIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '24px',
                                            mb: 1,
                                            ml: 1,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            mb: 1,
                                            ml: 1,
                                            width: '150px',
                                            height: '15px',
                                            borderRadius: '4px',
                                            bgcolor: theme.palette.text.secondary,
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CustomizeTypography sx={{ ml: 1 }}>
                                            100%
                                        </CustomizeTypography>
                                        <Box
                                            sx={{
                                                height: '15px',
                                                width: '1px',
                                                bgcolor: '#fff',
                                                mx: 1,
                                                mb: 1,
                                            }}
                                        />
                                        <CustomizeTypography sx={{ ml: 1 }}>
                                            2 đánh giá
                                        </CustomizeTypography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CustomizeButton textAction={'Đánh giá ngay'} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RatingProduct;
