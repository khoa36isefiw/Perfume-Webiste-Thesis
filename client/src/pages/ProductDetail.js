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
} from '../components/NewProductsArrivals/NewProductsArrivals';
import useProductByCategory from '../api/useProductByCategory';
import { useTranslation } from 'react-i18next';
import { backTop } from '../components/goBackTop/goBackTop';
import { converToVND } from '../components/convertToVND/convertToVND';
import useProductByBrand from '../api/useProductByBrand';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';
import useTopProductSold from '../api/useTopProductSold';
import _ from 'lodash';

function ProductDetail() {
    const { t, i18n } = useTranslation('translate');
    const { LoadingAPI } = useLoadingV2();
    const { id } = useParams();

    const navigate = useNavigate();
    const { data: productData, isLoading } = useProductById(id);

    const brandId = productData?.data?.product?.brand?._id;

    const { data: productDataByBrand } = useProductByBrand(brandId);
    const { data: productSold } = useTopProductSold();

    const relatedProducts = Array.isArray(productDataByBrand?.data) ? productDataByBrand.data : [];
    const filteredRelatedProducts = relatedProducts.filter((item) => item._id !== id).slice(0, 4);

    const highlyRatedList = productSold?.data?.sort((a, b) => b.rating - a.rating).slice(0, 4);

    // console.log('4 filteredRelatedProducts', newArray);

    // reference to comments region
    const commentsRef = useRef();

    // scroll down to component with styles
    const scrollToDiv = () => {
        window.scrollTo({
            top: commentsRef.current.offsetTop, // scroll to components comment
            behavior: 'smooth',
            position: 'center', // in the middle of the screen
        });
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
            <Box sx={{ mt: 8 }}>
                <CustomizeTypography
                    sx={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        mb: 2,
                    }}
                >
                    {t('common.productDetails.relatedProduct')}
                </CustomizeTypography>
                <RelatedProduct data={filteredRelatedProducts} />
            </Box>
            {/* Most Rate */}
            <Box sx={{ mt: 8 }}>
                <CustomizeTypography
                    sx={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontWeight: 'bold',
                        mb: 2,
                    }}
                >
                    {i18n.language === 'en' ? 'Highly Rated' : 'Được đánh giá cao'}
                </CustomizeTypography>
                <RelatedProduct data={highlyRatedList} />
            </Box>
        </Box>
    );
}

export default ProductDetail;
