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
    useMediaQuery,
} from '@mui/material';
import AdminButtonBackPage from '../AdminButtonBackPage/AdminButtonBackPage';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { createNewCoupon } from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';

import { useNavigate } from 'react-router-dom';
import { couponAPI } from '../../api/couponAPI';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

const AdminCreateCoupon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showNotificationMessage } = useSnackbarMessage();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // get the current date time follow yyyy-mm-dd format
    // let currentDate = new Date().toLocaleString('en-CA').slice(0, 10);

    const [quantity, setQuantity] = useState('');
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState('');
    const [getCurrentDate, setGetCurrentDate] = useState(new Date().toISOString()); // format: 2024-11-14T00:00:00.000Z
    const [getEndDate, setGetEndDate] = useState(new Date().toISOString());
    const [disabledButton, setDisabledButton] = useState(false);

    console.log('getCurrentDate: ', getCurrentDate);

    console.log('status: ', status);
    // item for menu
    const statusOptions = ['active', 'inactive', 'expired'];

    // Handle form submission
    const handleCreateNewCoupon = async () => {
        const data = {
            nameVn: code,
            nameEn: code,
            code: code,
            quantity: quantity,
            description: description,
            discount: +discount,
            status: status,
            startDate: getCurrentDate,
            endDate: getEndDate,
        };

        // start date is less than end date
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
            const newCouponResponse = await couponAPI.createCoupon(data);
            dispatch(createNewCoupon({ data: data }));
            if (newCouponResponse?.data.message.includes('code already exists')) {
                showNotificationMessage(
                    'warning',
                    'Create new coupon',
                    'Code exists, please try another code!',
                );
            }
            if (newCouponResponse.status === 201) {
                console.log('newCouponResponse: ', newCouponResponse);
                showNotificationMessage(
                    'success',
                    'Create new coupon',
                    'Create new coupon successfully',
                );
                navigate('/admin/manage-coupons');
            }
        } else {
            showNotificationMessage(
                'warning',
                'Create new coupon',
                'Please fill information of coupon!',
            );
        }
    };

    const handlePriceSaleBlur = () => {
        if (quantity < 0 || discount < 0 || discount >= 100) {
            showNotificationMessage(
                'error',
                'Create Promotions',
                discount > 100
                    ? 'Number must be greater than 0!'
                    : 'Discount number must be less or equal than 100!',
            );
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    };

    return (
        <Box
            sx={{
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
                Create New Coupon
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
                        type="number"
                        onBlur={handlePriceSaleBlur}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Quantity</AdminTypography>
                    <TextField
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        onBlur={handlePriceSaleBlur}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
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
                                                option === 'active'
                                                    ? '#bdf5d3'
                                                    : option === 'inactive'
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

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon Open</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        // defaultValue={getCurrentDate}
                        // onChange={(e) => setGetCurrentDate(e.target.value)}
                        defaultValue={getCurrentDate.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetCurrentDate(new Date(e.target.value).toISOString())} // Set to ISO format
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <AdminTypography>Coupon End</AdminTypography>
                    <TextField
                        id="date"
                        type="date"
                        fullWidth
                        defaultValue={getEndDate.slice(0, 10)} // Show only the date part
                        onChange={(e) => setGetEndDate(new Date(e.target.value).toISOString())} // Set to ISO format
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
                    disabled={disabledButton}
                />

                <AdminButtonDesign
                    title={'Cancel'}
                    // bgcolor={theme.palette.admin.bgColor}
                    type={'outlined'}
                    textColor={theme.palette.admin.bgColor}
                    borderColor={theme.palette.admin.bgColor}
                />
            </Box>
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
    disabled,
}) => {
    return (
        <Button
            variant={type}
            onClick={onHandleClick}
            disabled={disabled}
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
