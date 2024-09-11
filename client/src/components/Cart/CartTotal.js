import { Box } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import Promocode from './Promocode';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { calculateDiscount, calculateTax, converToVND } from '../convertToVND/convertToVND';

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

    // Calculate subtotal
    const calculateSubtotal = () => {
        let subtotal = 0;
        productsList.forEach((product) => {
            subtotal += product.quantity * product.perfumePrice;
        });
        return subtotal;
    };

    // Calculate total discount
    const calculateDiscountTotal = () => {
        let discountTotal = 0;
        productsList.forEach((product) => {
            const price = product.quantity * product.perfumePrice;
            discountTotal += calculateDiscount(price);
        });
        return discountTotal;
    };

    // Calculate total tax
    const calculateTaxTotal = () => {
        let taxTotal = 0;
        productsList.forEach((product) => {
            const price = product.quantity * product.perfumePrice;
            taxTotal += calculateTax(price);
        });
        return taxTotal;
    };

    // Calculate the total price including discount, tax, and promo code
    const calculateFinalTotal = () => {
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
                    textAlign: 'center',
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

            <SummaryRowInCart label="Subtotal" value={converToVND(calculateSubtotal())} isTotal />
            {/* Discount 20% */}
            <SummaryRowInCart
                label="Discount"
                discount={'20%'}
                value={converToVND(calculateDiscountTotal())}
            />
            {/* Delivery fee (free in this case) */}
            <SummaryRowInCart label="Delivery" value="0.00" />
            {/* Tax: 10% */}
            <SummaryRowInCart label="Tax" value={`+${converToVND(calculateTaxTotal())}`} />
            <CustomizeDividerV2 />

            {/* Total Row */}
            <SummaryRowInCart label="Total" value={converToVND(calculateFinalTotal())} isTotal />

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
