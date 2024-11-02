import React, { useRef } from 'react';
import { Box, Button, Tooltip, Typography, Avatar, Divider } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import { formatDate } from '../FormatDate/formatDate';
import { calculateDiscount, calculateTax, converToVND } from '../convertToVND/convertToVND';

import { useLocation } from 'react-router-dom';

export const OrderInvoicePDF = () => {
    // get order data from state
    const date = new Date();
    const getDay = date.getDay();
    const convertDayToText = (getDay) => {
        switch (getDay) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
        }
    };

    const getDateTime = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${String(
        date.getMinutes(),
    ).padStart(2, '0')}${date.getHours() < 12 ? 'AM' : 'PM'}`;

    const location = useLocation();
    const { order } = location.state || {};
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || [];
    const targetRef = useRef();
    // Calculate subtotal
    const calculateSubtotal = () => {
        let subtotal = 0;
        order?.items?.forEach((product) => {
            subtotal +=
                product.quantity *
                (product.price - product.priceSale !== 0 ? product.priceSale : product.price);
        });
        return subtotal;
    };

    // Calculate total discount
    const calculateDiscountTotal = () => {
        let discountTotal = 0;
        const price = calculateSubtotal();
        discountTotal += calculateDiscount(price);
        return discountTotal;
    };

    // Calculate total tax
    const calculateTaxTotal = () => {
        let taxTotal = 0;
        const price = calculateSubtotal();
        taxTotal += calculateTax(price);
        return taxTotal;
    };

    // Calculate the total price including discount, tax, and promo code
    const calculateFinalTotal = () => {
        let totalSubtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;

        // Loop through each product to calculate subtotal, discount, and tax
        order?.items?.forEach((product) => {
            const price =
                product.quantity *
                (product.price - product.priceSale !== 0 ? product.priceSale : product.price);

            const discount = calculateDiscount(price);
            const tax = calculateTax(price);

            totalSubtotal += price;
            totalDiscount += discount;
            totalTax += tax;
        });

        let total = totalSubtotal - totalDiscount + totalTax;

        // Apply 5% promo code discount if promo code "UTE99" is applied
        // if (promoCodeApplied && promoCode === 'UTE99') {
        //     total = total * 0.95; // Apply 5% discount
        // }

        return total;
    };

    const finalSubtotal = calculateSubtotal();
    const finalDiscount = calculateDiscountTotal();
    const finalTax = calculateTaxTotal();
    const finalTotalPrice = calculateFinalTotal();

    return (
        <Box sx={{ display: 'none' }}>
            <Box
                ref={targetRef}
                sx={{
                    margin: 'auto',
                    px: 9,
                    pt: 8,
                    width: '800px',
                }}
            >
                {/* seller information */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: '#000',
                            height: '50px',
                            width: '50px',
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Tomtoc
                    </Avatar>
                    <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold', fontSize: 32 }}>
                        Hi {userData.firstName} {userData.lastName},
                    </CustomizeTypography>
                    <CustomizeTypography sx={{ color: '#000', mb: 2 }}>
                        Your order information was just dropped off. Go on, check it out
                    </CustomizeTypography>
                </Box>
                <Box
                    sx={{
                        minHeight: 120,
                        width: '100%',
                        borderRadius: 2,
                        bgcolor: '#000',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            sx={{
                                bgcolor: '#fff',
                                height: '50px',
                                width: '50px',
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                        >
                            Tomtoc
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                            <CustomizeTypography sx={{ mb: 0 }}>
                                Tomtoc Perfumes
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0 }}>
                                tomtoc.perfumes@gmail.com
                            </CustomizeTypography>
                        </Box>
                    </Box>
                    <Box>
                        <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                            HCMC University of Technology and Education
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                            Thu Duc City
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                            Số 1 Võ Văn Ngân
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                            Created: {convertDayToText(getDay)} , {getDateTime}
                        </CustomizeTypography>
                    </Box>
                </Box>

                {/* vendee /customer */}
                <Box
                    sx={{
                        minHeight: 120,
                        width: '100%',
                        borderRadius: 2,
                        bgcolor: '#BAB6B6FF',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4,
                    }}
                >
                    <Box>
                        <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold' }}>
                            Invoice Number
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                            {order?._id}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                            Issued date: {formatDate(order?.updatedAt)}
                        </CustomizeTypography>
                    </Box>
                    <Box>
                        <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold' }}>
                            Billed to
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                            Luna Kei
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                            Số 1 Võ Văn Ngân
                        </CustomizeTypography>
                    </Box>
                </Box>

                {/* item detail, information */}
                <Box>
                    <Box>
                        <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold', mb: 0 }}>
                            Item details
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#000', mb: 0 }}>
                            Details item with more information
                        </CustomizeTypography>
                    </Box>
                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid #90caf9',
                            borderRadius: 1,
                            bgcolor: '#90caf9',
                            p: 1,
                        }}
                    >
                        <CustomizeTypography
                            sx={{ color: '#000', mb: 0, fontSize: 13, fontWeight: 'bold' }}
                        >
                            Description
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{ color: '#000', mb: 0, fontSize: 13, fontWeight: 'bold' }}
                        >
                            Amount
                        </CustomizeTypography>
                    </Box>
                    <Box
                        sx={{
                            p: 1,
                        }}
                    >
                        {order?.items?.map((item) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={item.image[0]} sx={{ height: 50, width: 50 }} />
                                <Box sx={{ flex: 1 }}>
                                    <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                        {item.productName}
                                    </CustomizeTypography>
                                    <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                        Qty: {item.quantity}
                                    </CustomizeTypography>
                                </Box>
                                <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                    {converToVND(item.price)}
                                </CustomizeTypography>
                            </Box>
                        ))}
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <CustomizeTypography
                            sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                        >
                            Subtotal
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                            {converToVND(finalSubtotal)}
                        </CustomizeTypography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomizeTypography
                            sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                        >
                            Discount - 20%
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                            {converToVND(finalDiscount)}
                        </CustomizeTypography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomizeTypography
                            sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                        >
                            Shipping Fee
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                            Free
                        </CustomizeTypography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomizeTypography
                            sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                        >
                            Tax + 10%
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                            {converToVND(finalTax)}
                        </CustomizeTypography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomizeTypography
                            sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                        >
                            Amount due
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                            {converToVND(finalTotalPrice)}
                        </CustomizeTypography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
