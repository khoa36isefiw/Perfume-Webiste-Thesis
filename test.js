import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

function OrderHistory({ orderHistory }) {
    // Hàm tải xuống dữ liệu đơn hàng dưới dạng tệp JSON
    const handleDownloadInvoice = (order) => {
        // Tạo nội dung JSON từ dữ liệu đơn hàng
        const orderData = JSON.stringify(order, null, 2);
        
        // Tạo một blob từ dữ liệu JSON
        const blob = new Blob([orderData], { type: 'application/json' });
        
        // Tạo một URL từ blob
        const url = URL.createObjectURL(blob);
        
        // Tạo một thẻ <a> để tải xuống tệp
        const link = document.createElement('a');
        link.href = url;
        link.download = `Order_${order._id}.json`; // Đặt tên tệp tải xuống
        link.click();
        
        // Dọn dẹp URL sau khi tải xuống
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {orderHistory?.map((order) => (
                <Box
                    key={order._id}
                    sx={{
                        bgcolor: '#555',
                        minHeight: '20px',
                        borderRadius: 1,
                        p: 2,
                        my: 4,
                        width: '100%',
                    }}
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
                            <OrderInfo label="Ship To" value="ahiahihi" />
                        </Grid>
                    </Grid>

                    <CustomizeDividerVertical8 />
                    <OrderItem2 listData={order.items} />
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
                                fontSize: '16px',
                                [mobileScreen]: { fontSize: '13px' },
                            }}
                        >
                            <span style={{ color: '#d9d9d9' }}>Total Amount:</span>{' '}
                            <strong>{converToVND(order.totalPrice)}</strong>
                        </CustomizeTypography>

                        <Button
                            startIcon={<SystemUpdateAltIcon />}
                            onClick={() => handleDownloadInvoice(order)} // Gọi hàm tải xuống
                            sx={{
                                padding: '6px 0',
                                textTransform: 'initial',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'transparent' },
                                [mobileScreen]: { fontSize: '13px' },
                            }}
                        >
                            Download Invoice
                        </Button>
                    </Box>
                </Box>
            ))}
        </>
    );
}

export default OrderHistory;
