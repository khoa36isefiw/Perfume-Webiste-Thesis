import React, { useState } from 'react';
import {
    Avatar,
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
import { useDispatch, useSelector } from 'react-redux';
import {
    createNewCoupon,
    updateCoupon,
} from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AdminButtonDesign } from './AdminCreateCoupon';

function AdminEditCoupon() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { couponData } = location.state || {};
    const [quantity, setQuantity] = useState(couponData.quantity);
    const [code, setCode] = useState(couponData.code);
    const [status, setStatus] = useState(couponData.status);
    const [description, setDescription] = useState(couponData.description);
    const [discount, setDiscount] = useState(couponData.discount);
    const [getCurrentDate, setGetCurrentDate] = useState(couponData.getCurrentDate);
    const [getEndDate, setGetEndDate] = useState(couponData.getEndDate);

    // show message
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const statusOptions = ['Active', 'Expired'];
    const listCoupons = useSelector((state) => state.couponsManagement.listCoupons);
    console.log('listCoupons: ', listCoupons);

    // Handle form submission
    const handleCreateNewCoupon = () => {
        const newProduct = {
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
        dispatch(updateCoupon({ couponId: couponData.id, data: newProduct }));
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setMessageType('success');
        setMessageContent('Create new coupon successfully');
        setMessageTitle('Create new coupon');
        // setTimeout(() => {
        //     navigate('/admin/manage-coupons/');
        // }, 2800);
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };
    return (
        <Box sx={{ height: '100vh', p: 3, mx: 4 }}>
            <AdminButtonBackPage title={'List Coupons'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Edit Coupon Information
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
                                            bgcolor: option === 'Active' ? '#bdf5d3' : grey[300],
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            padding: '4px 0',
                                            width: 80,
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                fontSize: '14px',
                                                color: option === 'Active' ? '#187d44' : grey[600],
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
                    title={'Save Information'}
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
}

export default AdminEditCoupon;
