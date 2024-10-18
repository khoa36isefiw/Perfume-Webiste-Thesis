import { Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';

import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';

function TotalPriceInCart({ productsList, selectedProducts }) {
    const navigate = useNavigate();

    // Calculate the total price
    const calculateTotal = () => {
        let totalSubtotal = 0;
        // Loop through each product to calculate subtotal
        productsList.forEach((product) => {
            const price = product.quantity * product.perfumePrice;
            totalSubtotal += price;
        });

        return totalSubtotal;
    };

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
                <SummaryRowInCart label="Total" value={converToVND(calculateTotal())} isTotal />
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
