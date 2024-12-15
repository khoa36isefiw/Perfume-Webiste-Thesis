import { Avatar, Box, Container, Grid, IconButton } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import Slider from 'react-slick';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { converToVND } from '../convertToVND/convertToVND';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import useLatestProduct from '../../api/useLatestProduct';
import { useTranslation } from 'react-i18next';

function NewProductsArrivals() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    // cut the perfumeData list, just use 5 items in array
    const { data: products } = useLatestProduct();
    const latestProducts = products?.data.slice(0, 6);
    // console.log('latestProducts: ', latestProducts);
    const handleNavigateProductDetails = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/${i18n.language}/${perfume.nameEn}/${perfume._id}`);
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
                New Arrivals Products
            </CustomizeTypography>
            <Box sx={{ mt: 4 }}>
                <Slider {...settings}>
                    {latestProducts?.length &&
                        latestProducts.map((perfume, index) => (
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
                                        height: '350px',

                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={perfume?.imagePath[0]}
                                        sx={{ borderRadius: 0, height: '250px', width: '100%' }}
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
                                        {perfume.nameEn}
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
                                                color: theme.palette.text.secondary,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {converToVND(
                                                perfume.variants[0].priceSale ||
                                                    perfume.variants[0].price,
                                            )}
                                        </CustomizeTypography>
                                        <CustomizeTypography sx={{ marginLeft: 1 }}>
                                            {perfume.variants[0].size}
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

export default NewProductsArrivals;

export function CustomizeNextArrow({ onClick }) {
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

export function CustomizPreviousArrow({ onClick }) {
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
