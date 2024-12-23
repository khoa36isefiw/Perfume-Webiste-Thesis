import React, { useEffect, useRef, useState } from 'react';
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
import useOrderByUser from '../../api/useOrderByUser';
import { blue } from '@mui/material/colors';

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
                key={item?.orderNumber}
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
                            src={item.image[0]}
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
                                {item.productName}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                brand
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                {item.size}
                            </CustomizeTypography>
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
                        {converToVND(item.price)} - price sale {converToVND(item.priceSale)}
                    </CustomizeTypography>
                </Box>
                {index !== listData.length - 1 && <Divider sx={{ bgcolor: '#ccc', my: 1 }} />}
            </Box>
        ))}
    </>
);

// const OrderLists = ({ ordersListData, orderHistory }) => {
//     const invoiceRefs = useRef({}); // Dùng object để lưu ref cho mỗi order

//     const [selectedOrderId, setSelectedOrderId] = useState(null);

//     const handlePrint = useReactToPrint({
//         content: () => invoiceRefs.current[selectedOrderId] || null,
//         documentTitle: `Invoice`,
//     });

//     const handleDownloadInvoice = (orderId) => {
//         setSelectedOrderId(orderId); // Đặt ID của đơn hàng được chọn
//         handlePrint(); // Gọi hàm in
//     };
//     return (
//         <>
//             {/* sample */}
//             {ordersListData?.map((order, index) => (
//                 <Box
//                     sx={{
//                         bgcolor: '#555',
//                         minHeight: '20px',
//                         borderRadius: 1,
//                         p: 2,
//                         my: 4,
//                         width: '100%',
//                     }}
//                     key={index}
//                 >
//                     <Grid container spacing={2}>
//                         <Grid item xs={3} sm={3} lg={3}>
//                             <OrderInfo label="Order Num" value={`#${order.orderNumber}`} />
//                         </Grid>
//                         <Grid item xs={1} sm={1} lg={1}>
//                             <VerticalDivider />
//                         </Grid>
//                         <Grid item xs={3} sm={3} lg={3}>
//                             <OrderInfo label="Order Date" value={order.orderDate} />
//                         </Grid>
//                         <Grid item xs={1} sm={1}>
//                             <VerticalDivider />
//                         </Grid>
//                         <Grid item xs={4} sm={4} lg={4}>
//                             <OrderInfo label="Ship To" value={order.orderAddress} />
//                         </Grid>
//                     </Grid>

//                     <CustomizeDividerVertical8 />
//                     <OrderItem listData={order.orderData} />
//                     <CustomizeDividerVertical8 />
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <CustomizeTypography
//                             sx={{
//                                 mb: 0,
//                                 [mobileScreen]: {
//                                     fontSize: '13px',
//                                 },
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     color: '#d9d9d9',
//                                 }}
//                             >
//                                 Total Amount:
//                             </span>{' '}
//                             <strong>${order.orderTotal}</strong>
//                         </CustomizeTypography>
//                         <Button
//                             startIcon={<SystemUpdateAltIcon />}
//                             sx={{
//                                 padding: '6px 0',
//                                 textTransform: 'initial',
//                                 fontSize: '14px',
//                                 fontWeight: 'bold',
//                                 // color: theme.palette.text.secondary,

//                                 '&:hover': {
//                                     bgcolor: 'transparent',
//                                 },

//                                 [mobileScreen]: {
//                                     fontSize: '13px',
//                                 },
//                             }}
//                         >
//                             Download Invoice
//                         </Button>
//                     </Box>
//                 </Box>
//             ))}

//             {/* sample */}
//             {orderHistory?.map((order, index) => (
//                 <Box
//                     sx={{
//                         bgcolor: '#555',
//                         minHeight: '20px',
//                         borderRadius: 1,
//                         p: 2,
//                         my: 4,
//                         width: '100%',
//                     }}
//                     key={order._id}
//                     ref={(el) => (invoiceRefs.current[order._id] = el)}
//                 >
//                     <Grid container spacing={2}>
//                         <Grid item xs={3} sm={3} lg={3}>
//                             <OrderInfo label="Order Num" value={`#${order._id}`} />
//                         </Grid>
//                         <Grid item xs={1} sm={1} lg={1}>
//                             <VerticalDivider />
//                         </Grid>
//                         <Grid item xs={3} sm={3} lg={3}>
//                             <OrderInfo label="Order Date" value={formatDate(order.createdAt)} />
//                         </Grid>
//                         <Grid item xs={1} sm={1}>
//                             <VerticalDivider />
//                         </Grid>
//                         <Grid item xs={4} sm={4} lg={4}>
//                             <OrderInfo label="Ship To" value={'ahiahihi'} />
//                         </Grid>
//                     </Grid>

//                     <CustomizeDividerVertical8 />
//                     <OrderItem2 listData={order.items} />
//                     <CustomizeDividerVertical8 />
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <CustomizeTypography
//                             sx={{
//                                 mb: 0,
//                                 [mobileScreen]: {
//                                     fontSize: '13px',
//                                 },
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     color: '#d9d9d9',
//                                 }}
//                             >
//                                 Total Amount:
//                             </span>{' '}
//                             <strong>{converToVND(order.totalPrice)}</strong>
//                         </CustomizeTypography>

//                         <Button
//                             startIcon={<SystemUpdateAltIcon />}
//                             onClick={() => handleDownloadInvoice(order._id)}
//                             sx={{
//                                 padding: '6px 0',
//                                 textTransform: 'initial',
//                                 fontSize: '14px',
//                                 fontWeight: 'bold',
//                                 // color: theme.palette.text.secondary,

//                                 '&:hover': {
//                                     bgcolor: 'transparent',
//                                 },

//                                 [mobileScreen]: {
//                                     fontSize: '13px',
//                                 },
//                             }}
//                         >
//                             Download Invoice
//                         </Button>
//                     </Box>
//                 </Box>
//             ))}
//         </>
//     );
// };

function OrderLists({ orderHistory }) {
    const orderRefs = useRef({}); // Dùng để lưu các tham chiếu của các đơn hàng

    // Hàm để tạo và tải PDF từ HTML
    const handleDownloadInvoice = async (orderId) => {
        const element = orderRefs.current[orderId];
        if (!element) return;

        // Sử dụng html2canvas và jsPDF để tạo PDF
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Căn chỉnh ảnh trong PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Order_${orderId}.pdf`);
    };

    return (
        <>
            {orderHistory?.map((order) => (
                <Box
                    key={order._id}
                    ref={(el) => (orderRefs.current[order._id] = el)}
                    sx={{
                        bgcolor: '#f5f5f5',
                        minHeight: '20px',
                        borderRadius: 1,
                        p: 2,
                        my: 4,
                        width: '100%',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div>Order Number: #{order._id}</div>
                        </Grid>
                        <Grid item xs={3}>
                            <div>Order Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                        </Grid>
                        <Grid item xs={3}>
                            <div>Ship To: {order.shippingAddress}</div>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: 2 }}>
                        <strong>Total Amount: </strong> {order.totalPrice.toLocaleString('vi-VN')}{' '}
                        VND
                    </Box>

                    <Button
                        startIcon={<SystemUpdateAltIcon />}
                        onClick={() => handleDownloadInvoice(order._id)}
                        sx={{
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Download Invoice as PDF
                    </Button>
                </Box>
            ))}
        </>
    );
}

function MyPurchase() {
    const userId = JSON.parse(window.localStorage.getItem('user_data'))?._id || null;
    const { data: orders, isLoading, error } = useOrderByUser(userId);

    const filterOrdersList = [
        { filter: 'All Orders', status: 'ALL' },
        { filter: 'Pending', status: 'PENDING_PAYMENT' },
        { filter: 'Paid', status: 'PAID' },
        { filter: 'Cancelled', status: 'CANCELLED' },
    ];

    const [filterOrders, setFilterOrders] = useState({ filter: 'All Orders', status: 'ALL' });
    const filterListOrders =
        filterOrders.status !== filterOrdersList[0]?.status
            ? orders?.data.filter((order) => order.status === filterOrders.status)
            : orders?.data;

    const handleSelectFilterOrders = (filter) => {
        setFilterOrders(filter);
    };

    const totalOrderBasedStatus = (orderStatus) => {
        return orders?.data?.filter((order) => order.status === orderStatus).length;
    };
    const pending = totalOrderBasedStatus('PENDING_PAYMENT');
    const paid = totalOrderBasedStatus('PAID');
    const cancelled = totalOrderBasedStatus('CANCELLED');

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
                        orderCount={orders?.data.length}
                        orderLabel="Total Order"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.deliveried.bg}
                        iconColor={theme.palette.orderHistory.deliveried.icon}
                        orderCount={pending}
                        orderLabel="Pending Payment"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.pending.bg}
                        iconColor={theme.palette.orderHistory.pending.icon}
                        orderCount={paid}
                        orderLabel="Paid"
                    />
                </Grid>
                <Grid item xs={6} sm={6} lg={3}>
                    <OrderSummary
                        iconBgColor={theme.palette.orderHistory.cancel.bg}
                        iconColor={theme.palette.orderHistory.cancel.icon}
                        orderCount={cancelled}
                        orderLabel="Cancelled"
                    />
                </Grid>
            </Grid>
            {/* filter  */}
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
                {filterOrdersList.map((filter, index) => (
                    <Button
                        onClick={() => handleSelectFilterOrders(filter)}
                        key={index}
                        variant={filterOrders.status === filter.status ? 'contained' : 'outlined'}
                        sx={{
                            margin: 0.5,
                            fontSize: '14px',
                            textTransform: 'initial',
                            mb: 2,
                            borderRadius: 5,
                            color:
                                filter.status === 'ALL'
                                    ? theme.palette.orderHistory.total.icon
                                    : filter.status === 'PENDING_PAYMENT'
                                    ? theme.palette.orderHistory.deliveried.icon
                                    : filter.status === 'PAID'
                                    ? theme.palette.orderHistory.pending.icon
                                    : theme.palette.orderHistory.cancel.icon,

                            fontWeight: 'bold',
                            '&:focus': {
                                bgcolor:
                                    filter.status === 'ALL'
                                        ? theme.palette.orderHistory.total.bg
                                        : filter.status === 'PENDING_PAYMENT'
                                        ? theme.palette.orderHistory.deliveried.bg
                                        : filter.status === 'PAID'
                                        ? theme.palette.orderHistory.pending.bg
                                        : theme.palette.orderHistory.cancel.bg,
                            },
                        }}
                    >
                        {filter.filter}
                    </Button>
                ))}
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
                <OrderLists ordersListData={orderHistoryData} orderHistory={filterListOrders} />
            </Grid>
        </Grid>
    );
}

export default MyPurchase;
