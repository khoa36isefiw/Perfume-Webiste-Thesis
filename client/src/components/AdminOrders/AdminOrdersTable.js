import * as React from 'react';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import {
    AdminHeadingTypography,
    AdminTypography,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';
import ordersData from '../../data/admin/orders.json';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
    { id: 'orderId', label: 'Order ID', minWidth: 20 },

    { id: 'userName', label: 'Name', minWidth: 50 },
    {
        id: 'orderDate',
        label: 'Date',
        minWidth: 20,
        align: 'left',
        // format: (value) => `${value.street}, ${value.city}`,
    },
    { id: 'totalOrder', label: 'Total', minWidth: 40 },
    { id: 'address', label: 'Address', minWidth: 40 },
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(ordersData); // Dynamic user data
    const [searchTerm, setSearchTerm] = React.useState(''); // Search term state
    // tracks if data is already fetched
    const [isDataFetched, setIsDataFetched] = React.useState(false);

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
    };

    // Filter rows based on search term
    const filteredRows = rows.filter(
        (row) =>
            row?.userName.toLowerCase().includes(searchTerm) ||
            row?.orderPaid.toLowerCase().includes(searchTerm) ||
            row?.orderDate.toLowerCase().includes(searchTerm),
    );
    console.log('filteredRows: ', filteredRows);

    // Handle edit action (you can implement your own logic for editing)
    const handleViewOrder = (id) => {
        navigate(`view-order/${id}`, {
            state: { orderData: rows.find((row) => row.orderId === id) },
        });
    };

    // Handle navigation to the "Add User" page
    const handleAddUser = () => {
        navigate('/admin/manage-users/add-user');
    };

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
                    onClick={handleAddUser}
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                                                                        Edit Orders?
                                                                    </CustomizeTypography>
                                                                }
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleViewOrder(row.orderId)
                                                                    }
                                                                    color="primary"
                                                                >
                                                                    <EditIcon
                                                                        sx={{ fontSize: '22px' }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
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
                                                                        handleViewOrder(row.orderId)
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
                                                        value === 'COD' ? (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#bdf5d3',
                                                                    borderRadius: 2,
                                                                    boxShadow: 1,
                                                                    padding: '4px 0',
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
                                                                    {value}
                                                                </Typography>
                                                            </Box>
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: '#c1e1fc',
                                                                    borderRadius: 2,
                                                                    boxShadow: 1,
                                                                    padding: '4px 0',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        color: '#2262d3',
                                                                        fontWeight: 'bold',
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {value}
                                                                </Typography>
                                                            </Box>
                                                        )
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
