import { Avatar, Box, Divider, Grid } from '@mui/material';
import React from 'react';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { useLocation } from 'react-router-dom';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { CODPayment, PaypalPayment, VNPayPayment } from './PaymentDesign';

import CallIcon from '@mui/icons-material/Call';
import { converToVND } from '../convertToVND/convertToVND';
import { formatDate } from '../FormatDate/formatDate';
import { ipadProScreen, mobileScreen, tabletScreen } from '../../Theme/Theme';

const orderTitle = ['Photo', 'Name', 'Quantity', 'Size', 'Price', 'Total'];

function AdminViewOrderDetails() {
    const location = useLocation();
    const { orderData } = location.state || {};
    console.log('orderData', orderData);

    return (
        <Box
            sx={{
                height: '150vh',
                px: 4,
                [mobileScreen]: {
                    px: 2,
                },
            }}
        >
            <AdminButtonBackPage title={'List Orders'} />
            <Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <AdminTypography sx={{ flex: 6 }}>
                                    <strong>Order No:</strong> #{orderData._id}
                                </AdminTypography>
                                <Box sx={{ flex: 1 }}>
                                    {orderData.paymentMethod === 'COD' ? (
                                        <CODPayment />
                                    ) : orderData.paymentMethod === 'PAYPAL' ? (
                                        <PaypalPayment />
                                    ) : (
                                        <VNPayPayment />
                                    )}
                                </Box>
                            </Box>
                            {/* user image */}
                            <Box sx={{ mt: 2 }}>
                                <Avatar
                                    src={orderData.user.imagePath}
                                    alt={orderData.user.imagePath}
                                    sx={{ height: 128, width: 128 }}
                                />
                            </Box>
                            {/* <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',

                                    [tabletScreen]: {
                                        // flexDirection: 'column',
                                        flexWrap: 'wrap',
                                        alignItems: 'start',
                                    },
                                    [mobileScreen]: {
                                        flexDirection: 'column',
                                        alignItems: 'start',
                                    },
                                }}
                            >
                                <UserInfor
                                    title={'Order Created at'}
                                    content={formatDate(orderData.createdAt)}
                                />
                                <UserInfor title={'Name'} content={orderData.userName} />
                                <UserInfor title={'Email'} content={orderData.userEmail} />
                                <UserInfor title={'Contact No'} content={orderData.userPhone} />
                            </Box> */}
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'grid', // Use grid layout
                                    gridTemplateColumns: 'repeat(4, 1fr)', // Default: 4 items per row
                                    gap: 2, // Add spacing between grid items
                                    [tabletScreen]: {
                                        gridTemplateColumns: 'repeat(2, 1fr)', // 2 items per row on tablet
                                    },
                                    [mobileScreen]: {
                                        gridTemplateColumns: '1fr', // 1 item per row on mobile
                                    },
                                }}
                            >
                                <UserInfor
                                    title={'Order Created at'}
                                    content={formatDate(orderData.createdAt)}
                                />
                                <UserInfor
                                    title={'Name'}
                                    content={
                                        orderData.user.firstName + ' ' + orderData.user.lastName
                                    }
                                />
                                <UserInfor title={'Email'} content={orderData.user.email} />
                                <UserInfor
                                    title={'Contact No'}
                                    content={orderData.user.phoneNumber}
                                />
                            </Box>

                            <Box sx={{ border: '1px solid #ccc', borderRadius: 3, p: 2 }}>
                                <AdminTypography
                                    sx={{ fontWeight: 'bold', fontSize: '18px', mb: 2 }}
                                >
                                    Delivery Address
                                </AdminTypography>
                                <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                    <strong>Name:</strong>{' '}
                                    {orderData.user.firstName + ' ' + orderData.user.lastName}
                                </AdminTypography>
                                <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                    {orderData.user.address}
                                </AdminTypography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <CallIcon />
                                    <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                        {orderData.user.phoneNumber}
                                    </AdminTypography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    {/* <Grid item lg={4}>
                        <Box sx={{ bgcolor: '#fff', borderRadius: 3 }}>aaddada</Box>
                    </Grid> */}

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <AdminTypography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Order Items
                        </AdminTypography>

                        <Box
                            sx={{
                                bgcolor: '#fff',
                                borderRadius: 3,
                                p: 2,
                                height: '400px',
                                overflow: 'scroll',
                            }}
                        >
                            {/* Title Row */}
                            <Box
                                sx={{
                                    display: 'grid',
                                    // auto for image
                                    // the others for
                                    //Name
                                    // Quantity
                                    // Size
                                    // Price
                                    // Total
                                    // 1fr:name, 1fr: quantityf, 1fr: size, 1fr:price, 1fr:total
                                    gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr',
                                    alignItems: 'center',
                                    gap: 2, // Adjust gap between columns
                                    textAlign: 'center',
                                }}
                            >
                                {orderTitle.map((title, index) => (
                                    <AdminTypography
                                        key={index}
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {title}
                                    </AdminTypography>
                                ))}
                            </Box>
                            <Divider sx={{ my: 2 }} />

                            {/* Content Rows */}
                            {orderData?.items?.map((order, index) => (
                                <Box key={index}>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr', // Matches the title row layout
                                            alignItems: 'center',
                                            gap: 2, // Same gap for consistent spacing
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Avatar
                                            src={order?.image[0]}
                                            alt={order?.image[0]}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.productName}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.quantity}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.size}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {converToVND(
                                                order.priceSale ? order.priceSale : order.price,
                                            )}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {converToVND(
                                                order.priceSale
                                                    ? order.priceSale * order.quantity
                                                    : order.price * order.quantity,
                                            )}
                                        </AdminTypography>
                                    </Box>
                                    {orderData?.order?.items.length - 1 !== index && (
                                        <Divider sx={{ my: 2 }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default AdminViewOrderDetails;

const UserInfor = ({ title, content }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AdminTypography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{title}</AdminTypography>
            <AdminTypography>{content}</AdminTypography>
        </Box>
    );
};
