import React, { useRef } from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import ProductInformation from '../components/ProductInformation/ProductInformation';
import CustomizeDivider from '../components/CustomizeDivider/CustomizeDivider';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useProductById from '../api/useProductById';
import useLoadingV2 from '../hooks/useLoadingV2';

function ProductDetail() {
    const { LoadingAPI } = useLoadingV2();
    const location = useLocation();
    // get the perfume data passed from navigation
    const productInformation = JSON.parse(localStorage.getItem('productInfor'));

    const locationPath = location.pathname.split('/'); // split location.path into an array
    const {
        data: productData,
        isLoading,
        error,
    } = useProductById(locationPath[locationPath.length - 1]);

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
