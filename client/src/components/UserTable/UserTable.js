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
import { theme } from '../../Theme/Theme';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import WarningIcon from '@mui/icons-material/Warning';
import useUsers from '../../api/useUsers';
import { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';
import { columns } from './userColumn';

// Component to render the table with dynamic data
export default function UserTable() {
    const navigate = useNavigate();
    const { data: users, mutate, isLoading, error } = useUsers();

    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    console.log('users: ', users?.data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    console.log('rows: ', rows);

    // confirm delete
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [userToRemove, setUserToRemove] = useState(null);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    // message
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    useEffect(() => {
        if (users && users.data) {
            setRows(users.data);
        }
        // rows?.filter((row) => {
        //     console.log('row: ', row);
        // });
    }, [users]);

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
    console.log('rows: ', rows);
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
                const response = await fetch(
                    `https://66f50b829aa4891f2a23a097.mockapi.io/tomtoc/api/v1/users/${userToRemove.userId}`,
                    {
                        method: 'DELETE',
                    },
                );

                if (response.ok) {
                    // Remove the user from the state
                    setRows((prevRows) => prevRows.filter((row) => row.id !== userToRemove.userId));
                    alert(`User with ID: ${userToRemove.userId} has been deleted.`);
                    setShowNotification(true);
                    setShowAnimation('animate__bounceInRight');
                    setMessageType('success');
                    setMessageContent('Delete user successfully!');
                    setMessageTitle('Delete user');
                } else {
                    alert('Failed to delete user.');
                    setShowNotification(true);
                    setShowAnimation('animate__bounceInRight');
                    setMessageTitle('Delete user');
                    setMessageType('error');
                    setMessageContent('Delete user failed!');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('An error occurred while deleting the user.');
            }
        }
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setOpenConfirmMessage(false);
        setUserToRemove(null);
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    console.log('filteredRows: ', filteredRows);
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
                <Box sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
                    {/* Search Bar */}
                    <AdminHeadingTypography sx={{ mb: 2 }}>List Users</AdminHeadingTypography>
                    <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                        We can <strong>Search</strong> by Name or Email
                    </AdminTypography>
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
                            // onClick={}
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
                                                                                handleDelete(row.id)
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
