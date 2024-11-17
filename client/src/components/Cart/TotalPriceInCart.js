import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';

import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';
import { useDispatch } from 'react-redux';
import { saveSelectedProduct } from '../../redux/feature/CartManagement/CartManagementSlice';
import { useTranslation } from 'react-i18next';

function TotalPriceInCart({ productsList, selectedProducts, setPriceChange, priceChange, mutate }) {
    // console.log('productsList: ', productsList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalSubtotal, setTotalSubtotal] = useState(0);
    const { t, i18n } = useTranslation('translate');
    useEffect(() => {
        setTotalSubtotal(JSON.parse(window.localStorage.getItem('current_price')) || 0);
        setPriceChange(false);
    }, [productsList, selectedProducts, priceChange]);

    // calculate total price
    // const calculateTotal = useCallback(() => {
    //     return productsList.reduce((total, productItem) => {
    //         console.log('productItem: ', productItem);
    //         const product = selectedProducts.find(
    //             (p) =>
    //                 p.product._id === productItem.product._id &&
    //                 p.variant._id === productItem.variant._id,
    //         );

    //         console.log('product: ', product);

    //         if (product) {
    //             return total + productItem.quantity * productItem.variant.price;
    //         }
    //         return total;
    //     }, 0);
    // }, [productsList, selectedProducts]);

    const calculateTotal = useCallback(() => {
        const selectedProductMap = new Map(
            selectedProducts.map((p) => [`${p.product._id}-${p.variant._id}`, p]),
        );

        let total = 0;
        productsList.forEach((productItem) => {
            const key = `${productItem.product._id}-${productItem.variant._id}`;
            const product = selectedProductMap.get(key);
            console.log('product information: ', product);

            if (product) {
                total +=
                    productItem.quantity *
                    (product.variant.discountPercent !== 0
                        ? product.variant.priceSale
                        : productItem.variant.price);
            }
        });

        return total;
    }, [productsList, selectedProducts]);

    // Update total price when productsList or selectedProducts change

    useEffect(() => {
        const initialTotal = calculateTotal();
        setTotalSubtotal(initialTotal);
    }, [productsList]);

    const handleCheckout = () => {
        if (selectedProducts.length > 0)
            navigate(`/${i18n.language}/checkout`, { state: { items: selectedProducts } });
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
                onHandleClick={() => navigate(`/${i18n.language}/shop`)}
            />
        </Box>
    );
}

export default TotalPriceInCart;
