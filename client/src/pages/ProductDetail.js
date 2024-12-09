import React, { useRef } from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import useProductById from '../api/useProductById';
import useLoadingV2 from '../hooks/useLoadingV2';

function ProductDetail() {
    const { LoadingAPI } = useLoadingV2();

    const { id } = useParams();
    const { data: productData } = useProductById(id);
    const productInformation = productData?.data?.product;


    console.log('productData: ', productData?.data.product);

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
        </Box>
    );
}

export default ProductDetail;
