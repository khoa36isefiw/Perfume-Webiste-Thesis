import React from 'react';
import { Avatar, Container, Box, IconButton, Grid, Button } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { orderHistoryData } from './orderHistoryData';

const OrderSummary = ({ iconBgColor, iconColor, orderCount, orderLabel }) => (
    <Grid item lg={3}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #555',
                p: '8px',
                borderRadius: 1,
            }}
        >
            <IconButton
                disableTouchRipple
                sx={{
                    padding: '10px',
                    bgcolor: iconBgColor,
                    '&:hover': {
                        bgcolor: iconBgColor,
                    },
                }}
            >
                <ViewInArIcon sx={{ fontSize: '30px', color: iconColor }} />
            </IconButton>
            <Box sx={{ ml: 1 }}>
                <CustomizeTypography
                    sx={{
                        mb: 0,
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                    }}
                >
                    {orderCount}
                </CustomizeTypography>
                <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                    {orderLabel}
                </CustomizeTypography>
            </Box>
        </Box>
    </Grid>
);

const OrderInfo = ({ label, value }) => (
    <Box sx={{ textAlign: 'center' }}>
        <CustomizeTypography sx={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>
            {label}
        </CustomizeTypography>
        <CustomizeTypography sx={{ color: '#d9d9d9' }}>{value}</CustomizeTypography>
    </Box>
);

const VerticalDivider = () => <Box sx={{ width: '1px', height: '40px', bgcolor: '#d9d9d9' }} />;

const listOrderItem = [
    {
        orderImage: 'https://orchard.vn/wp-content/uploads/2018/04/dior-sauvage-edp_1.jpg',
        orderName: 'Dior Sauvage EDP',
        orderBrand: 'Dior',
        orderSize: '125',
        orderPrice: '80.00',
    },
    {
        orderImage:
            'https://orchard.vn/wp-content/uploads/2019/11/yves-saint-laurent-la-nuit-de-lhomme-edt_1.jpg',
        orderName: "Yves Saint Laurent La Nuit De L'Homme EDT",
        orderBrand: 'Yves Saint Laurent',
        orderSize: '60',
        orderPrice: '105.00',
    },
];
const OrderItem = ({ listData }) => (
    <>
        {listData.map((item, index) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '12px' }} key={index}>
                <Box sx={{ display: 'flex' }}>
                    <Avatar
                        src={item.orderImage}
                        sx={{
                            borderRadius: 1,
                            width: '100px',
                            height: '120px',
                        }}
                    />
                    <Box sx={{ ml: 2 }}>
                        <CustomizeTypography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                            {item.orderName}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '13.5px' }}>
                            {item.orderBrand}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '13.5px' }}>
                            {item.orderSize} ml
                        </CustomizeTypography>
                        <Button
                            startIcon={<StarIcon />}
                            sx={{
                                padding: '6px 0',
                                textTransform: 'initial',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            Rate Now
                        </Button>
                    </Box>
                </Box>
                <CustomizeTypography sx={{ fontWeight: 'bold' }}>
                    ${item.orderPrice}
                </CustomizeTypography>
            </Box>
        ))}
    </>
);

const OrderLists = ({ ordersListData }) => {
    return (
        <>
            {ordersListData.map((order, index) => (
                <Box sx={{ bgcolor: '#555', minHeight: '20px', borderRadius: 1, p: 2, my: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <OrderInfo label="Order Number" value="#001" />
                        <VerticalDivider />
                        <OrderInfo label="Order Date" value="Apr 18, 2024" />
                        <VerticalDivider />
                        <OrderInfo label="Delivery Date" value="Apr 21, 2024" />
                        <VerticalDivider />
                        <OrderInfo label="Ship To" value="Số 1 Võ Văn Ngân" />
                    </Box>
                    <CustomizeDividerVertical8 />
                    <OrderItem listData={listOrderItem} />
                    <CustomizeDividerVertical8 />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <CustomizeTypography sx={{ mb: 0 }}>
                            <span style={{ color: '#d9d9d9' }}>Total Amount:</span>{' '}
                            <strong>$160</strong>
                        </CustomizeTypography>
                        <Button
                            startIcon={<SystemUpdateAltIcon />}
                            sx={{
                                padding: '6px 0',
                                textTransform: 'initial',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                // color: theme.palette.text.secondary,

                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            Download Invoice
                        </Button>
                    </Box>
                </Box>
            ))}
        </>
    );
};

function MyPurchase() {
    return (
        <Container>
            <Grid item lg={12}>
                <CustomizeTypography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                    }}
                >
                    Your Orders
                </CustomizeTypography>
            </Grid>
            <Grid container item spacing={2}>
                <OrderSummary
                    iconBgColor={theme.palette.orderHistory.total.bg}
                    iconColor={theme.palette.orderHistory.total.icon}
                    orderCount="36"
                    orderLabel="Total Order"
                />
                <OrderSummary
                    iconBgColor={theme.palette.orderHistory.deliveried.bg}
                    iconColor={theme.palette.orderHistory.deliveried.icon}
                    orderCount="2"
                    orderLabel="Active Order"
                />
                <OrderSummary
                    iconBgColor={theme.palette.orderHistory.pending.bg}
                    iconColor={theme.palette.orderHistory.pending.icon}
                    orderCount="24"
                    orderLabel="Completed"
                />
                <OrderSummary
                    iconBgColor={theme.palette.orderHistory.cancel.bg}
                    iconColor={theme.palette.orderHistory.cancel.icon}
                    orderCount="12"
                    orderLabel="Canceled"
                />
            </Grid>
            <OrderLists ordersListData={orderHistoryData} />
        </Container>
    );
}

export default MyPurchase;
