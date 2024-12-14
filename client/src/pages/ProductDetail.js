import React, { useRef } from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';
import { theme } from '../Theme/Theme';
import { Avatar, Box, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import useProductById from '../api/useProductById';
import useLoadingV2 from '../hooks/useLoadingV2';
import { CustomizeTypography } from '../components/CustomizeTypography/CustomizeTypography';
import Slider from 'react-slick';
import {
    CustomizeNextArrow,
    CustomizPreviousArrow,
} from '../components/BestSellingProducts/BestSellingProducts';
import useProductByCategory from '../api/useProductByCategory';
import { useTranslation } from 'react-i18next';
import { backTop } from '../components/goBackTop/goBackTop';
import { converToVND } from '../components/convertToVND/convertToVND';
import useProductByBrand from '../api/useProductByBrand';

function ProductDetail() {
    const { t, i18n } = useTranslation('translate');
    const { LoadingAPI } = useLoadingV2();
    const { id } = useParams();

    const navigate = useNavigate();
    const { data: productData, isLoading } = useProductById(id);

    const brandId = productData?.data?.product?.brand?._id;

    const { data: productDataByBrand } = useProductByBrand(brandId);

    const relatedProducts = Array.isArray(productDataByBrand?.data) ? productDataByBrand.data : [];
    const filteredRelatedProducts = relatedProducts.filter((item) => item._id !== id);
    const newArray = filteredRelatedProducts.slice(0, 4);
    console.log('filteredRelatedProducts: ', filteredRelatedProducts);
    console.log('4 filteredRelatedProducts', newArray);

    // reference to comments region
    const commentsRef = useRef();
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
    // scroll down to component with styles
    const scrollToDiv = () => {
        window.scrollTo({
            top: commentsRef.current.offsetTop, // scroll to components comment
            behavior: 'smooth',
            position: 'center', // in the middle of the screen
        });
    };

    const handleNavigateProductDetails = (perfume) => {
        // navigate to the product detail page and pass the perfume data as state
        navigate(`/${i18n.language}/${perfume.nameEn}/${perfume._id}`);
        backTop();
    };

    if (isLoading) {
        return <LoadingAPI />;
    }

    return (
        <Box sx={{ mt: 20 }}>
            <PerfumeDetail productData={productData?.data.product} onHandleClick={scrollToDiv} />
            <RatingProduct perfumeDetailData={productData?.data} />
            <Comments perfumeDetailData={productData?.data} reference={commentsRef} />
            {/* Related product */}
            <Box mt={10}>
                <CustomizeTypography
                    sx={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                >
                    {t('common.productDetails.relatedProduct')}
                </CustomizeTypography>
                <Box sx={{ mt: 4, mx: 20 }}>
                    <Slider {...settings}>
                        {filteredRelatedProducts?.length &&
                            filteredRelatedProducts.map((perfume, index) => (
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
                                            sx={{
                                                borderRadius: 0,
                                                height: '250px',
                                                width: '200px',
                                            }}
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
                                                    color: theme.palette.secondaryText,
                                                    fontBold: 'weight',
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
            </Box>
        </Box>
    );
}

export default ProductDetail;
