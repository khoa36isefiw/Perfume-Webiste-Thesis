import React from 'react';
import { Avatar, Box, IconButton, Grid, Button, Divider } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { orderHistoryData } from './orderHistoryData';
import { useSelector } from 'react-redux';
import { formatDate } from '../FormatDate/formatDate';
import { converToVND } from '../convertToVND/convertToVND';

const OrderSummary = ({ iconBgColor, iconColor, orderCount, orderLabel }) => (
    <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #555',
                p: '8px',
                borderRadius: 1,
                width: '100%',
            }}
        >
            <IconButton
                disableTouchRipple
                sx={{
                    padding: '10px',
                    bgcolor: iconBgColor,
                    '&:hover': {
                        bgcolor: iconBgColor,
                        cursor: 'default',
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
    </>
);

const OrderInfo = ({ label, value }) => (
    <Box
        sx={{
            textAlign: 'center',
            width: '100%',
            [tabletScreen]: {
                width: '100%',
            },
            [mobileScreen]: {
                width: '100%',
            },
        }}
    >
        <CustomizeTypography
            sx={{
                mb: 0,
                color: theme.palette.text.secondary,
                fontWeight: 'bold',
                [mobileScreen]: {
                    fontSize: '12px',
                },
            }}
        >
            {label}
        </CustomizeTypography>
        {/* <CustomizeTypography sx={{ color: '#d9d9d9', flexWrap: 'wrap' }}>
            {value}
        </CustomizeTypography> */}
        <CustomizeTypography
            sx={{
                color: '#d9d9d9',
                flexWrap: 'wrap',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0 8px',
                [mobileScreen]: {
                    fontSize: '12px',
                },
            }}
        >
            {value}
        </CustomizeTypography>
    </Box>
);

const VerticalDivider = () => <Box sx={{ width: '1px', height: '40px', bgcolor: '#d9d9d9' }} />;

const OrderItem = ({ listData }) => (
    <>
        {listData.map((item, index) => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '12px',
                    [mobileScreen]: {
                        width: '100%',
                    },
                }}
                key={index}
            >
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
                        <CustomizeTypography
                            sx={{
                                fontSize: '15px',
                                fontWeight: 'bold',
                                [mobileScreen]: {
                                    fontSize: '13px',
                                },
                            }}
                        >
                            {item.orderName}
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '13.5px',
                                [mobileScreen]: {
                                    fontSize: '12.5px',
                                },
                            }}
                        >
                            {item.orderBrand}
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '13.5px',
                                [mobileScreen]: {
                                    fontSize: '12.5px',
                                },
                            }}
                        >
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
                                [mobileScreen]: {
                                    fontSize: '13px',
                                },
                            }}
                        >
                            Rate Now
                        </Button>
                    </Box>
                </Box>
                <CustomizeTypography
                    sx={{
                        fontWeight: 'bold',
                        [mobileScreen]: {
                            fontSize: '12.5px',
                        },
                    }}
                >
                    ${item.orderPrice}
                </CustomizeTypography>
            </Box>
        ))}
    </>
);

const OrderItem2 = ({ listData }) => (
    <>
        {listData.map((item, index) => (
            <Box key={index}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: '12px',
                        [mobileScreen]: {
                            width: '100%',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Avatar
                            src={item.image}
                            sx={{
                                borderRadius: 1,
                                width: '100px',
                                height: '120px',
                                bgcolor: '#fff',
                            }}
                        />
                        <Box sx={{ ml: 2 }}>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    [mobileScreen]: {
                                        fontSize: '13px',
                                    },
                                }}
                            >
                                {item.name}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                {item.brand}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                {item.size} ml
                            </CustomizeTypography>
                            {/* <Button
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
                                    [mobileScreen]: {
                                        fontSize: '13px',
                                    },
                                }}
                            >
                                Rate Now
                            </Button> */}
                        </Box>
                    </Box>
                    <CustomizeTypography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            [mobileScreen]: {
                                fontSize: '12.5px',
                            },
                        }}
                    >
                        {converToVND(item.price)}
                    </CustomizeTypography>
                </Box>
                {index !== listData.length - 1 && <Divider sx={{ bgcolor: '#ccc', my: 1 }} />}
            </Box>
        ))}
    </>
);

const OrderLists = ({ ordersListData }) => {
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    // const orderHistory = useSelector(
    //     (state) => state.checkoutManagement.listOrders[loggedInAccount.userId],
    // );

    const orderHistory = useSelector(
        // get for each user
        (state) => state.checkoutManagement.listOrders[loggedInAccount?.userId] || [],
    );

    console.log('orderHistory: ', orderHistory);

    return (
        <>
            {ordersListData.map((order, index) => (
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
                            <strong>${order.orderTotal}</strong>
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

                                [mobileScreen]: {
                                    fontSize: '13px',
                                },
                            }}
                        >
                            Download Invoice
                        </Button>
                    </Box>
                </Box>
            ))}

            {/* Test 2 */}
            {/* {Object.entries(orderHistory).map(([key, value]) => {
                console.log('key is: ', key);
                console.log('value is: ', value);
                return (
                    <Box sx={{ bgcolor: '#fff' }} key={key}>
                        {Object.entries(value).map(([key2, value2]) => {
                            console.log('key2 is: ', key2);
                            console.log('value2 is: ', value2); // Check the structure of value2
                            return (
                                <Box>
                                    {value2.map((val, index) => (
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
                                                        label="Order Num"
                                                        value={`#${val.orderId}`}
                                                    />
                                                </Grid>
                                                <Grid item xs={1} sm={1} lg={1}>
                                                    <VerticalDivider />
                                                </Grid>
                                                <Grid item xs={3} sm={3} lg={3}>
                                                    <OrderInfo
                                                        label="Order Date"
                                                        // value={val.timestamp.toISOString()}
                                                        value={formatDate(val.timestamp)}
                                                    />
                                                </Grid>
                                                <Grid item xs={1} sm={1}>
                                                    <VerticalDivider />
                                                </Grid>
                                                <Grid item xs={4} sm={4} lg={4}>
                                                    <OrderInfo
                                                        label="Ship To"
                                                        value={val.user.address}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <CustomizeDividerVertical8 />
                                            <OrderItem2 listData={val.products} />
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
                                                    <strong>${val.totalPrice}</strong>
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

                                                        [mobileScreen]: {
                                                            fontSize: '13px',
                                                        },
                                                    }}
                                                >
                                                    Download Invoice
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            );
                        })}
                    </Box>
                );
            })} */}

            {orderHistory.map((order, index) => (
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
                            <OrderInfo label="Order Num" value={`#${order.purchaseInfo.orderId}`} />
                        </Grid>
                        <Grid item xs={1} sm={1} lg={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3}>
                            <OrderInfo
                                label="Order Date"
                                value={formatDate(order.purchaseInfo.timestamp)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <VerticalDivider />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <OrderInfo label="Ship To" value={order.purchaseInfo.user.address} />
                        </Grid>
                    </Grid>

                    <CustomizeDividerVertical8 />
                    <OrderItem2 listData={order.purchaseInfo.products} />
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
                            <strong>{converToVND(order.purchaseInfo.totalPrice)}</strong>
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

                                [mobileScreen]: {
                                    fontSize: '13px',
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
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
            <Grid item container spacing={2}>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.total.bg}
                        iconColor={theme.palette.orderHistory.total.icon}
                        orderCount="36"
                        orderLabel="Total Order"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.deliveried.bg}
                        iconColor={theme.palette.orderHistory.deliveried.icon}
                        orderCount="2"
                        orderLabel="Active Order"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.pending.bg}
                        iconColor={theme.palette.orderHistory.pending.icon}
                        orderCount="24"
                        orderLabel="Completed"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.cancel.bg}
                        iconColor={theme.palette.orderHistory.cancel.icon}
                        orderCount="12"
                        orderLabel="Canceled"
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                spacing={0}
                xs={12}
                sm={12}
                sx={{
                    [mobileScreen]: {
                        paddingLeft: 0,
                    },
                }}
            >
                <OrderLists ordersListData={orderHistoryData} />
            </Grid>
        </Grid>
    );
}

export default MyPurchase;
