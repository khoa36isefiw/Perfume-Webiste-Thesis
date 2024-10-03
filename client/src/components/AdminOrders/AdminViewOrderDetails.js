import { Avatar, Box, Divider, Grid } from '@mui/material';
import React from 'react';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { useLocation } from 'react-router-dom';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { CODPayment, PaypalPayment } from './PaymentDesign';
import imageTest from '../../assets/images/rain7824.png';
import CallIcon from '@mui/icons-material/Call';

const orderTitle = ['Photo', 'Name', 'Quantity', 'Size', 'Price', 'Total'];

function AdminViewOrderDetails() {
    const location = useLocation();
    const { orderData } = location.state || {};
    console.log('orderData', orderData);

    return (
        <Box sx={{ height: '150vh' }}>
            <AdminButtonBackPage title={'List Orders'} />
            <Box>
                <Grid container spacing={4}>
                    <Grid item lg={8}>
                        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <AdminTypography sx={{ flex: 6 }}>
                                    <strong>Order No:</strong> #{orderData.orderId}
                                </AdminTypography>
                                <Box sx={{ flex: 1 }}>
                                    {orderData.orderPaid === 'COD' ? (
                                        <CODPayment />
                                    ) : (
                                        <PaypalPayment />
                                    )}
                                </Box>
                            </Box>
                            {/* user image */}
                            <Box sx={{ mt: 2 }}>
                                <Avatar
                                    src={imageTest}
                                    alt={orderData.userImage}
                                    sx={{ height: 128, width: 128 }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    my: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <UserInfor
                                    title={'Order Created at'}
                                    content={orderData.orderDate}
                                />
                                <UserInfor title={'Name'} content={orderData.userName} />
                                <UserInfor title={'Email'} content={orderData.orderDate} />
                                <UserInfor title={'Contact No'} content={orderData.phone} />
                            </Box>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 3, p: 2 }}>
                                <AdminTypography
                                    sx={{ fontWeight: 'bold', fontSize: '18px', mb: 2 }}
                                >
                                    Delivery Address
                                </AdminTypography>
                                <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                    <strong>Name:</strong> {orderData.userName}
                                </AdminTypography>
                                <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                    {orderData.address}
                                </AdminTypography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <CallIcon />
                                    <AdminTypography sx={{ fontSize: '16px', mb: 1 }}>
                                        {orderData.phone}
                                    </AdminTypography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={4}>
                        <Box sx={{ bgcolor: '#fff', borderRadius: 3 }}>aaddada</Box>
                    </Grid>

                    <Grid item xs={8} sm={8} md={8} lg={8}>
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
                            {orderData.ordersList.map((order, index) => (
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
                                            src={order.productImage}
                                            alt={order.productImage}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.productName}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.productQuantity}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.productSize} ml
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.productPrice}
                                        </AdminTypography>
                                        <AdminTypography sx={{ fontSize: '16px' }}>
                                            {order.totalPrice}
                                        </AdminTypography>
                                    </Box>
                                    {orderData.ordersList.length - 1 !== index && (
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
