import { Avatar, Box, Container, Grid, IconButton } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import Slider from 'react-slick';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { perfumeData } from '../PerfumesCard/perfumeData';
import { converToVND } from '../convertToVND/convertToVND';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';

function BestSellingProducts() {
    const navigate = useNavigate();
    // cut the perfumeData list, just use 5 items in array
    const newList = perfumeData.slice(0, 5);
    const handleNavigateProductDetails = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/product/${perfume.perfumeID}`, { state: { perfume } });
        backTop();
    };
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
        <Container
            sx={{
                my: theme.spacingAxis.boxVerticalAxis16,
                [ipadProScreen]: {
                    mt: 10,
                },
                [tabletScreen]: {
                    mt: 60,
                },

                [mobileScreen]: {
                    mt: 10,
                },
            }}
        >
            <CustomizeTypography
                sx={{
                    fontSize: '46px',
                    color: theme.palette.secondaryText,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    [mobileScreen]: {
                        fontSize: theme.fontSize.mobile.heading,
                    },
                }}
            >
                Best Selling Products
            </CustomizeTypography>
            <Box sx={{ mt: 4 }}>
                <Slider {...settings}>
                    {newList.map((perfume, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 2,
                                width: '180px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer',
                                    transform: 'translateY(-5px)',
                                },
                            }}
                            onClick={() => handleNavigateProductDetails(perfume)}
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
                                    src={perfume.perfumeImage}
                                    sx={{ borderRadius: 0, height: '300px', width: '200px' }}
                                />
                                <CustomizeTypography
                                    textAlign={'center'}
                                    sx={{
                                        textAlign: 'center',
                                        // my: 2,

                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        width: '100%',
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
                                        {converToVND(perfume.perfumeGroupSize[0].perfumePrice)}
                                    </CustomizeTypography>
                                    <CustomizeTypography sx={{ marginLeft: 1 }}>
                                        {perfume.perfumeGroupSize[0].perfumeSize} ml
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
