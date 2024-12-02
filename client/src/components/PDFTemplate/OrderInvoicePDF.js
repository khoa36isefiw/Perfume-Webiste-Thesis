import React, { useRef, useEffect } from 'react';
import { Box, Button, Tooltip, Typography, Avatar, Divider } from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { formatDate } from '../FormatDate/formatDate';
import { calculateDiscount, calculateTax, converToVND } from '../convertToVND/convertToVND';
import { ArrowBackIos } from '@mui/icons-material';
import generatePDF from 'react-to-pdf';
import { useLocation, useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

import { backTop } from '../goBackTop/goBackTop';
import { useTranslation } from 'react-i18next';

export const OrderInvoicePDF = () => {
    const { t, i18n } = useTranslation('translate');
    const navigate = useNavigate();

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
            default:
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
    const orderInfor = JSON.parse(window.localStorage.getItem('orderInvoice')) || [];
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || [];
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search); // get the current search query params
        // console.log('searchParams: ', searchParams.toString());
        searchParams.set('id', orderInfor._id); // if language change --> set id params
        // split /: chia thành một mảng tách bởi /
        // '/en/order-invoice' → ['', 'en', 'order-invoice'].
        // slice(2): remove 2 first of elements in array -->  order-invoice
        // ghép lại mảng thành một chuỗi, sử dụng / làm dấu phân cách.
        const currentPath = location.pathname.split('/').slice(2).join('/');
        console.log('location.pathname: ', location.pathname);
        navigate(`/${i18n.language}/${currentPath}?${searchParams.toString()}`, {
            replace: true,
            state: { order }, // remain state
        });
    }, [i18n.language]);

    const targetRef = useRef();
    // Calculate subtotal
    const calculateSubtotal = () => {
        let subtotal = 0;
        orderInfor?.items?.forEach((product) => {
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

    // Calculate the total price including discount, tax, and promo code
    const calculateFinalTotal = () => {
        let totalSubtotal = 0;
        let totalDiscount = 0;
        let totalTax = 0;

        // Loop through each product to calculate subtotal, discount, and tax
        orderInfor?.items?.forEach((product) => {
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
    const finalTotalPrice = calculateFinalTotal();

    return (
        <Box
            sx={{
                mt: 20,
                bgcolor: '#000',
                height: '150vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 'auto',
                    width: 800,
                    [tabletScreen]: {
                        width: '85%',
                    },
                    [mobileScreen]: {
                        width: '100%',
                    },
                    borderBottom: '1px solid #ccc',
                    mb: 2,
                }}
            >
                <Button
                    startIcon={<ArrowBackIos />}
                    onClick={() => {
                        window.history.back(-1);
                        // delay of 100 milliseconds to ensure backTop runs after navigation
                        setTimeout(backTop, 100);
                    }}
                    sx={{
                        color: '#fff',
                        fontSize: '18px',
                        textTransform: 'initial',
                        fontWeight: 'bold',
                        '&:hover': {
                            bgcolor: 'transparent',
                            color: theme.palette.admin.bgColor,
                        },
                        [mobileScreen]: {
                            fontSize: '16px',
                        },
                    }}
                >
                    {t('common.orderHistory.pdfDownload.back')}
                </Button>
                <CustomizeTypography
                    sx={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        mb: 0,
                        [mobileScreen]: {
                            fontSize: '24px',
                        },
                    }}
                >
                    {t('common.orderHistory.pdfDownload.preview')}
                </CustomizeTypography>
                <Tooltip
                    title={
                        <Typography
                            sx={{
                                fontSize: '13px',
                                mb: 0,
                            }}
                        >
                            {t('common.orderHistory.pdfDownload.dPDF')}
                        </Typography>
                    }
                >
                    <Button
                        startIcon={<PictureAsPdfIcon />}
                        sx={{
                            [mobileScreen]: {
                                visibility: 'hidden',
                            },
                            visibility: 'visible',
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
                        onClick={() =>
                            generatePDF(targetRef, { filename: `Invoice Order-${orderInfor?._id}` })
                        }
                    >
                        {t('common.orderHistory.pdfDownload.download')}
                    </Button>
                </Tooltip>
            </Box>

            {/* invoice pdf template to download */}
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    bgcolor: '#fff',
                    width: '800px',
                    margin: 'auto',
                    filter: 'drop-shadow(0 0 0.5rem #fff)',
                    [tabletScreen]: {
                        width: '85%',
                    },
                    [mobileScreen]: {
                        width: '100%',
                        borderRadius: 0,
                    },
                }}
            >
                <Box
                    ref={targetRef}
                    sx={{
                        margin: 'auto',
                        px: 9,
                        pt: 8,
                        width: '800px',
                        [tabletScreen]: {
                            width: '100%',
                            px: 2,
                        },
                        [mobileScreen]: {
                            width: '100%',
                            pt: 4,
                            px: 2,
                        },
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
                            [mobileScreen]: {
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
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
                            <CustomizeTypography
                                sx={{
                                    mb: 0,
                                    textAlign: 'end',
                                    [mobileScreen]: {
                                        mt: 4,
                                        textAlign: 'start',
                                    },
                                }}
                            >
                                {t('common.orderHistory.pdfDownload.shopInfo.s1')}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    mb: 0,
                                    textAlign: 'end',
                                    [mobileScreen]: {
                                        textAlign: 'start',
                                    },
                                }}
                            >
                                {t('common.orderHistory.pdfDownload.shopInfo.s2')}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    mb: 0,
                                    textAlign: 'end',
                                    [mobileScreen]: {
                                        textAlign: 'start',
                                    },
                                }}
                            >
                                Số 1 Võ Văn Ngân
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    mb: 0,
                                    textAlign: 'end',
                                    [mobileScreen]: {
                                        textAlign: 'start',
                                    },
                                }}
                            >
                                {t('common.orderHistory.pdfDownload.shopInfo.s4')}:
                                {convertDayToText(getDay)}, {getDateTime}
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
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            mb: 4,
                            [mobileScreen]: {
                                flexDirection: 'column',
                                alignItems: 'start',
                                justifyContent: 'start',
                            },
                        }}
                    >
                        {/* Invoice Number */}
                        <Box>
                            <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold' }}>
                                {t('common.orderHistory.pdfDownload.cusInfo.invoice')}
                            </CustomizeTypography>

                            <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                {orderInfor?._id}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                {t('common.orderHistory.pdfDownload.cusInfo.issue')}:
                                {formatDate(orderInfor?.updatedAt)}
                            </CustomizeTypography>
                        </Box>

                        {/* billed */}
                        <Box
                            sx={{
                                textAlign: 'end',
                                [mobileScreen]: {
                                    mt: 2,
                                },
                            }}
                        >
                            <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold' }}>
                                {t('common.orderHistory.pdfDownload.cusInfo.billed')}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                {orderInfor.user.firstName} {orderInfor.user.lastName}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                {orderInfor?.phoneNumber}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ mb: 0, color: '#000' }}>
                                {orderInfor?.address}
                            </CustomizeTypography>
                        </Box>
                    </Box>

                    {/* item detail, information */}
                    <Box>
                        <Box>
                            <CustomizeTypography sx={{ color: '#000', fontWeight: 'bold', mb: 0 }}>
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
                                sx={{ color: '#000', mb: 0, fontSize: 13, fontWeight: 'bold' }}
                            >
                                {t('common.orderHistory.pdfDownload.items.h1')}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{ color: '#000', mb: 0, fontSize: 13, fontWeight: 'bold' }}
                            >
                                {t('common.orderHistory.pdfDownload.items.h2')}
                            </CustomizeTypography>
                        </Box>
                        <Box
                            sx={{
                                p: 1,
                            }}
                        >
                            {orderInfor?.items?.map((item) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={item.image[0]} sx={{ height: 50, width: 50 }} />
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
                                        {item.price - item?.priceSale === 0
                                            ? converToVND(item.price)
                                            : converToVND(item.priceSale)}
                                    </CustomizeTypography>
                                </Box>
                            ))}
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <CustomizeTypography
                                sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                            >
                                {t('common.orderHistory.pdfDownload.items.sTotal')}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                                {converToVND(finalSubtotal)}
                            </CustomizeTypography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomizeTypography
                                sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                            >
                                {t('common.orderHistory.pdfDownload.items.discount')} - 20%
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                                {converToVND(finalDiscount)}
                            </CustomizeTypography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomizeTypography
                                sx={{ color: '#595959', mb: 0, fontWeight: 'bold', flex: 1 }}
                            >
                                {t('common.orderHistory.pdfDownload.items.amount')}
                            </CustomizeTypography>
                            <CustomizeTypography sx={{ color: '#595959', mb: 0, fontSize: 13.5 }}>
                                {converToVND(finalTotalPrice)}
                            </CustomizeTypography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Button
                    startIcon={<PictureAsPdfIcon />}
                    sx={{
                        [mobileScreen]: {
                            visibility: 'visible',
                        },
                        visibility: 'hidden',
                        padding: '12px 24px',
                        mt: 1,
                        textTransform: 'initial',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#fff',
                        '&:hover': {
                            bgcolor: 'transparent',
                            color: theme.palette.text.secondary,
                        },
                    }}
                    onClick={() =>
                        generatePDF(targetRef, { filename: `Invoice Order-${orderInfor?._id}` })
                    }
                >
                    Download
                </Button>
            </Box>
        </Box>
    );
};
