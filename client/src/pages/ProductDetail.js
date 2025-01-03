import React, { useEffect, useRef } from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

import { Box, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import useProductById from '../api/useProductById';
import useLoadingV2 from '../hooks/useLoadingV2';
import { CustomizeTypography } from '../components/CustomizeTypography/CustomizeTypography';

import { useTranslation } from 'react-i18next';

import useProductByBrand from '../api/useProductByBrand';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';
import useTopProductSold from '../api/useTopProductSold';

function ProductDetail() {
    const { t, i18n } = useTranslation('translate');
    const { LoadingAPI } = useLoadingV2();
    const { id } = useParams();

    const navigate = useNavigate();
    // call product by id
    const { data: productData, isLoading, mutate } = useProductById(id);
    const [test, setTest] = React.useState();
    console.log('productData: ', productData);

    useEffect(() => {
        if (productData?.status === 404) {
            navigate('/404');
            setTest([]);
        } else {
            setTest(productData?.data);
        }
    }, [productData?.status]);
    const brandId = productData?.data?.product?.brand?._id;

    // console.log('test2222: ', test);

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
            <PerfumeDetail productData={test?.product} onHandleClick={scrollToDiv} />
            <RatingProduct perfumeDetailData={test} mutate={mutate} />
            <Comments perfumeDetailData={test} reference={commentsRef} />
            {/* Related product */}
            <Container sx={{ mt: 8 }}>
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
            </Container>
            {/* Most Rate */}
            <Container sx={{ mt: 8 }}>
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
            </Container>
        </Box>
    );
}

export default ProductDetail;
