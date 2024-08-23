import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { perfumeData } from './perfumeData';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

function PerfumesCard() {
    const navigate = useNavigate();
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <Grid container spacing={4}>
                {perfumeData.map((perfume, index) => (
                    <Grid item lg={3} key={index}>
                        <Box
                            sx={{
                                minHeight: '50px',
                                borderRadius: '8px',
                                bgcolor: theme.palette.bestSelling,
                                position: 'relative',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={() => navigate(`/product/${perfume.perfumeName}`)}
                        >
                            {perfume.discount && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '4%',
                                        height: '30px',
                                        width: '60px',
                                        // bgcolor: 'red',
                                        backgroundImage: `linear-gradient(-60deg, #b31217 0%, #e52d27 100%)`,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    - {perfume.perfumeDiscount}%
                                </Box>
                            )}

                            <Box
                                component={'img'}
                                src={perfume.perfumeImage}
                                sx={{ height: '250px' }}
                                lazy="loading"
                            />
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* brand */}
                                <CustomizeTypography>
                                    {/* Dior */}
                                    {perfume.perfumeBrand}
                                </CustomizeTypography>
                                {/* perfume name */}
                                <CustomizeTypography>
                                    {/* Homme Intense */}
                                    {perfume.perfumeName}
                                </CustomizeTypography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        // justifyContent: 'space-between',
                                        alignItems: 'center',
                                        // mb: 1,
                                    }}
                                >
                                    <Rating
                                        value={perfume.perfumeRating}
                                        // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                        sx={{
                                            fontSize: '18px',
                                            // change border color
                                            '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                                color: theme.palette.thirth.main,
                                            },
                                            mb: 1,
                                        }}
                                    />
                                    {/* number of rating */}
                                    <CustomizeTypography sx={{ ml: 1 }}>
                                        ({perfume.numberOfRating})
                                    </CustomizeTypography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        // justifyContent: 'space-between',
                                        alignItems: 'center',
                                        // mb: 2,
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{
                                            fontWeight: 'bold',
                                            zIndex: 99,
                                            textDecoration: perfume.discount
                                                ? 'line-through'
                                                : 'null',
                                        }}
                                    >
                                        {/* 3.280.000 */}
                                        {perfume.perfumePriceVND}
                                    </CustomizeTypography>

                                    {perfume.discount && (
                                        <CustomizeTypography
                                            sx={{
                                                color: theme.palette.thirth.main,
                                                fontWeight: 'bold',
                                                zIndex: 99,
                                                ml: 2,
                                            }}
                                        >
                                            {/* 2.280.000 */}
                                            {perfume.perfumePriceDiscount}
                                        </CustomizeTypography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PerfumesCard;
