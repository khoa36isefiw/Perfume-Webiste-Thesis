import React from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import ProductInformation from '../components/ProductInformation/ProductInformation';
import CustomizeDivider from '../components/CustomizeDivider/CustomizeDivider';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';
import { useLocation } from 'react-router-dom';

function ProductDetail() {
    const location = useLocation();
    // get the perfume data passed from navigation
    const { perfume } = location.state || {};
    console.log('perfume data at parent: ', perfume);
    return (
        <div>
            <PerfumeDetail />
            <CustomizeDivider />
            <ProductInformation />
            <RatingProduct perfumeDetailData={perfume} />
            <Comments />
        </div>
    );
}

export default ProductDetail;
