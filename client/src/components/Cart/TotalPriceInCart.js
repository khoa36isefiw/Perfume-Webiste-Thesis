import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';

import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';
import { useTranslation } from 'react-i18next';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';

function TotalPriceInCart({ productsList, selectedProducts, setPriceChange, priceChange }) {
    // console.log('productsList: ', productsList);

    const navigate = useNavigate();

    const [totalSubtotal, setTotalSubtotal] = useState(0);
    const { t, i18n } = useTranslation('translate');
    useEffect(() => {
        setTotalSubtotal(JSON.parse(window.localStorage.getItem('current_price')) || 0);
        setPriceChange(false);
    }, [productsList, priceChange]);

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
    }, [productsList, totalSubtotal, calculateTotal]);

    const handleCheckout = () => {
        if (selectedProducts.length > 0)
            navigate(`/${i18n.language}/checkout`, { state: { items: selectedProducts } });
        else {
            navigate('');
        }
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
                {t('common.shoppingCart.totalDes')}
            </CustomizeTypography>

            <CustomizeDividerV2 />

            {/* Total Row */}
            <Box sx={{ mt: 2, mb: 4 }}>
                {/* <SummaryRowInCart label="Total" value={converToVND(totalSubtotal)} isTotal /> */}
                <SummaryRowInCart
                    label={t('common.shoppingCart.total')}
                    value={converToVND(totalSubtotal)}
                    isTotal
                />
            </Box>

            {/* checkout button */}
            <Box sx={{ mb: 1 }}>
                <CustomizeButtonInCart
                    variant="outlined"
                    textAction={
                        selectedProducts.length === 0
                            ? t('common.shoppingCart.selecteProduct')
                            : t('common.shoppingCart.proceedCheckout')
                    }
                    onHandleClick={handleCheckout}
                />
            </Box>
            {/* continue shopping button */}
            <CustomizeButtonInCart
                textAction={t('common.shoppingCart.continue')}
                onHandleClick={() => navigate(`/${i18n.language}/shop`)}
            />
        </Box>
    );
}

export default TotalPriceInCart;
