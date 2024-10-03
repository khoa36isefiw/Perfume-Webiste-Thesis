import { Avatar, Box, Divider } from '@mui/material';
import React from 'react';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { useLocation } from 'react-router-dom';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';

function AdminViewOrderDetails() {
    const location = useLocation();
    const { orderData } = location.state || {};
    console.log('orderData', orderData);

    return (
        <Box>
            <AdminButtonBackPage title={'List Orders'} />

            <Box>
                <Avatar src={orderData.userImage} alt={orderData.userImage} />
                <AdminTypography>{orderData.userName}</AdminTypography>
                <AdminTypography>{orderData.address}</AdminTypography>
                <AdminTypography>{orderData.phone}</AdminTypography>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                        #{orderData.orderId}
                    </AdminTypography>
                    <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                        {orderData.orderDate}
                    </AdminTypography>
                    <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                        {orderData.address}
                    </AdminTypography>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 1 }} />
                <AdminTypography>List products use order</AdminTypography>
                {/* Table Body */}
                <Box sx={{ maxHeight: '270px', overflow: 'scroll' }}>
                    {orderData.ordersList.map((order, index) => (
                        <Box key={order.productId}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                }}
                            >
                                <Avatar src={order.productImage} alt={order.productImage} />
                                <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                    {order.productName}
                                </AdminTypography>
                                <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                    {order.productBrand}
                                </AdminTypography>

                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                        textDecoration:
                                            order.productSale > 0 ? 'line-through' : 'normal',
                                    }}
                                >
                                    {order.productPrice}
                                </AdminTypography>
                                {order.productSale > 0 && (
                                    <AdminTypography
                                        sx={{
                                            flex: 1,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {order.productPriceSale}
                                    </AdminTypography>
                                )}

                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    {order.productSize}ml
                                </AdminTypography>

                                <AdminTypography
                                    sx={{
                                        flex: 1,
                                        textAlign: 'center',
                                        bgcolor: order.status === 1 ? '#ddfbe9' : '#f0ed1f87',
                                        borderRadius: 2,
                                        padding: '4px 0',
                                    }}
                                >
                                    {order.status === 1 ? 'Paid' : 'Pending'}
                                </AdminTypography>
                            </Box>
                            <React.Fragment>
                                {orderData.ordersList.length - 1 !== index && (
                                    <Divider sx={{ my: 1 }} />
                                )}
                            </React.Fragment>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminViewOrderDetails;
