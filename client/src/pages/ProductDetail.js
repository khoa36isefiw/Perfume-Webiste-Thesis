import React from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

import { Box } from '@mui/material';
import useProductById from '../api/useProductById';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const { data: productData } = useProductById(id);
    const productInformation = productData?.data?.product;
    return (
        <Box sx={{ mt: 20 }}>
            <PerfumeDetail />
            <RatingProduct perfumeDetailData={productInformation} />
            <Comments perfumeDetailData={productInformation} />
        </Box>
    );
}

export default ProductDetail;
