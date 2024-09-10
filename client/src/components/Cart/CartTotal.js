import { Box } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import Promocode from './Promocode';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';

function CartTotal({ productsList }) {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeApplied, setPromoCodeApplied] = useState(false);

    const handleApplyPromoCode = (code) => {
        if (code === 'UTE99') {
            setPromoCode('UTE99');
            setPromoCodeApplied(true);
        } else {
            // invalid promo code
            setPromoCodeApplied(false);
            setPromoCode('');
            alert('Invalid promo code');
        }
    };

    const calculateDiscount = (price) => {
        return price * 0.2; // 20% discount
    };

    const calculateTax = (price) => {
        return price * 0.1; // 10% tax
    };

    // Calculate the total price including discount, tax, and promo code
    const calculateTotal = () => {
        let totalSubtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;

        // Loop through each product to calculate subtotal, discount, and tax
        productsList.forEach((product) => {
            const price = product.quantity * product.perfumePrice;
            const discount = calculateDiscount(price);
            const tax = calculateTax(price);

            totalSubtotal += price;
            totalDiscount += discount;
            totalTax += tax;
        });

        let total = totalSubtotal - totalDiscount + totalTax;

        // Apply 5% promo code discount if promo code "UTE99" is applied
        if (promoCodeApplied && promoCode === 'UTE99') {
            total = total * 0.95; // Apply 5% discount
        }

        return total;
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
                }}
            >
                If you have a Promo Code you will get 5% off
            </CustomizeTypography>
            <Box
                sx={{
                    py: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Promocode
                    textAction={'Apply'}
                    // waiting for clicking/ handling logic
                    onHandleClick={handleApplyPromoCode}
                />
            </Box>

            <CustomizeDividerV2 />

            {productsList.map((product, index) => (
                <React.Fragment key={index}>
                    <SummaryRowInCart
                        label="Subtotal"
                        value={converToVND(product.quantity * product.perfumePrice)}
                        isTotal
                    />
                    {/* Discount 20% */}
                    <SummaryRowInCart
                        label="Discount"
                        discount={'20%'}
                        value={converToVND(
                            calculateDiscount(product.quantity * product.perfumePrice),
                        )}
                    />
                    {/* Delivery fee (free in this case) */}
                    <SummaryRowInCart label="Delivery" value="0.00" />
                    {/* Tax: 10% */}
                    <SummaryRowInCart
                        label="Tax"
                        value={converToVND(calculateTax(product.quantity * product.perfumePrice))}
                    />
                    <CustomizeDividerV2 />
                </React.Fragment>
            ))}

            {/* Total Row */}
            <SummaryRowInCart label="Total" value={converToVND(calculateTotal())} isTotal />

            <CustomizeButtonInCart
                variant="outlined"
                textAction="Proceed to checkout"
                onHandleClick={() => navigate('/checkout')}
            />
            <CustomizeButtonInCart
                textAction="Continue Shopping"
                onHandleClick={() => navigate('/shop')}
            />
        </Box>
    );
}

export default CartTotal;
