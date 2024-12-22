import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, TextField, Typography, FormControl, Grid } from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { useDispatch } from 'react-redux';
import { updateCoupon } from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AdminButtonDesign } from './AdminCreateCoupon';

import { couponAPI } from '../../api/couponAPI';
import { grey } from '@mui/material/colors';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import useLoadingV2 from '../../hooks/useLoadingV2';
import { getId } from '../../utils/getIdByLocation';
import useCouponById from '../../api/useCouponById';

function AdminEditCoupon() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { LoadingAPI } = useLoadingV2();
    const location = useLocation();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const couponId = getId(location);
    const { data: couponData, isLoading } = useCouponById(couponId);
    console.log('couponData: ', couponData);

    const [quantity, setQuantity] = useState(null);
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState(null);
    const [getCurrentDate, setGetCurrentDate] = useState(null);
    const [getEndDate, setGetEndDate] = useState(null);
    const [disabledButton, setDisabledButton] = useState(false);

    // push data to state from api
    useEffect(() => {
        console.log('chay vo day');
        if (couponData) {
            console.log('chay vo day nữa nè');
            setQuantity(couponData?.data?.quantity || 0);
            setCode(couponData?.data?.code || '');
            setStatus(couponData?.data?.status || '');
            setDescription(couponData?.data?.description || '');
            setDiscount(couponData?.data?.discount || 0);
            setGetCurrentDate(couponData?.data?.startDate.slice(0, 10) || null);
            setGetEndDate(couponData?.data?.endDate || null);
        }
    }, [couponData]);

    if (isLoading) {
        return <LoadingAPI />;
    }

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
                showNotificationMessage(
                    'error',
                    'Date Validation Error',
                    'Start date must be less than end date.',
                );
                return;
            }

            if (status === 'active') {
                // split time into an array contain [day, time]
                // gate the first value --> date in yyyy-mm-dd
                const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

                if (getEndDate < currentDate) {
                    showNotificationMessage(
                        'error',
                        'Date Validation Error',
                        'End date must be today or later for active status.',
                    );
                    return;
                }
            }

            const updateCouponResponse = await couponAPI.updateCoupon(couponData?.data?._id, data);
            if (updateCouponResponse?.data.message.includes('duplicated code')) {
                showNotificationMessage(
                    'warning',
                    'Promotion Code exists',
                    'Code exists try to change another name!',
                );
            }
            if (updateCouponResponse.status === 200) {
                console.log('updateCouponResponse: ', updateCouponResponse);
                showNotificationMessage('success', 'Update coupon', 'Update  coupon successfully');

                navigate('/admin/manage-coupons/');
            }
        } else {
            showNotificationMessage(
                'warning',
                'Update coupon',
                'Please fill information of coupon!',
            );
        }

        dispatch(updateCoupon({ couponId: couponData?.data?._id, data: data }));
    };

    const handleNumberBlur = () => {
        if (quantity < 0 || discount < 0 || discount >= 100) {
            showNotificationMessage(
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
            showNotificationMessage(
                'error',
                'Date Validation Error',
                'Start date must be less than end date.',
            );
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
                        InputProps={{
                            style: { fontSize: '1.4rem', color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Code</AdminTypography>
                    <TextField
                        InputProps={{
                            style: { fontSize: '1.4rem', color: '#000' },
                        }}
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Discount</AdminTypography>
                    <TextField
                        InputProps={{
                            style: { fontSize: '1.4rem', color: '#000' },
                        }}
                        fullWidth
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        onBlur={handleNumberBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Quantity</AdminTypography>
                    <TextField
                        InputProps={{
                            style: { fontSize: '1.4rem', color: '#000' },
                        }}
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
                                        }}
                                    >
                                        {option}
                                    </AdminTypography>
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
                        // defaultValue={getCurrentDate?.slice(0, 10)} // Show only the date part
                        value={getCurrentDate?.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetCurrentDate(new Date(e.target.value).toISOString())} // Set to ISO format
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: '1.4rem' },
                        }}
                        sx={{
                            '.MuiInputBase-root ': {
                                fontSize: '14px',
                            },
                        }}
                        onBlur={handleDateBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon End</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        // defaultValue={getEndDate?.slice(0, 10)} // Show only the date part
                        value={getEndDate?.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetEndDate(new Date(e.target.value).toISOString())} // Set to ISO format
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: '1.4rem' },
                        }}
                        sx={{
                            '.MuiInputBase-root ': {
                                fontSize: '14px',
                            },
                        }}
                        onBlur={handleDateBlur}
                    />
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 4 }}>
                <AdminButtonDesign
                    title={'Edit Coupon'}
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
        </Box>
    );
}

export default AdminEditCoupon;
