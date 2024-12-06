import { Box } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import Promocode from './Promocode';
import { SummaryRowInCart } from './SummaryRowInCart';
import { converToVND } from '../convertToVND/convertToVND';

import { useTranslation } from 'react-i18next';
import useCoupons from '../../api/useCoupons';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function CartTotal({
    productsList,
    promoCode,
    setPromoCode,
    promoCodeApplied,
    setPromoCodeApplied,
}) {
    const { t, i18n } = useTranslation('translate');
    const { data: listCodes } = useCoupons();
    console.log('listCodes: ', listCodes?.data);
    // get from parent
    // const [promoCode, setPromoCode] = useState('');
    // const [promoCodeApplied, setPromoCodeApplied] = useState(false);

    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    console.log('promoCodeApplied: ', promoCodeApplied);
    const handleApplyPromoCode = () => {
        const codeApplied = listCodes?.data.find((code) => code.code === promoCode);
        console.log('codeApplied: ', codeApplied);

        if (codeApplied) {
            // setPromoCode(promoCode);
            setPromoCodeApplied({
                isApplied: true,
                codeApplied: codeApplied,
            });

            if (i18n.language === 'vi') {
                showNotificationMessage(
                    'success',
                    'Mã khuyến mại',
                    `Bạn sẽ được giảm giá ${codeApplied?.discount}% trên tổng giá.`,
                );
            } else {
                showNotificationMessage(
                    'success',
                    'Promo Code',
                    `You will get ${codeApplied?.discount}% off the total price.`,
                );
            }
        } else {
            // invalid promo code
            setPromoCode('');
            setPromoCodeApplied({
                isApplied: false,
                codeApplied: null,
            });

            showNotificationMessage(
                'warning',
                t('common.notifyMessage.checkout.promoTitle'),
                t('common.notifyMessage.checkout.promoContent'),
            );
        }
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        let subtotal = 0;
        productsList.forEach((product) => {
            subtotal +=
                product.quantity *
                (product.variant.discountPercent !== 0
                    ? product.variant.priceSale
                    : product.variant.price);
        });
        return subtotal;
    };

    // Calculate total discount
    const calculateDiscountTotal = () => {
        const price = calculateSubtotal();
        const getDiscount =
            promoCodeApplied?.isApplied === true ? promoCodeApplied.codeApplied?.discount : 0;
        return price * (getDiscount / 100);
    };

    // Calculate the total price including discount, tax, and promo code
    const calculateFinalTotal = () => {
        let totalSubtotal = 0;

        // Loop through each product to calculate subtotal, discount, and tax
        productsList.forEach((product) => {
            const price =
                product.quantity *
                (product.variant.discountPercent !== 0
                    ? product.variant.priceSale
                    : product.variant.price);

            totalSubtotal += price;
        });

        console.log('promoCodeApplied.isApplied: ', promoCodeApplied.isApplied);

        // Apply 5% promo code discount if promo code "UTE99" is applied
        // if (promoCodeApplied.isApplied === true && promoCode === promoCodeApplied.codeApplied) {
        if (promoCodeApplied.isApplied) {
            console.log('chay vo day');
            totalSubtotal =
                totalSubtotal - totalSubtotal * (promoCodeApplied.codeApplied.discount / 100); // Apply 5% discount
        }

        return totalSubtotal;
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
                {/* If you have a Promo Code you will get 5% off */}
                {t('common.checkout.discount.discountNoti')}
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
                    textAction={t('common.checkout.discount.apply')}
                    // waiting for clicking/ handling logic
                    onHandleClick={handleApplyPromoCode}
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                />
            </Box>

            <CustomizeDividerV2 />

            <SummaryRowInCart
                label={t('common.checkout.totalDes.subtotal')}
                value={converToVND(calculateSubtotal())}
                isTotal
            />
            {/* Discount 20% */}
            <SummaryRowInCart
                label={t('common.checkout.totalDes.discount')}
                discount={
                    promoCodeApplied.isApplied ? promoCodeApplied.codeApplied.discount + '%' : '0%'
                }
                value={converToVND(calculateDiscountTotal())}
            />

            <CustomizeDividerV2 />

            {/* Total Row */}
            <SummaryRowInCart
                label={t('common.checkout.totalDes.total')}
                value={converToVND(calculateFinalTotal())}
                isTotal
            />
        </Box>
    );
}

export default CartTotal;
