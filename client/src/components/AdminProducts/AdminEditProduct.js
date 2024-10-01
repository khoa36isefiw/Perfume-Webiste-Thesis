import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AdminEditProduct = () => {
    const location = useLocation();
    const { productData, selectedSize } = location.state;

    console.log('Product data:', productData);
    console.log('Selected size:', selectedSize);

    // Now, you can edit the product and size data here
    return (
        <Box>
            <h1>Edit Product: {productData.productName}</h1>
            <p>Size: {selectedSize}</p>
            {/* Render your edit form */}
        </Box>
    );
};

export default AdminEditProduct;
