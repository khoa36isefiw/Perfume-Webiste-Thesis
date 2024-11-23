import React from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import ProductInformation from '../components/ProductInformation/ProductInformation';
import CustomizeDivider from '../components/CustomizeDivider/CustomizeDivider';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';
import { useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

function ProductDetail() {
    // get the perfume data passed from navigation
    const productInformation = JSON.parse(localStorage.getItem('productInfor'));
    return (
        <Box sx={{ mt: 20 }}>
            <PerfumeDetail />

            <CustomizeDivider />

            <ProductInformation />

            <RatingProduct perfumeDetailData={productInformation} />

            <Comments perfumeDetailData={productInformation} />
        </Box>
    );
}

export default ProductDetail;
