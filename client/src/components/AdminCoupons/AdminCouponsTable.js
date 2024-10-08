import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import ActionsButton from '../Dashboard/ActionsButton';
import { theme } from '../../Theme/Theme';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';

import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SellIcon from '@mui/icons-material/Sell';
import { useSelector } from 'react-redux';

const couponsData = [
    {
        id: 1,
        description: 'Save 10%',
        code: 'SAVE10',
        discount: '10%',
        validTill: '2024-12-31',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 2,
        description: 'Sale 20%',
        code: 'OFF20',
        discount: '20%',
        validTill: '2024-11-15',
        startDate: '2024-08-22',
        status: 'Expired',
        quantity: 12,
        used: 4,
    },
    {
        id: 3,
        description: 'Summer sale 15%',
        code: 'SUMMER15',
        discount: '15%',
        validTill: '2024-07-31',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 4,
        description: 'Winter discount 25% off',
        code: 'WINTER25',
        discount: '25%',
        validTill: '2024-01-15',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 5,
        description: 'Spring discount 5% off',
        code: 'SPRING5',
        discount: '5%',
        validTill: '2024-04-20',
        startDate: '2024-08-22',
        status: 'Expired',
        quantity: 12,
        used: 4,
    },
    {
        id: 6,
        description: 'Holiday discount 30% off ',
        code: 'HOLIDAY30',
        discount: '30%',
        validTill: '2024-12-01',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 7,
        description: 'Black Friday sale 40%',
        code: 'BLACKFRIDAY40',
        discount: '40%',
        validTill: '2024-11-25',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 8,
        description: "Viet Nam New Year's Day sale 50%",
        code: 'NEWYEAR50',
        discount: '50%',
        validTill: '2024-01-01',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 9,
        description: 'Flash sale discount 15% off',
        code: 'FALLSALE15',
        discount: '15%',
        validTill: '2024-10-15',
        startDate: '2024-08-22',
        status: 'Expired',
        quantity: 12,
        used: 4,
    },
    {
        id: 10,
        description: 'Summer sale 20% off ',
        code: 'SUMMERSALE20',
        discount: '20%',
        validTill: '2024-08-20',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
    {
        id: 11,
        description: "Viet Nam's Independent 30/04/1975",
        code: 'VietNam30041975',
        discount: '30.4%',
        validTill: '2024-04-30',
        startDate: '2024-08-22',
        status: 'Active',
        quantity: 12,
        used: 4,
    },
];

const itemsPerPage = 5;

const CouponsTable = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCoupons, setFilterCoupons] = useState('All Coupons');
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    const listCoupons = useSelector((state) => state.couponsManagement.listCoupons);
    console.log('listCoupons: ', listCoupons);

    const filters = ['All Coupons', 'Active', 'Expired'];
    const filterListCoupons =
        filterCoupons !== 'All Coupons'
            ? couponsData.filter((list) => list.status === filterCoupons)
            : couponsData;
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

    console.log('filterListCoupons: ', filteredSearchCoupons);
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
                            // bgcolor:
                            //     // filterCoupons === 'Active' &&
                            //     index == 1
                            //         ? '#bdf5d3'
                            //         : // filterCoupons === 'Expired' &&
                            //         index == 2
                            //         ? grey[200]
                            //         : blue[200],
                            // // bgcolor: '#bdf5d3',
                            // color:
                            //     filterCoupons === 'Active' && index == 1
                            //         ? '#187d44'
                            //         : filterCoupons === 'Expired' && index == 2
                            //         ? grey[600]
                            //         : blue[600],
                            // '&:hover': {
                            //     bgcolor: 'transparent',
                            // },
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
                        <AdminTypography sx={{ flex: 1 }}>{coupon.discount}</AdminTypography>
                        <AdminTypography sx={{ flex: 1 }}>{coupon.quantity}</AdminTypography>
                        <AdminTypography sx={{ flex: 1 }}>{coupon.used}</AdminTypography>
                        <AdminTypography sx={{ flex: 1 }}>{coupon.validTill}</AdminTypography>
                        <AdminTypography sx={{ flex: 1 }}>{coupon.startDate}</AdminTypography>
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
                        <ActionsButton />
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
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
        </Box>
    );
};

export default CouponsTable;
