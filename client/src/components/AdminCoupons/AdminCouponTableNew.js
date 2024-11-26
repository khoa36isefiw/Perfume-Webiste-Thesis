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

import { blue, grey } from '@mui/material/colors';
import {
    AdminHeadingTypography,
    AdminTypography,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { formatDate } from '../FormatDate/formatDate';

import { converToVND } from '../convertToVND/convertToVND';

import useCoupons from '../../api/useCoupons';
import ActionsButton from '../Dashboard/ActionsButton';

const columns = [
    { id: 'code', label: 'Coupon Code', minWidth: 20 },
    { id: 'description', label: 'Coupon Description', minWidth: 20 },

    { id: 'discount', label: 'Discount', minWidth: 50 },
    {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 20,
    },
    { id: 'startDate', label: 'Start Date', minWidth: 40 },
    { id: 'endDate', label: 'Valid Till', minWidth: 40 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 70,
        align: 'left',
    },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }, // New column for actions
];

// Component to render the table with dynamic data
export default function AdminCouponTableNew() {
    const navigate = useNavigate();
    const { data: couponsData, mutate, isLoading } = useCoupons();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(couponsData?.data || []); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    console.log('rows: ', rows);
    console.log('couponsData: ', couponsData?.data);

    // Sử dụng useUsersByIds để lấy thông tin người dùng cho từng userId

    useEffect(() => {
        if (couponsData?.data && couponsData) {
            setRows(couponsData?.data);
        }
    }, [couponsData]);

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
            row?.code?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.description?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.discount === +searchTerm,
    );

    // Handle edit action (you can implement your own logic for editing)
    const handleViewOrder = (id) => {
        navigate(`view-order/${id}`, {
            state: { orderData: rows.find((row) => row._id === id) },
        });
    };

    const handleEdit = (couponId) => {
        console.log('couponId: ', couponId);
        navigate(`edit/${couponId}`, {
            state: {
                couponData: couponsData?.data?.find((coupon) => coupon._id === couponId),
            },
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <Box sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
            {/* Search Bar */}
            <AdminHeadingTypography sx={{ mb: 2 }}>List Orders</AdminHeadingTypography>
            <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                We can <strong>Search</strong> Name
            </AdminTypography>
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
                                                            <ActionsButton
                                                                onHandleClickEdit={() =>
                                                                    handleEdit(row._id)
                                                                }
                                                                onHandleClickDelete={''}
                                                            />
                                                        </>
                                                    ) : column.id === 'status' ? (
                                                        row.status === 'active' ? (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#bdf5d3',
                                                                    borderRadius: 1,
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
                                                                    {row.status}
                                                                </AdminTypography>
                                                            </Box>
                                                        ) : row.status === 'inactive' ? (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#ffdfe4',
                                                                    borderRadius: 1,
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
                                                                    {row.status}
                                                                </AdminTypography>
                                                            </Box>
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: grey[200],

                                                                    borderRadius: 1,
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
                                                                    {row.status}
                                                                </AdminTypography>
                                                            </Box>
                                                        )
                                                    ) : column.id === 'startDate' ? (
                                                        <>
                                                            <Typography sx={{ fontSize: 12 }}>
                                                                {formatDate(row.startDate)}
                                                            </Typography>
                                                        </>
                                                    ) : column.id === 'endDate' ? (
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            {formatDate(row.endDate)}
                                                        </Typography>
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
