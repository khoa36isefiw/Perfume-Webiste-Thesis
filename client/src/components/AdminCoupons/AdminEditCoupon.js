import React, { useState } from 'react';
import { Box, MenuItem, Select, TextField, Typography, FormControl, Grid } from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';

import { useDispatch } from 'react-redux';
import { updateCoupon } from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AdminButtonDesign } from './AdminCreateCoupon';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import { couponAPI } from '../../api/couponAPI';
import { grey } from '@mui/material/colors';

function AdminEditCoupon() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();

    const { couponData } = location.state || {};
    const [quantity, setQuantity] = useState(couponData.quantity);
    const [code, setCode] = useState(couponData.code);
    const [status, setStatus] = useState(couponData.status);
    const [description, setDescription] = useState(couponData.description);
    const [discount, setDiscount] = useState(couponData.discount);
    const [getCurrentDate, setGetCurrentDate] = useState(couponData.startDate);
    const [getEndDate, setGetEndDate] = useState(couponData.endDate);
    const [disabledButton, setDisabledButton] = useState(false);

    const statusOptions = ['active', 'inactive', 'expired'];
    // Handle form submission
    const handleUpdate = async () => {
        const data = {
            nameVn: code,
            nameEn: code,
            code: code,
            quantity: +quantity,
            description: description,
            discount: +discount,
            status: status,
            startDate: getCurrentDate,
            endDate: getEndDate,
        };

        if (
            quantity !== '' &&
            code !== '' &&
            status !== '' &&
            description !== '' &&
            discount !== '' &&
            getCurrentDate !== '' &&
            getEndDate !== ''
        ) {
            if (getCurrentDate > getEndDate) {
                showMessage(
                    'error',
                    'Date Validation Error',
                    'Start date must be less than end date.',
                );
                return;
            }

            const updateCouponResponse = await couponAPI.updateCoupon(couponData._id, data);
            if (updateCouponResponse.status === 200) {
                console.log('updateCouponResponse: ', updateCouponResponse);
                showMessage('success', 'Update coupon', 'Update  coupon successfully');
                setTimeout(() => {
                    navigate('/admin/manage-coupons/');
                }, 2800);
            }
        } else {
            showMessage('warning', 'Update coupon', 'Please fill information of coupon!');
        }

        dispatch(updateCoupon({ couponId: couponData._id, data: data }));
    };

    const handleNumberBlur = () => {
        if (quantity < 0 || discount < 0 || discount >= 100) {
            showMessage(
                'warning',
                'Update Promotions',
                discount > 100
                    ? 'Discount number must be less or equal than 100!'
                    : 'Number must be greater than 0!',
            );

            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    };

    const handleDateBlur = () => {
        if (getCurrentDate > getEndDate) {
            showMessage('error', 'Date Validation Error', 'Start date must be less than end date.');
            setDisabledButton(true);
            return;
        } else {
            setDisabledButton(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                p: 3,
                mx: 4,
                [tabletScreen]: {
                    mx: 2,
                },
                [mobileScreen]: {
                    padding: 2,
                    mx: 0,
                },
            }}
        >
            <AdminButtonBackPage title={'List Coupons'} />
            <Typography variant="h4" sx={{ mb: 3 }}>
                Edit Coupon Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Description</AdminTypography>
                    <TextField
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Code</AdminTypography>
                    <TextField fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Discount</AdminTypography>
                    <TextField
                        fullWidth
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        onBlur={handleNumberBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Quantity</AdminTypography>
                    <TextField
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        onBlur={handleNumberBlur}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    {/* Brand Dropdown */}
                    <AdminTypography>Coupon Status</AdminTypography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                            labelId="brand-select-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    <Box
                                        sx={{
                                            bgcolor:
                                                option === 'active'
                                                    ? '#bdf5d3'
                                                    : option === 'inactive'
                                                    ? '#ffdfe4'
                                                    : grey[300],
                                            borderRadius: 1,
                                            boxShadow: 1,
                                            padding: '2px 0',
                                            width: 80,
                                        }}
                                    >
                                        <AdminTypography
                                            sx={{
                                                fontSize: '14px',
                                                color:
                                                    option === 'active'
                                                        ? '#187d44'
                                                        : option === 'inactive'
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

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Open</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={getCurrentDate?.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetCurrentDate(new Date(e.target.value).toISOString())} // Set to ISO format
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={handleDateBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon End</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={getEndDate?.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetEndDate(new Date(e.target.value).toISOString())} // Set to ISO format
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={handleDateBlur}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Save Information'}
                    bgcolor={theme.palette.admin.bgColor}
                    onHandleClick={handleUpdate}
                    type={'contained'}
                    textColor={'white'}
                    disabled={disabledButton}
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
