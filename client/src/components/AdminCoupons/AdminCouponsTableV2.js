import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { AdminTypography, CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ActionsButton from '../Dashboard/ActionsButton';
import { theme } from '../../Theme/Theme';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SellIcon from '@mui/icons-material/Sell';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon } from '../../redux/feature/adminCouponsManagement/adminCouponsManagementSlice';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import EmptyCart from '../EmptyCart/EmptyCart';

const itemsPerPage = 5;

const CouponsTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCoupons, setFilterCoupons] = useState('All Coupons');
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [couponToRemove, setCouponToRemove] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const listCoupons = useSelector((state) => state.couponsManagement.listCoupons);
    console.log('listCoupons: ', listCoupons);

    const filters = ['All Coupons', 'Active', 'Unactive', 'Expired'];
    const filterListCoupons =
        filterCoupons !== 'All Coupons'
            ? listCoupons?.filter((list) => list.status === filterCoupons)
            : listCoupons;
    const filteredSearchCoupons = filterListCoupons?.filter(
        (row) =>
            row.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Tính toán dữ liệu hiển thị cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage; // 5
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 0
    const currentItems = filteredSearchCoupons.slice(indexOfFirstItem, indexOfLastItem); // 0, 5 --> 5 items
    // Tính tổng số trang based on list coupons are filtered
    const totalPages = Math.ceil(filteredSearchCoupons.length / itemsPerPage); // làm tròn lên

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilterCoupons = (filter) => {
        setFilterCoupons(filter);
        setCurrentPage(1);
    };

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handleEdit = (couponId) => {
        console.log('couponId: ', couponId);
        navigate(`edit-coupon/${couponId}`, {
            state: {
                couponData: listCoupons.find((coupon) => coupon.id === couponId),
            },
        });
    };

    // delete coupon feature
    // open the confirm dialog message and save the products are removed
    const handleDeleteCoupon = (couponId) => {
        // for showing confirm message dialog
        setOpenConfirmMessage(true); // open
        setCouponToRemove({ codeId: couponId }); // store coupon information is removed
    };

    // disagree, not delete the coupón
    const handleConfirmDisagree = () => {
        // click disagree button actions
        setOpenConfirmMessage(false); // don't want to remove, hide the delete confirm message
        setCouponToRemove(null);
    };

    // agree, delete the coupon
    const handleConfirmAgree = () => {
        // click agree button actions
        if (couponToRemove) {
            dispatch(deleteCoupon({ codeId: couponToRemove.codeId }));
        }
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setOpenConfirmMessage(false);
        setCouponToRemove(null);
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    placeholder="Search by Name"
                    variant="outlined"
                    sx={{ marginBottom: 2, width: 750 }}
                    onChange={handleSearch}
                    value={searchTerm}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        marginBottom: 2,
                        padding: '10px 18px',
                        borderRadius: 3,
                        bgcolor: theme.palette.admin.bgColor,
                        textTransform: 'initial',
                        fontSize: '14px',
                        '&:hover': {
                            bgcolor: theme.palette.admin.bgColor,
                        },
                    }}
                    startIcon={<MoneyOffIcon />}
                    onClick={() => navigate('/admin/manage-coupons/create-new-coupon')}
                >
                    Add Coupon
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        marginBottom: 2,
                        padding: '10px 18px',
                        borderRadius: 3,
                        textTransform: 'initial',
                        fontSize: '14px',
                    }}
                    startIcon={<FileDownloadIcon />}
                >
                    Export
                </Button>
            </Box>
            <Box>
                {filters.map((filter, index) => (
                    <Button
                        onClick={() => handleFilterCoupons(filter)}
                        key={index}
                        variant={filterCoupons === filter ? 'contained' : 'outlined'}
                        sx={{
                            margin: 0.5,
                            fontSize: '14px',
                            textTransform: 'initial',
                            mb: 2,
                            borderRadius: 5,

                            fontWeight: 'bold',
                        }}
                    >
                        {filter}
                    </Button>
                ))}
            </Box>

            <Box
                sx={{
                    margin: 'auto',

                    bgcolor: '#fff',
                    borderRadius: 2,
                    height: '520px',
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: blue[200],
                        // paddingBottom: 2,
                        padding: 2,
                        borderBottom: '2px solid #ddd',
                    }}
                >
                    <AdminTypography sx={{ fontSize: '16px', flex: 2, fontWeight: 'bold' }}>
                        Coupon Code
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Discount
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Quantity
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Usage
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Start Date
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Valid Till
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Status
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: '16px', flex: 1, fontWeight: 'bold' }}>
                        Actions
                    </AdminTypography>
                </Box>
                {currentItems.length > 0 ? (
                    <React.Fragment>
                        {currentItems.map((coupon) => (
                            <Box
                                key={coupon.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                    padding: 2,
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
                                    <Box
                                        sx={{
                                            bgcolor: blue[700],
                                            padding: '10px',
                                            borderRadius: 1,
                                            mr: 1,
                                        }}
                                    >
                                        <SellIcon
                                            sx={{
                                                fontSize: '24px',
                                                color: '#fff',
                                                transform: 'rotate(90deg)',
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <AdminTypography sx={{ flex: 1 }}>
                                            {coupon.description}
                                        </AdminTypography>
                                        <AdminTypography sx={{ flex: 1, mt: '4px' }}>
                                            {coupon.code}
                                        </AdminTypography>
                                    </Box>
                                </Box>
                                <AdminTypography sx={{ flex: 1 }}>
                                    {coupon.discount}
                                </AdminTypography>
                                <AdminTypography sx={{ flex: 1 }}>
                                    {coupon.quantity}
                                </AdminTypography>
                                <AdminTypography sx={{ flex: 1 }}>{coupon.used}</AdminTypography>
                                <AdminTypography sx={{ flex: 1 }}>
                                    {coupon.getCurrentDate}
                                </AdminTypography>
                                <AdminTypography sx={{ flex: 1 }}>
                                    {coupon.getEndDate}
                                </AdminTypography>
                                <Box sx={{ flex: 1 }}>
                                    {coupon.status === 'Active' ? (
                                        <Box
                                            sx={{
                                                bgcolor: '#bdf5d3',

                                                borderRadius: 2,
                                                boxShadow: 1,
                                                padding: '4px 0',
                                                width: 80,
                                            }}
                                        >
                                            <AdminTypography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#187d44',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {coupon.status}
                                            </AdminTypography>
                                        </Box>
                                    ) : coupon.status === 'Unactive' ? (
                                        <Box
                                            sx={{
                                                bgcolor: '#ffdfe4',
                                                borderRadius: 2,
                                                boxShadow: 1,
                                                padding: '4px 0',
                                                width: 80,
                                            }}
                                        >
                                            <AdminTypography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#f11133',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {coupon.status}
                                            </AdminTypography>
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                bgcolor: grey[200],

                                                borderRadius: 2,
                                                boxShadow: 1,
                                                padding: '4px 0',
                                                width: 80,
                                            }}
                                        >
                                            <AdminTypography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: grey[600],
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {coupon.status}
                                            </AdminTypography>
                                        </Box>
                                    )}
                                </Box>
                                <ActionsButton
                                    onHandleClickEdit={() => handleEdit(coupon.id)}
                                    onHandleClickDelete={() => handleDeleteCoupon(coupon.id)}
                                />
                            </Box>
                        ))}
                    </React.Fragment>
                ) : (
                    <EmptyCart
                        imgCart={
                            'https://cdn.shopify.com/s/files/1/0774/6430/6008/t/1/assets/posterbase.com%20cart%20empty.png?v=1693066146'
                        }
                        title="Empty Table"
                        subTitle="Looks like you have not added anything to your table."
                        isShowButton={false}
                        height={'256px'}
                        width={'350px'}
                        spacing={'0px'}
                        imageSpacing={'40px'}
                        emptyCartHeight={'420px'}
                    />
                )}
            </Box>

            <Box
                sx={{
                    display: currentItems.length > 0 ? 'flex' : 'none',
                    justifyContent: 'center',
                    marginTop: 2,
                }}
            >
                <IconButton onClick={handlePrevious} disabled={currentPage === 1}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                {Array.from({ length: totalPages }, (_, index) => (
                    // _ is not used
                    <Box>
                        <Button
                            key={index + 1}
                            onClick={() => handlePageClick(index + 1)}
                            variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                            sx={{ margin: 0.5 }}
                        >
                            {index + 1}
                        </Button>
                    </Box>
                ))}
                {/* disabled if the current index is the last page */}
                <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* Open Confirm Message */}
            <ConfirmMessage
                openConfirmMessage={openConfirmMessage}
                msgTitle={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WarningIcon
                            sx={{
                                color: theme.icon.color.primary,
                                fontSize: theme.icon.size.desktop,
                            }}
                        />
                        <CustomizeTypography
                            sx={{
                                color: theme.palette.text.main,
                                fontSize: '18px',
                                mb: 0,
                                ml: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Delete Products
                        </CustomizeTypography>
                    </Box>
                }
                msgContent={
                    <Typography sx={{ fontSize: '16px' }}>
                        Are you sure you want to delete this product?
                    </Typography>
                }
                onHandleClickClose={() => setOpenConfirmMessage(false)}
                onHandleConfirmAgree={handleConfirmAgree}
                onHandleConfirmDisagree={handleConfirmDisagree}
            />
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={'success'}
                        msgTitle={'Delete Products'}
                        msgContent={'Products are removed successfully from cart!'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Box>
    );
};

export default CouponsTable;
