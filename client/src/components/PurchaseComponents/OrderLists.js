import React from 'react';
import { Box, Grid, Button, Tooltip, Typography, Avatar } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFTemplate } from '../PDFTemplate/PDFTemplate';
import { VerticalDivider } from './VerticalDivider';
import { OrderInfo } from './OrderInfo';
import { OrderItem } from './OrderItem';
import { formatDate } from '../FormatDate/formatDate';
import { calculateDiscount, calculateTax, converToVND } from '../convertToVND/convertToVND';
import { OrderItemV2 } from './OrderItemV2';

import { useNavigate } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import { backTop } from '../goBackTop/goBackTop';
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const OrderLists = ({ ordersListData, orderHistory }) => {
    const navigate = useNavigate();
    const targetRef = useRef();
    const { t, i18n } = useTranslation('translate');
    console.log('orderHistory: ', orderHistory);

    const handleNavigateInvoicePage = (order) => {
        window.localStorage.setItem('orderInvoice', JSON.stringify(order));
        navigate(`/${i18n.language}/order-invoice?id=${order._id}`, { state: { order } });
        // navigate(`/${i18n.language}/order-invoice/${order._id}`, { state: { order } });
        backTop();
    };

    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const handleDownload = (order) => {
        setIsGeneratingPDF(true);
        setTimeout(() => {
            generatePDF(targetRef, {
                filename: `Invoice Order-${order?._id}`,
            }).then(() => {
                setIsGeneratingPDF(false); // Reset after PDF generation
            });
        }, 200);
    };

    // handle download
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
            case 0:
                return 'Sunday';
            default:
                return 'Tomtoc';
        }
    };

    const getDateTime = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${String(
        date.getMinutes(),
    ).padStart(2, '0')}${date.getHours() < 12 ? 'AM' : 'PM'}`;

    const userData = JSON.parse(window.localStorage.getItem('user_data')) || [];

    // Calculate subtotal
    const calculateSubtotal = (order) => {
        let subtotal = 0;
        order?.items?.forEach((product) => {
            subtotal +=
                product.quantity *
                (product.price - product.priceSale !== 0 ? product.priceSale : product.price);
        });
        return subtotal;
    };

    // Calculate total discount
    const calculateDiscountTotal = (order) => {
        let discountTotal = 0;
        const price = calculateSubtotal(order);
        discountTotal += calculateDiscount(price);
        return discountTotal;
    };

    // Calculate the total price including discount, tax, and promo code
    const calculateFinalTotal = (order) => {
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

    return (
        <>
            {/* sample */}
            {ordersListData?.map((order, index) => (
                <Box
                    sx={{
                        bgcolor: '#555',
                        minHeight: '20px',
                        borderRadius: 1,
                        p: 2,
                        my: 4,
                        width: '100%',
                    }}
                    key={index}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo
                                label={t('common.orderHistory.orderInfor.orderNum')}
                                value={`#${order.orderNumber}`}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} lg={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo label="Order Date" value={order.orderDate} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <OrderInfo label="Ship To" value={order.orderAddress} />
                        </Grid>
                    </Grid>

                    <CustomizeDividerVertical8 />
                    <OrderItem listData={order.orderData} />
                    <CustomizeDividerVertical8 />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <CustomizeTypography>
                            <span style={{ color: '#d9d9d9' }}>Total Amount:</span>{' '}
                            <strong>${order.orderTotal}</strong>
                        </CustomizeTypography>

                        <PDFDownloadLink
                            document={<PDFTemplate order={order} />}
                            fileName={`order_${order.orderNumber}.pdf`}
                        >
                            <Button
                                startIcon={<SystemUpdateAltIcon />}
                                sx={{
                                    padding: '6px 0',
                                    textTransform: 'initial',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                    },
                                }}
                            >
                                Download Invoice
                            </Button>
                        </PDFDownloadLink>
                    </Box>
                </Box>
            ))}
            {orderHistory?.map((order, index) => (
                <Box
                    sx={{
                        bgcolor: '#555',
                        minHeight: '20px',
                        borderRadius: 1,
                        p: 2,
                        my: 4,
                        width: '100%',
                    }}
                    key={order._id}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo
                                label={t('common.orderHistory.orderInfor.orderNum')}
                                value={`#${order._id}`}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} lg={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo
                                label={t('common.orderHistory.orderInfor.orderDate')}
                                value={formatDate(order.createdAt)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <OrderInfo
                                label={t('common.orderHistory.orderInfor.orderAddress')}
                                value={order.address}
                            />
                        </Grid>
                    </Grid>

                    <CustomizeDividerVertical8 />
                    <OrderItemV2 listData={order.items} />
                    <CustomizeDividerVertical8 />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <CustomizeTypography
                            sx={{
                                mb: 0,
                                [mobileScreen]: {
                                    fontSize: '13px',
                                },
                            }}
                        >
                            <span
                                style={{
                                    color: '#d9d9d9',
                                }}
                            >
                                {t('common.orderHistory.orderInfor.total')}:
                            </span>{' '}
                            <strong>{converToVND(order.totalPrice)}</strong>
                        </CustomizeTypography>
                        {/* preview button */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip
                                title={
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            mb: 0,
                                        }}
                                    >
                                        {/* View your invoice */}
                                        {t('common.orderHistory.orderInfor.preview2')}
                                    </Typography>
                                }
                            >
                                <Button
                                    onClick={() => handleNavigateInvoicePage(order)}
                                    startIcon={<PreviewIcon />}
                                    sx={{
                                        padding: '6px 0',
                                        mx: 4,
                                        textTransform: 'initial',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        // color: theme.palette.text.secondary,
                                        color: '#90caf9',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                            // color: theme.palette.text.secondary,
                                            color: '#90caf9',
                                        },
                                    }}
                                >
                                    {/* Preview */}
                                    {t('common.orderHistory.orderInfor.preview')}
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title={
                                    <Typography
                                        sx={{
                                            fontSize: '13px',
                                            mb: 0,
                                        }}
                                    >
                                        {t('common.orderHistory.orderInfor.download2')}
                                    </Typography>
                                }
                            >
                                <Button
                                    // onClick={() =>
                                    //     generatePDF(targetRef, {
                                    //         filename: `Invoice Order-${order?._id}`,
                                    //     })
                                    // }
                                    onClick={() => handleDownload(order)}
                                    startIcon={<PreviewIcon />}
                                    sx={{
                                        padding: '6px 0',
                                        textTransform: 'initial',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                >
                                    {/* Download */}
                                    {t('common.orderHistory.orderInfor.download')}
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box
                        ref={targetRef}
                        sx={{
                            margin: 'auto',
                            px: 9,
                            pt: 8,
                            width: '800px',
                            display: isGeneratingPDF ? 'block' : 'none',
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
                            <CustomizeTypography
                                sx={{ color: '#000', fontWeight: 'bold', fontSize: 32 }}
                            >
                                {t('common.orderHistory.pdfDownload.hi')} {userData.firstName}{' '}
                                {userData.lastName},
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ color: '#000', mb: 2 }}>
                                {t('common.orderHistory.pdfDownload.shopInfo.t1')}
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
                                    {t('common.orderHistory.pdfDownload.shopInfo.s1')}
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                                    {t('common.orderHistory.pdfDownload.shopInfo.s2')}
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                                    Số 1 Võ Văn Ngân
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ mb: 0, textAlign: 'end' }}>
                                    {t('common.orderHistory.pdfDownload.shopInfo.s4')}:{' '}
                                    {convertDayToText(getDay)} , {getDateTime}
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
                                    {t('common.orderHistory.pdfDownload.cusInfo.invoice')}
                                </CustomizeTypography>

                                <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                    {order?._id}
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                    {t('common.orderHistory.pdfDownload.cusInfo.issue')}:
                                    {formatDate(order?.updatedAt)}
                                </CustomizeTypography>
                            </Box>
                            <Box>
                                <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold' }}>
                                    {t('common.orderHistory.pdfDownload.cusInfo.billed')}
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
                                <CustomizeTypography
                                    sx={{ color: '#000', fontWeight: 'bold', mb: 0 }}
                                >
                                    {/* Item details */}
                                    {t('common.orderHistory.pdfDownload.items.details')}
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ color: '#000', mb: 0 }}>
                                    {t('common.orderHistory.pdfDownload.items.t1')}
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
                                    sx={{
                                        color: '#000',
                                        mb: 0,
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('common.orderHistory.pdfDownload.items.h1')}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        color: '#000',
                                        mb: 0,
                                        fontSize: 13,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('common.orderHistory.pdfDownload.items.h2')}
                                </CustomizeTypography>
                            </Box>
                            <Box
                                sx={{
                                    p: 1,
                                }}
                            >
                                {order?.items?.map((item) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={item.image[0]}
                                            sx={{ height: 50, width: 50 }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                                {item.productName}
                                            </CustomizeTypography>
                                            <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                                {t('common.orderHistory.pdfDownload.items.qty')}:{' '}
                                                {item.quantity}
                                            </CustomizeTypography>
                                        </Box>
                                        <CustomizeTypography sx={{ color: '#595959', mb: 0 }}>
                                            {converToVND(item.price)}
                                        </CustomizeTypography>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ height: '1px', width: '100%', bgcolor: '#ccc' }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <CustomizeTypography
                                    sx={{
                                        color: '#595959',
                                        mb: 0,
                                        fontWeight: 'bold',
                                        flex: 1,
                                    }}
                                >
                                    {t('common.orderHistory.pdfDownload.items.sTotal')}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}
                                >
                                    {converToVND(calculateSubtotal(order))}
                                </CustomizeTypography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomizeTypography
                                    sx={{
                                        color: '#595959',
                                        mb: 0,
                                        fontWeight: 'bold',
                                        flex: 1,
                                    }}
                                >
                                    {t('common.orderHistory.pdfDownload.items.discount')} - 20%
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}
                                >
                                    {converToVND(calculateDiscountTotal(order))}
                                </CustomizeTypography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomizeTypography
                                    sx={{
                                        color: '#595959',
                                        mb: 0,
                                        fontWeight: 'bold',
                                        flex: 1,
                                    }}
                                >
                                    {t('common.orderHistory.pdfDownload.items.amount')}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}
                                >
                                    {converToVND(calculateFinalTotal(order))}
                                </CustomizeTypography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </>
    );
};
