import React, { useState, useEffect } from 'react';

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

import DeleteIcon from '@mui/icons-material/Delete';
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
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import WarningIcon from '@mui/icons-material/Warning';
import useUsers from '../../api/useUsers';
import { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';
import { columns } from './userColumn';
import { userAPI } from '../../api/userAPI';
import * as XLSX from 'xlsx';

// Component to render the table with dynamic data
export default function UserTable() {
    const navigate = useNavigate();
    const { data: users, mutate, isLoading, error } = useUsers();

    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    // confirm delete
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [userToRemove, setUserToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    // message
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    if (users?.data && rows !== users?.data) {
        setRows(users?.data);
    }

    // // Fetch the data from an API

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
        setSearchTerm(event.target.value?.toLowerCase());
    };

    // Filter rows based on search term
    const filteredRows =
        rows?.filter(
            (row) =>
                row?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                row?.lastName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                row?.address?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                row?.email?.toLowerCase().includes(searchTerm?.toLowerCase()),
        ) || [];

    // Handle delete action (with API interaction)
    const handleDelete = (userID) => {
        // if want to delete a user
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the user information data
        console.log('userID?: ', userID);
        setUserToRemove({ userId: userID });
    };

    // confirm message is opened
    // disagree, not delete the user
    const handleConfirmDisagree = () => {
        // click disagree button actions
        setOpenConfirmMessage(false); // don't want to remove, hide the delete confirm message
        setUserToRemove(null);
    };

    // agree, delete the coupon
    const handleConfirmAgree = async () => {
        // click agree button actions
        if (userToRemove) {
            try {
                const response = await userAPI.deleteUserById(userToRemove.userId);
                if (response) {
                    // Remove the user from the state
                    setRows((prevRows) => prevRows.filter((row) => row.id !== userToRemove.userId));
                    mutate();
                    setShowNotification(true);
                    setShowAnimation('animate__bounceInRight');
                    setMessageType('success');
                    setMessageContent('Delete user successfully!');
                    setMessageTitle('Delete user');
                    setUserToRemove(null);
                }
            } catch (error) {
                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
                setMessageTitle('Delete user');
                setMessageType('error');
                setMessageContent('Delete user failed!');
            }
        }
        setOpenConfirmMessage(false);
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    console.log('filteredRows: ', filteredRows);
    const exportToExcel = () => {
        // create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetData = rows.map((row, index) => ({
            // define column name and get data
            No: index + 1,
            ID: row._id,
            Avatar: row.imagePath,
            'First Name': row.firstName,
            'Last Name': row.lastName,
            Email: row.email,
            Address: row.address,
            'Phone Number': row.phoneNumber,
        }));

        // convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Users Table.xlsx');
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <ModalDesginV2
                    open={open}
                    onHandleClose={handleClose}
                    animateStyle={animateStyle}
                    setAnimateStyle={setAnimateStyle}
                >
                    <Loading />
                </ModalDesginV2>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        p: 2,
                        [mobileScreen]: {
                            p: 0,
                        },
                    }}
                >
                    {/* Search Bar */}
                    <Box
                        sx={{
                            [mobileScreen]: {
                                p: 2,
                            },
                        }}
                    >
                        <AdminHeadingTypography sx={{ mb: 2 }}>List Users</AdminHeadingTypography>
                        <Button
                            onClick={exportToExcel}
                            variant="text"
                            color="primary"
                            sx={{
                                marginBottom: 2,
                                padding: '10px 0',
                                borderRadius: 3,
                                textTransform: 'initial',
                                fontSize: '14px',
                            }}
                            // onClick={}
                            startIcon={<FileDownloadIcon />}
                        >
                            Export
                        </Button>
                        <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                            We can <strong>Search</strong> by Name or Email
                        </AdminTypography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
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
                                                    fontSize: '13px',
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows
                                        ?.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage,
                                        )
                                        .map((row) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];

                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            sx={{ fontSize: '13px' }}
                                                        >
                                                            {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                            {column.id === 'avatar' ? (
                                                                <Avatar
                                                                    alt={'User Image'}
                                                                    src={
                                                                        row?.imagePath !== null
                                                                            ? row.imagePath
                                                                            : 'https://static.vecteezy.com/system/resources/thumbnails/030/353/225/small_2x/beautiful-night-sky-background-ai-generated-photo.jpg'
                                                                    }
                                                                    sx={{
                                                                        height: '56px',
                                                                        width: '56px',
                                                                    }}
                                                                />
                                                            ) : column.id === 'actions' ? (
                                                                // Render Edit and Delete buttons in the 'actions' column
                                                                <>
                                                                    <Tooltip
                                                                        title={
                                                                            <CustomizeTypography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '13px',
                                                                                    mb: 0,
                                                                                }}
                                                                            >
                                                                                Delete Users
                                                                            </CustomizeTypography>
                                                                        }
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    row._id,
                                                                                )
                                                                            }
                                                                            color="secondary"
                                                                        >
                                                                            <DeleteIcon
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '22px',
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </>
                                                            ) : column.format &&
                                                              typeof value === 'object' ? (
                                                                column.format(value)
                                                            ) : column.id === 'name' ? (
                                                                <Typography
                                                                    sx={{ fontSize: '13px' }}
                                                                >
                                                                    {row.firstName} {row.lastName}
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
                            count={filteredRows?.length}
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

                                '.MuiSvgIcon-root': { fontSize: '14px' },
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
                                msgType={messageType}
                                msgTitle={messageTitle}
                                msgContent={messageContent}
                                autoHideDuration={3000} // Auto-hide after 5 seconds
                                onClose={handleCloseNotification}
                            />
                        </Box>
                    )}
                </Box>
            )}
        </React.Fragment>
    );
}
