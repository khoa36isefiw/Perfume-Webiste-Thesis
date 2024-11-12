import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputAdornment, Stack, TextField, TableCell } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import WarningIcon from '@mui/icons-material/Warning';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { blue } from '@mui/material/colors';
import * as XLSX from 'xlsx';

import useBrand from '../../api/useBrand';
import { brandApi } from '../../api/brandApi';

function AdminTableBrands() {
    const navigate = useNavigate();
    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    const { data: brandsData, isLoading, mutate } = useBrand();
    const responsebrands = brandsData?.data || [];
    const [brands, setBrands] = useState(responsebrands);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [brandToRemove, setBrandToRemove] = useState(null);

    console.log('responsebrands: ', responsebrands);

    useEffect(() => {
        setBrands(responsebrands);
    }, [responsebrands]);

    const handleEdit = (brand) => {
        navigate(`/admin/manage-brands/edit/${brand._id}`, { state: { brand } });
    };

    // delete brand
    const handleDeleteBrand = (brandId) => {
        console.log('brandId id: ', brandId);
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setBrandToRemove({ brandId: brandId });
    };

    console.log('product to remove information: ', brandToRemove);
    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setBrandToRemove(null);
    };

    const handleConfirmAgree = async () => {
        console.log('chay vo day');
        if (brandToRemove) {
            const id = brandToRemove.brandId;
            try {
                // filter products and update rows
                const deleteResponse = await brandApi.deleteBrand(id);
                console.log('deleteResponse: ', deleteResponse);
                mutate();

                if (deleteResponse.status === 200) {
                    showMessage('success', 'Delete brand', 'Xóa brand thành công');
                    // re-update to list
                    const updatedbrands = brands.filter((brand) => brand._id !== id);
                    setBrands(updatedbrands);
                    setOpenConfirmMessage(false);
                    setBrandToRemove(null);
                }

                console.log('deleteResponse: ', deleteResponse);
            } catch (error) {
                showMessage('error', 'Delete brand', 'Xóa brand thất bại');
                console.error('Error deleting product:', error);
            }
        }
    };

    // export to excel
    // const exportToExcel = async () => {
    //     // Create a new workbook
    //     const workbook = XLSX.utils.book_new();

    //     // Convert JSON data to worksheet
    //     const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    //     // Append the worksheet to the workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'brandTable');

    //     // Export the workbook as an Excel file
    //     XLSX.writeFile(workbook, 'brands Table.xlsx');
    // };

    return (
        <React.Fragment>
            {isLoading ? (
                <Typography>Loading API....</Typography>
            ) : (
                <Box sx={{ height: '100vh', mr: 8 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>
                                brands
                            </Typography>
                            <Stack spacing={1} direction="row">
                                <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                                    <UploadIcon sx={{ mr: 1 }} />
                                    Import
                                </Button>
                                <Button
                                    sx={{ fontSize: '1.4rem', textTransform: 'none' }}
                                    // onClick={exportToExcel}
                                >
                                    <DownloadIcon sx={{ mr: 1 }} />
                                    Export
                                </Button>
                            </Stack>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                fontSize: '1.6rem',
                                borderRadius: 2.5,
                                textTransform: 'capitalize',
                            }}
                            component={Link}
                            to="/admin/manage-brands/add"
                        >
                            Add
                        </Button>
                    </Box>
                    {/* Search */}
                    <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                        <TextField
                            placeholder="Search brand"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ height: 25, width: 25 }} />
                                    </InputAdornment>
                                ),
                                style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                            }}
                        />
                    </Paper>
                    {/* Table */}
                    {/* <ToastMessage message={message} type={typeMessage} /> */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }}>
                                        No
                                    </TableCell>
                                    <TableCell
                                        sx={{ bgcolor: blue[200], fontSize: '13px' }}
                                        align="left"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        sx={{ bgcolor: blue[200], fontSize: '13px' }}
                                        align="center"
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        sx={{ bgcolor: blue[200], fontSize: '13px' }}
                                        align="center"
                                    >
                                        Active
                                    </TableCell>
                                    <TableCell
                                        sx={{ bgcolor: blue[200], fontSize: '13px' }}
                                        align="center"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brands?.length > 0 &&
                                    brands.map((brand, index) => {
                                        // find the parent brand by matching the parentId
                                        // const parent = parentbrand.find(
                                        //     (pbrand) => pbrand._id === brand.parent, // from brand list
                                        // );

                                        return (
                                            <TableRow
                                                key={brand._id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    sx={{ fontSize: '13px' }}
                                                    component="th"
                                                    scope="brand"
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '13px' }} align="left">
                                                    {brand.nameEn}
                                                </TableCell>
                                                {/* <TableCell sx={{ fontSize: '13px' }} align="left">
                                {parent ? (
                                    <Typography
                                        sx={{ textAlign: 'center', fontSize: '12px' }}
                                    >
                                        {parent.nameEn}
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            bgcolor: '#d5d5d5',
                                            textAlign: 'center',
                                            padding: '4px 8px',
                                            borderRadius: 1,
                                            filter: 'drop-shadow(0 0 1mm #d5d5d5)',
                                            fontSize: '12px',
                                        }}
                                    >
                                        No Parent
                                    </Typography>
                                )}
                            </TableCell> */}
                                                <TableCell
                                                    align="left"
                                                    sx={{ maxWidth: '400px', fontSize: '13px' }}
                                                >
                                                    {brand.descriptionEN ? (
                                                        <Typography
                                                            sx={{
                                                                textAlign: 'center',
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            {brand.descriptionEN}
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                bgcolor: '#d5d5d5',
                                                                textAlign: 'center',
                                                                padding: '4px 8px',
                                                                borderRadius: 1,
                                                                filter: 'drop-shadow(0 0 1mm #d5d5d5)',
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            No Description
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {brand.status === 'active' ? (
                                                        <CheckIcon
                                                            color="success"
                                                            fontSize="large"
                                                        />
                                                    ) : (
                                                        <CloseIcon color="error" fontSize="large" />
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleDeleteBrand(brand._id)}
                                                    >
                                                        <DeleteIcon
                                                            color="error"
                                                            fontSize="large"
                                                        />
                                                    </IconButton>

                                                    <IconButton onClick={() => handleEdit(brand)}>
                                                        <EditNoteIcon
                                                            color="info"
                                                            fontSize="large"
                                                        />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
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
                    </TableContainer>
                </Box>
            )}{' '}
        </React.Fragment>
    );
}

export default AdminTableBrands;