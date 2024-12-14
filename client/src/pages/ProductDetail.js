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
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';

function ProductDetail() {
    const { t, i18n } = useTranslation('translate');
    const { LoadingAPI } = useLoadingV2();
    const { id } = useParams();

    const navigate = useNavigate();
    const { data: productData, isLoading } = useProductById(id);

    const brandId = productData?.data?.product?.brand?._id;

    const { data: productDataByBrand } = useProductByBrand(brandId);

    const relatedProducts = Array.isArray(productDataByBrand?.data) ? productDataByBrand.data : [];
    const filteredRelatedProducts = relatedProducts.filter((item) => item._id !== id).slice(0, 4);
    // const newArray = filteredRelatedProducts.slice(0, 4);
    console.log('filteredRelatedProducts: ', filteredRelatedProducts);
    // console.log('4 filteredRelatedProducts', newArray);

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
            <RelatedProduct data={filteredRelatedProducts} />
        </Box>
    );
}

export default ProductDetail;
