import React from 'react';
import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import ProductInformation from '../components/ProductInformation/ProductInformation';
import CustomizeDivider from '../components/CustomizeDivider/CustomizeDivider';
import RatingProduct from '../components/RatingProduct/RatingProduct';
import Comments from '../components/Comments/Comments';

function ProductDetail() {
    return (
        <div>
            <PerfumeDetail />
            <CustomizeDivider />
            <ProductInformation />
            <RatingProduct />
            <Comments />
        </div>
    );
}

export default ProductDetail;
