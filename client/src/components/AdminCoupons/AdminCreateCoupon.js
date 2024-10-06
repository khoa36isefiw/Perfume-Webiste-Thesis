import React, { useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    Grid,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { theme } from '../../Theme/Theme';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { createNewCoupon } from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';

const AdminCreateCoupon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // get the current date time follow yyyy-mm-dd format
    let currentDate = new Date().toLocaleString('en-CA').slice(0, 10);

    console.log('currentDate: ', currentDate);

    const [quantity, setQuantity] = useState('');
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [getCurrentDate, setGetCurrentDate] = useState(currentDate);
    const [getEndDate, setGetEndDate] = useState(currentDate);

    // show message
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    console.log('get current date: ', getCurrentDate);

    // item for menu
    const statusOptions = ['Active', 'Unactive', 'Expired'];
    const generateRandomCouponId = () => {
        return 'COUPON-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Handle form submission
    const handleCreateNewCoupon = () => {
        const newProduct = {
            id: generateRandomCouponId(),
            description,
            code,
            discount,
            quantity,
            used: 0,
            status,
            getCurrentDate,
            getEndDate,
        };

        console.log('New Product Data:', newProduct);
        dispatch(createNewCoupon({ data: newProduct }));
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setMessageType('success');
        setMessageContent('Create new coupon successfully');
        setMessageTitle('Create new coupon');
        setTimeout(() => {
            navigate('/admin/manage-coupons/');
        }, 2800);
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    return (
        <Box
            sx={{
                p: 3,
                mx: 4,
            }}
        >
            <AdminButtonBackPage title={'List Coupons'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Create New Coupon
            </Typography>
            <Grid container spacing={4}>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Description</AdminTypography>
                    <TextField
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Code</AdminTypography>
                    <TextField
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <Grid item lg={6}>
                    <AdminTypography>Coupon Discount</AdminTypography>
                    <TextField
                        fullWidth
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon Quantity</AdminTypography>
                    <TextField
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <Grid item lg={6}>
                    {/* Brand Dropdown */}
                    <AdminTypography>Coupon Status</AdminTypography>
                    <FormControl fullWidth sx={{ mb: 2, height: 40 }}>
                        <Select
                            labelId="brand-select-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    <Box
                                        sx={{
                                            // bgcolor: '#ffdfe4',
                                            // color: '#f11133',
                                            bgcolor:
                                                option === 'Active'
                                                    ? '#bdf5d3'
                                                    : option === 'Unactive'
                                                    ? '#ffdfe4'
                                                    : grey[300],
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            padding: '4px 0',
                                            width: 80,
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                fontSize: '14px',
                                                color:
                                                    option === 'Active'
                                                        ? '#187d44'
                                                        : option === 'Unactive'
                                                        ? '#f11133'
                                                        : grey[600],
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {option}
                                        </AdminTypography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item lg={6}>
                    <AdminTypography>Coupon Open</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={getCurrentDate}
                        onChange={(e) => setGetCurrentDate(e.target.value)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item lg={6}>
                    <AdminTypography>Coupon End</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={getEndDate}
                        onChange={(e) => setGetEndDate(e.target.value)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Create Coupon'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleCreateNewCoupon}
                    type={'contained'}
                    textColor={'white'}
                />

                <AdminButtonDesign
                    title={'Cancel'}
                    // bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={''}
                    type={'outlined'}
                    textColor={theme.palette.admin.bgColor}
                    borderColor={theme.palette.admin.bgColor}
                />
            </Box>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdminCreateCoupon;

export const AdminButtonDesign = ({
    type,
    bgcolor,
    title,
    onHandleClick,
    textColor,
    borderColor,
}) => {
    return (
        <Button
            variant={type}
            onClick={onHandleClick}
            sx={{
                color: textColor,
                marginTop: 2,
                padding: '10px 18px',
                fontSize: '14px',
                textTransform: 'initial',
                borderRadius: 2,
                bgcolor: bgcolor,
                borderColor: borderColor,
                '&:hover': {
                    bgcolor: bgcolor,
                    borderColor: borderColor,
                },
            }}
        >
            {title}
        </Button>
    );
};
