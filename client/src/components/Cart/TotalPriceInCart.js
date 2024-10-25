import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';

import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';
import { useDispatch } from 'react-redux';
import { saveSelectedProduct } from '../../redux/feature/CartManagement/CartManagementSlice';

function TotalPriceInCart({ productsList, selectedProducts, setPriceChange, priceChange }) {
    console.log('productsList: ', productsList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalSubtotal, setTotalSubtotal] = useState(0);

    useEffect(() => {
        setTotalSubtotal(JSON.parse(window.localStorage.getItem('current_price')) || 0);
        setPriceChange(false);
    }, [productsList, selectedProducts, priceChange]);

    // Calculate total price
    const calculateTotal = () => {
        let total = 0;

        productsList.forEach((productItem) => {
            const product = selectedProducts.find(
                (p) =>
                    p.productId === productItem.product._id &&
                    p.variantId === productItem.variant._id,
            );

            if (product) {
                const price = productItem.quantity * productItem.variant.price;
                total += price;
            }
        });

        return total;
    };

    // Update total price when productsList or selectedProducts change
    useEffect(() => {
        const newTotal = calculateTotal();
        setTotalSubtotal(newTotal);
    }, [productsList, selectedProducts]);

    const handleCheckout = () => {
        if (selectedProducts.length > 0) navigate('/checkout');
        else navigate('');
    };

    return (
        <Box
            sx={{
                border: '1px solid #333',
                borderRadius: 2,
                p: 1,
            }}
        >
            <CustomizeTypography
                sx={{
                    borderColor: '#fff',
                    mb: 2,
                }}
            >
                Total price of the products in Cart
            </CustomizeTypography>

            <CustomizeDividerV2 />

            {/* Total Row */}
            <Box sx={{ mt: 2, mb: 4 }}>
                {/* <SummaryRowInCart label="Total" value={converToVND(totalSubtotal)} isTotal /> */}
                <SummaryRowInCart label="Total" value={converToVND(totalSubtotal)} isTotal />
            </Box>

            <Box sx={{ mb: 1 }}>
                <CustomizeButtonInCart
                    variant="outlined"
                    textAction={
                        selectedProducts.length === 0
                            ? 'Please select product '
                            : 'Proceed to checkout'
                    }
                    onHandleClick={handleCheckout}
                />
            </Box>
            <CustomizeButtonInCart
                textAction="Continue Shopping"
                onHandleClick={() => navigate('/shop')}
            />
        </Box>
    );
}

export default TotalPriceInCart;
