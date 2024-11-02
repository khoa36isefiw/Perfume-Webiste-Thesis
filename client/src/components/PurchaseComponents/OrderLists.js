import React from 'react';
import { Box, Grid, Button } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen } from '../../Theme/Theme';

import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFTemplate } from '../PDFTemplate/PDFTemplate';
import { VerticalDivider } from './VerticalDivider';
import { OrderInfo } from './OrderInfo';
import { OrderItem } from './OrderItem';
import { formatDate } from '../FormatDate/formatDate';
import { converToVND } from '../convertToVND/convertToVND';
import { OrderItemV2 } from './OrderItemV2';

export const OrderLists = ({ ordersListData, orderHistory }) => {
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
                            <OrderInfo label="Order Num" value={`#${order.orderNumber}`} />
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
                            <OrderInfo label="Order Num" value={`#${order._id}`} />
                        </Grid>
                        <Grid item xs={1} sm={1} lg={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo label="Order Date" value={formatDate(order.createdAt)} />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <OrderInfo label="Ship To" value={'ahiahihi'} />
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
                                Total Amount:
                            </span>{' '}
                            <strong>{converToVND(order.totalPrice)}</strong>
                        </CustomizeTypography>
                        <PDFDownloadLink
                            document={<PDFTemplate order={order} />}
                            fileName={`order_${order._id}.pdf`}
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
        </>
    );
};
