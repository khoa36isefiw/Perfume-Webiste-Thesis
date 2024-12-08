import React, { useRef } from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import ProductInformation from '../components/ProductInformation/ProductInformation';
import CustomizeDivider from '../components/CustomizeDivider/CustomizeDivider';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

import { Box } from '@mui/material';

function ProductDetail() {
    // get the perfume data passed from navigation
    const productInformation = JSON.parse(localStorage.getItem('productInfor'));

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

    return (
        <Box sx={{ mt: 20 }}>
            <PerfumeDetail onHandleClick={scrollToDiv} />
            <RatingProduct perfumeDetailData={productInformation} />
            <Comments perfumeDetailData={productInformation} reference={commentsRef} />
        </Box>
    );
}

export default ProductDetail;
