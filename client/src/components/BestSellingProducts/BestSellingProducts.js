import { Avatar, Box, Container, Grid, IconButton } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import Slider from 'react-slick';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import bestSelling1 from '../../assets/images/bs_hp_1.png';
import bestSelling2 from '../../assets/images/bs_hp_2.png';
import bestSelling3 from '../../assets/images/bs_hp_3.png';
import bestSelling4 from '../../assets/images/bs_hp_4.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const perfumesData = [
    {
        perfumeUrl: bestSelling1,
        perfumeName: 'Golden',
        perfumePrice: '220.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl: bestSelling2,
        perfumeName: 'Owl',
        perfumePrice: '160.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl: bestSelling3,
        perfumeName: 'Solutions',
        perfumePrice: '250.00',
        perfumeCapacity: '100',
    },
    {
        perfumeUrl: bestSelling4,
        perfumeName: 'Golden',
        perfumePrice: '220.00',
        perfumeCapacity: '100',
    },
];

function BestSellingProducts() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomizeNextArrow />,
        prevArrow: <CustomizPreviousArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Container sx={{ my: theme.spacingAxis.boxVerticalAxis }}>
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
            <Box sx={{ mt: 4 }}>
                <Slider {...settings}>
                    {perfumesData.map((perfume, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 2,
                                width: '180px',
                                // transition: 'transform 0.3s ease',
                                // '&:hover': {
                                //     cursor: 'pointer',
                                //     transform: 'translateY(-20px)',
                                // },
                            }}
                        >
                            <Grid
                                container
                                sx={{
                                    // background: `linear-gradient(${theme.palette.bestSelling}, ${theme.palette.bestSelling2})`,
                                    background: theme.palette.bestSelling,
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
                                    sx={{
                                        textAlign: 'center',
                                        my: 2,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
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
                            </Grid>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Container>
    );
}

export default BestSellingProducts;

function CustomizeNextArrow({ onClick }) {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: '-30px',
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}
        >
            <ArrowForwardIosIcon sx={{ fontSize: '36px', color: '#fff' }} />
        </IconButton>
    );
}

function CustomizPreviousArrow({ onClick }) {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '-20px',
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}
        >
            <ArrowBackIosIcon sx={{ fontSize: '36px', color: '#fff' }} />
        </IconButton>
    );
}
