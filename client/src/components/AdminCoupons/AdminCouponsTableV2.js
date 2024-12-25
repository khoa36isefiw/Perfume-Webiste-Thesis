import React, { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { formatDate } from '../FormatDate/formatDate';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import {
    AdminHeadingTypography,
    AdminTypography,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import ActionsButton from '../AdminDashboard/ActionsButton';
import { mobileScreen, theme } from '../../Theme/Theme';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import useCoupons from '../../api/useCoupons';
import useDeleteItem from '../../hooks/useDeleteItem';
import { couponAPI } from '../../api/couponAPI';

import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

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

const CouponsTable = () => {
    const navigate = useNavigate();

    const couponData = useSelector((state) => state.couponsManagement.listCoupons);
    console.log('Data receving....: ', couponData);
    const { data: couponsData, mutate } = useCoupons();

    const [filterCoupons, setFilterCoupons] = useState('All Coupons');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    const {
        showNotification,
        messageType,
        messageTitle,
        messageContent,
        openConfirmMessage,
        showAnimation,

        handleCloseNotification,
        handleConfirmDisagree,
        handleConfirmAgree,
        handleDeleteItem,
    } = useDeleteItem(couponAPI.deleteCoupon, mutate, 'promotions');
    // const listCoupons = useSelector((state) => state.couponsManagement.listCoupons);
    const [listCoupons, setListCoupons] = useState([]);

    // get data
    if (couponsData?.data && listCoupons !== couponsData?.data) {
        setListCoupons(couponsData?.data);
    }

    const filters = ['All Coupons', 'active', 'inactive', 'expired'];
    const filterListCoupons =
        filterCoupons !== 'All Coupons'
            ? listCoupons?.filter((list) => list.status === filterCoupons)
            : listCoupons;

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
    const filteredRows = filterListCoupons.filter(
        (row) =>
            (row.status !== 'inactive' &&
                row?.code?.toLowerCase().includes(searchTerm?.toLocaleLowerCase())) ||
            row?.description?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
            row?.discount === +searchTerm ||
            row?.status?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()),
    );

    console.log('filteredRows: ', filteredRows);

    const handleFilterCoupons = (filter) => {
        setFilterCoupons(filter);
        // setCurrentPage(1);
    };

    const handleEdit = (couponId) => {
        console.log('couponId: ', couponId);
        navigate(`edit/${couponId}`, {
            state: {
                couponData: listCoupons?.find((coupon) => coupon._id === couponId),
            },
        });
    };

    // // delete coupon feature
    // // open the confirm dialog message and save the products are removed
    // const handleDeleteCoupon = (couponId) => {
    //     // for showing confirm message dialog
    //     setOpenConfirmMessage(true); // open
    //     setCouponToRemove({ codeId: couponId }); // store coupon information is removed
    // };

    // // disagree, not delete the coupón
    // const handlleDisagree = () => {
    //     // click disagree button actions
    //     setOpenConfirmMessage(false); // don't want to remove, hide the delete confirm message
    //     setCouponToRemove(null);
    // };

    // // agree, delete the coupon
    // const handleConfirmAgree = () => {
    //     // click agree button actions
    //     if (couponToRemove) {
    //         dispatch(deleteCoupon({ codeId: couponToRemove.codeId }));
    //     }
    //     setShowNotification(true);
    //     setShowAnimation('animate__bounceInRight');
    //     setOpenConfirmMessage(false);
    //     setCouponToRemove(null);
    // };

    // // handle Close notification
    // const handleCloseNotification = () => {
    //     setShowAnimation('animate__fadeOut');
    //     setTimeout(() => {
    //         setShowNotification(false);
    //     }, 1000);
    // };

    const exportToExcel = () => {
        // create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetData = filterListCoupons.map((cp, index) => ({
            // define column name and get data
            No: index + 1,
            ID: cp._id,
            Code: cp.code,
            Description: cp.description,
            Quantity: cp.quantity,
            Status: cp.status,
            'Start Date': cp.startDate,
            'End Date': cp.endDate,
        }));

        // convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Coupons Table.xlsx');
    };

    return (
        <Box
            sx={{
                padding: 2,
                [mobileScreen]: {
                    padding: 0,
                },
            }}
        >
            <Box sx={{ padding: 2 }}>
                <AdminHeadingTypography>List Coupons</AdminHeadingTypography>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
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
                        onClick={() => navigate('/admin/manage-coupons/add')}
                    >
                        Add Coupon
                    </Button>
                </Box>
                <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                    You can <strong>Search coupons</strong> by Code, Status, or Description.
                </AdminTypography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    fullWidth
                    placeholder="Search coupon information"
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                    onChange={handleSearch}
                    value={searchTerm}
                    // modified input styles for textfield
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),

                        style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                    }}
                />
            </Box>
            <Box>
                {filters?.map((filter, index) => (
                    <Button
                        onClick={() => handleFilterCoupons(filter)}
                        key={index}
                        variant={filterCoupons === filter ? 'contained' : 'outlined'}
                        sx={{
                            margin: 0.5,
                            fontSize: '14px',

                            mb: 2,
                            borderRadius: 5,
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                        }}
                    >
                        {filter}
                    </Button>
                ))}
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
                            {filteredRows.length > 0 ? (
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
                                                            fontSize: '14px',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                        {column.id === 'actions' ? (
                                                            // Render Edit and Delete buttons in the 'actions' column
                                                            <>
                                                                <ActionsButton
                                                                    onHandleClickEdit={() =>
                                                                        handleEdit(row._id)
                                                                    }
                                                                    onHandleClickDelete={() =>
                                                                        handleDeleteItem(row._id)
                                                                    }
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
                                                                <Typography sx={{ fontSize: 14 }}>
                                                                    {formatDate(row.startDate)}
                                                                </Typography>
                                                            </>
                                                        ) : column.id === 'endDate' ? (
                                                            <Typography sx={{ fontSize: 14 }}>
                                                                {formatDate(row.endDate)}
                                                            </Typography>
                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))
                            ) : (
                                <></>
                            )}
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
                onHandleClickClose={handleConfirmDisagree}
                onHandleConfirmAgree={handleConfirmAgree}
                onHandleConfirmDisagree={handleConfirmDisagree}
            />
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
};

export default CouponsTable;
