import React, { useState } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import useOrders from '../../api/useOrders';
import { formatDate } from '../FormatDate/formatDate';
import { converToVND } from '../convertToVND/convertToVND';
// import CancelIcon from '@mui/icons-material/Cancel';
import * as XLSX from 'xlsx';

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
    { id: 'orderStatus', label: 'Status', minWidth: 40 },
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

    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const { data: ordersData, isLoading } = useOrders();
    const [rows, setRows] = useState([]); // Dynamic user data

    if (ordersData?.data && rows !== ordersData?.data) {
        setRows(ordersData?.data);
    }

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
            row?.user.firstName?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.user.lastName?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.paymentMethod?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.orderDate?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.status?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()),
    );

    console.log('filteredRows: ', filteredRows);

    // Handle edit action (you can implement your own logic for editing)
    const handleViewOrder = (id) => {
        navigate(`view-order/${id}`, {
            state: { orderData: rows.find((row) => row._id === id) },
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    console.log('order: ', rows);

    // export to excel
    const exportToExcel = () => {
        // create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const worksheetData = rows.map((order, index) => ({
            // define column name and get data
            No: index + 1,
            ID: order._id,
            Name: order.user.firstName + '' + order.user.lastName,
            Total: order.totalPrice,
            Address: order.address,
            Date: formatDate(order.createdAt),
        }));

        // convert JSON data to worksheetp
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Orders Table.xlsx');
    };

    // cancel
    // const handleCancelOrder = async (orderId) => {
    //     const orderResponse = await ordersAPI.cancelOrder(orderId);
    //     if (orderResponse.status === 200) {
    //         if (orderResponse.status === 200) {
    //             showNotificationMessage(
    //                 'success',
    //                 'Cancel Order',
    //                 'Order has been cancelled successfully!',
    //             );
    //             navigate('/admin/manage-orders');
    //         }
    //     }
    // };

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
                    onClick={exportToExcel}
                >
                    Export
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    placeholder="Search by Name or Email"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: 2,

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
                            {filteredRows.length > 0 &&
                                filteredRows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.orderId}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        sx={{
                                                            fontSize: '13px',
                                                            textAlign: 'center',
                                                        }}
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
                                                                {/* <Tooltip
                                                                    title={
                                                                        <CustomizeTypography
                                                                            sx={{
                                                                                fontSize: '13px',
                                                                                mb: 0,
                                                                            }}
                                                                        >
                                                                            Cancel Order
                                                                        </CustomizeTypography>
                                                                    }
                                                                >
                                                                    <IconButton
                                                                        sx={{
                                                                            bgcolor: '#ffdfe4',

                                                                            borderRadius: '10px',
                                                                            '&:hover': {
                                                                                bgcolor: '#ffdfe4',
                                                                            },
                                                                        }}
                                                                        onClick={() =>
                                                                            handleCancelOrder(
                                                                                row._id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <CancelIcon
                                                                            sx={{
                                                                                color: '#f11133',
                                                                                fontSize: '16px',
                                                                            }}
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip> */}
                                                            </>
                                                        ) : column.id === 'userName' ? (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '14px',
                                                                    color: '#187d44',
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {row.user.firstName +
                                                                    ' ' +
                                                                    row.user.lastName}
                                                            </Typography>
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
                                                            ) : row.paymentMethod === 'VNPAY' ? (
                                                                <Box
                                                                    sx={{
                                                                        bgcolor: '#f5f5f5',
                                                                        borderRadius: 2,
                                                                        boxShadow: 1,
                                                                        padding: '4px 8px',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '13px',
                                                                            color: '#005baa',
                                                                            fontWeight: 'bold',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                color: '#8c131a',
                                                                            }}
                                                                        >
                                                                            VN
                                                                        </span>
                                                                        PAY
                                                                    </Typography>
                                                                </Box>
                                                            ) : row.paymentMethod === 'PAYPAL' ? (
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
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        bgcolor: '#ffdfe4',
                                                                        borderRadius: 2,
                                                                        boxShadow: 1,
                                                                        padding: '4px 8px',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '13px',
                                                                            color: '#f11133',
                                                                            fontWeight: 'bold',
                                                                            textAlign: 'center',
                                                                        }}
                                                                    >
                                                                        Failed
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
                                                        ) : column.id === 'orderStatus' ? (
                                                            <Typography
                                                                sx={{
                                                                    flex: 1,
                                                                    width: '100%',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px',
                                                                    textAlign: 'center',
                                                                    bgcolor:
                                                                        row?.status === 'PAID'
                                                                            ? '#ddfbe9'
                                                                            : row?.status ===
                                                                              'PENDING_PAYMENT'
                                                                            ? '#f0ed1f87'
                                                                            : '#ffdfe4',
                                                                    color:
                                                                        row?.status === 'PAID'
                                                                            ? '#187d44'
                                                                            : row?.status ===
                                                                              'PENDING_PAYMENT'
                                                                            ? '#858424f2'
                                                                            : '#f11133',
                                                                    borderRadius: 2,
                                                                    padding: '4px',
                                                                    [mobileScreen]: {
                                                                        fontSize: '13px',
                                                                        padding: '2px 0',
                                                                    },
                                                                }}
                                                            >
                                                                {row?.status === 'PAID'
                                                                    ? 'Paid'
                                                                    : row?.status ===
                                                                      'PENDING_PAYMENT'
                                                                    ? 'Pending'
                                                                    : 'Cancelled'}
                                                            </Typography>
                                                        ) : // <Typography>{row?.status}</Typography>
                                                        column.format &&
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
