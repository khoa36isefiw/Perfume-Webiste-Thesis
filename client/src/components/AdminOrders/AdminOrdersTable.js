import React, { useState, useEffect } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { blue } from '@mui/material/colors';
import {
    AdminHeadingTypography,
    AdminTypography,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { mobileScreen, theme } from '../../Theme/Theme';
import ordersData from '../../data/admin/orders.json';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useOrders from '../../api/useOrders';
import { userAPI } from '../../api/userAPI';
import { formatDate } from '../FormatDate/formatDate';
import { useRef } from 'react';
import { clearAllListeners } from '@reduxjs/toolkit';
import useOrdersWithUserData from '../../api/useUsersByIds';
import useUserById from '../../api/useUserById';
import useUsersByIds from '../../api/useUsersByIds';
import { converToVND } from '../convertToVND/convertToVND';
import usePayments from '../../api/usePayments';

const columns = [
    { id: '_id', label: 'Order ID', minWidth: 20 },

    { id: 'userName', label: 'Name', minWidth: 50 },
    {
        id: 'createdAt',
        label: 'Date',
        minWidth: 20,
        align: 'left',
        // format: (value) => `${value.street}, ${value.city}`,
    },
    { id: 'totalPrice', label: 'Total', minWidth: 40 },
    { id: 'userAddress', label: 'Address', minWidth: 40 },
    {
        id: 'orderPaid',
        label: 'Pay',
        minWidth: 70,
        align: 'left',
    },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }, // New column for actions
];

// Component to render the table with dynamic data
export default function AdminOrdersTable() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const { data: ordersData, isLoading } = useOrders();

    // return userIds list from ordersData
    const userIds = ordersData?.data?.map((order) => order?.user) || [];
    // Sử dụng useUsersByIds để lấy thông tin người dùng cho từng userId
    const { usersData, isLoading: usersLoading, isError: usersError } = useUsersByIds(userIds);
    useEffect(() => {
        if (ordersData?.data && usersData) {
            const ordersWithUserData = ordersData?.data?.map((order) => {
                // user information field to ordersData
                const user = usersData?.find((userData) => userData._id === order.user);
                return {
                    ...order,
                    userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
                    userImage: user?.imagePath,
                    userEmail: user?.email,
                    userAddress: user?.address,
                    userPhone: user?.phoneNumber,
                };
            });
            setRows(ordersWithUserData);
        }
    }, [ordersData?.data, usersData]);

    // Handle page change for pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setPage(0); // Reset page to 0 when search term changes
    };

    // Filter rows based on search term
    const filteredRows = rows.filter(
        (row) =>
            row?.userName?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.orderPaid?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.orderDate?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()),
    );

    // Handle edit action (you can implement your own logic for editing)
    const handleViewOrder = (id) => {
        navigate(`view-order/${id}`, {
            state: { orderData: rows.find((row) => row._id === id) },
        });
    };

    if (isLoading || usersLoading) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                p: 2,
                [mobileScreen]: {
                    padding: 0,
                },
            }}
        >
            {/* Search Bar */}
            <Box
                sx={{
                    [mobileScreen]: {
                        padding: 2,
                    },
                }}
            >
                <AdminHeadingTypography sx={{ mb: 2 }}>List Orders</AdminHeadingTypography>
                <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                    We can <strong>Search</strong> Name
                </AdminTypography>
                <Button
                    variant="text"
                    color="primary"
                    sx={{
                        marginBottom: 2,
                        padding: '10px 0',
                        borderRadius: 3,
                        textTransform: 'initial',
                        fontSize: '14px',
                    }}
                    startIcon={<FileDownloadIcon />}
                >
                    Export
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    placeholder="Search by Name or Email"
                    variant="outlined"
                    sx={{
                        marginBottom: 2,
                        width: 750,
                        '.MuiInputBase-root': {
                            fontSize: '14px',
                            height: '50px',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.admin.bgColor,
                            },
                        },
                    }}
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
            </Box>
            <Box sx={{ borderRadius: 1, bgcolor: '#fff', border: '1px solid #ccc' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{
                                            bgcolor: blue[200],
                                            fontSize: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.orderId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{ fontSize: '13px', textAlign: 'center' }}
                                                >
                                                    {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                    {column.id === 'actions' ? (
                                                        // Render Edit and Delete buttons in the 'actions' column
                                                        <>
                                                            <Tooltip
                                                                title={
                                                                    <CustomizeTypography
                                                                        sx={{
                                                                            fontSize: '13px',
                                                                            mb: 0,
                                                                        }}
                                                                    >
                                                                        View Order Details
                                                                    </CustomizeTypography>
                                                                }
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleViewOrder(row._id)
                                                                    }
                                                                    sx={{
                                                                        bgcolor: '#fbe5ff',
                                                                        borderRadius: '10px',
                                                                        boxShadow: 2,
                                                                        '&:hover': {
                                                                            bgcolor: '#fbe5ff',
                                                                        },
                                                                        mr: 1,
                                                                    }}
                                                                >
                                                                    <VisibilityIcon
                                                                        sx={{
                                                                            color: '#be0ee1',
                                                                            fontSize: '16px',
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    ) : column.id === 'orderPaid' ? (
                                                        // if value === COD return it value is designed
                                                        row.paymentMethod === 'COD' ? (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#bdf5d3',
                                                                    borderRadius: 2,
                                                                    boxShadow: 1,
                                                                    padding: '4px 8px',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        color: '#187d44',
                                                                        fontWeight: 'bold',
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {row.paymentMethod}
                                                                </Typography>
                                                            </Box>
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#c1e1fc',
                                                                    borderRadius: 2,
                                                                    boxShadow: 1,
                                                                    padding: '4px 8px',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '13px',
                                                                        color: '#2262d3',
                                                                        fontWeight: 'bold',
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {row.paymentMethod}
                                                                </Typography>
                                                            </Box>
                                                        )
                                                    ) : column.id === 'createdAt' ? (
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            {formatDate(row.createdAt)}
                                                        </Typography>
                                                    ) : column.id === 'totalPrice' ? (
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            {converToVND(row?.totalPrice)}
                                                        </Typography>
                                                    ) : column.format &&
                                                      typeof value === 'object' ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        '.MuiTablePagination-selectLabel': {
                            fontSize: '13px',
                        },
                        '.MuiTablePagination-select': {
                            fontSize: '13px',
                            mt: 1,
                        },
                        '.MuiTablePagination-displayedRows': {
                            fontSize: '13px',
                        },

                        // '.MuiSvgIcon-root': { fontSize: '14px' },
                        '.MuiSelect-icon': {
                            fontSize: '24px',
                        },

                        // next and previous button
                        '.MuiSvgIcon-root': {
                            fontSize: '24px',
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
