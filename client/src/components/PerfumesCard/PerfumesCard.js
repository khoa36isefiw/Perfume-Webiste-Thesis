import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { perfumeData } from './perfumeData';
import { theme } from '../../Theme/Theme';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import BoltIcon from '@mui/icons-material/Bolt';
import { converToVND } from '../convertToVND/convertToVND';

function PerfumesCard() {
    const navigate = useNavigate();
    const handleNavigationProductDetail = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/product/${perfume.perfumeID}`, { state: { perfume } });
        backTop();
    };
    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
            <Grid container spacing={4}>
                {perfumeData.map((perfume, index) => (
                    <Grid item lg={3} key={index}>
                        <Box
                            sx={{
                                height: '420px',
                                borderRadius: '8px',
                                bgcolor: theme.palette.bestSelling,
                                py: 1,
                                position: 'relative',
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                            // onClick={() => navigate(`/product/${perfume.perfumeID}`)}
                            onClick={() => handleNavigationProductDetail(perfume)}
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

                            {perfume.flashSale && (
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        top: '4%',
                                        right: 0,
                                        height: '30px',
                                        width: '80px',
                                        // bgcolor: 'red',
                                        backgroundColor: theme.palette.flashSale.bg,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: theme.palette.flashSale.icon,
                                        '&:hover': {
                                            bgcolor: theme.palette.flashSale.bg,
                                        },
                                    }}
                                    startIcon={<BoltIcon sx={{ fontSize: '24px' }} />}
                                >
                                    - {perfume.flashSaleNumber}%
                                </Button>
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
                                        {converToVND(perfume.perfumePriceVND)}
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
                                            {converToVND(perfume.perfumePriceDiscount)}
                                        </CustomizeTypography>
                                    )}
                                </Box>
                            </Box>

                            {/* flash sale, discount, chương trình khuyến mãi */}
                            {perfume.flashSale && (
                                <Box
                                    sx={{
                                        px: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '20px',
                                            borderRadius: '12px',
                                            bgcolor: '#ffbda6',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            src={
                                                'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/c5316dd01de2b0d41d26.png'
                                            }
                                            alt="Flash Sale"
                                            component={'img'}
                                            sx={{
                                                height: '25px',
                                                width: '25px',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                transform: 'translateY(-15px)',
                                            }}
                                        />

                                        <Box
                                            sx={{
                                                width: '50%',
                                                overflow: 'hidden',
                                                background:
                                                    'linear-gradient(270deg, #ffb000, #eb1717)',
                                                height: '100%',
                                                borderRadius: '12px',
                                            }}
                                        />

                                        <CustomizeTypography
                                            sx={{
                                                position: 'absolute',
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                // color: '#555',
                                                borderRadius: '12px',
                                                top: 0,
                                                left: '10%',
                                                zIndex: 99,
                                                mb: 0,
                                            }}
                                        >
                                            Flash Sale
                                        </CustomizeTypography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PerfumesCard;
