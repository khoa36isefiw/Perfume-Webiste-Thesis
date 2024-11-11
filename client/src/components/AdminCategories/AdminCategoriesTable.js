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
import useCategory from '../../api/useCategory';
import { useEffect } from 'react';
import { categoriesAPI } from '../../api/categoriesAPI';
import useParentCategory from '../../api/useParentCategory';
import WarningIcon from '@mui/icons-material/Warning';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

function AdminCategoriesTable() {
    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    const { data: categoriesData, mutate } = useCategory();
    const responseCategories = categoriesData?.data || [];
    const { data: parentCategoriesData } = useParentCategory();
    const responseParentCategories = parentCategoriesData?.data || [];
    const [categories, setCategories] = useState(responseCategories);
    const [parentCategory, setParentCategory] = useState(responseParentCategories);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [categoryToRemove, setCategoryToRemove] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setCategories(categoriesData?.data);
    }, [categoriesData?.data]);

    useEffect(() => {
        setParentCategory(responseParentCategories);
    }, [responseParentCategories]);

    const handleEdit = (category) => {
        navigate(`/admin/manage-categories/edit/${category._id}`, { state: { category } });
    };

    // delete category
    const handleDeleteCategory = (categoryId) => {
        console.log('categoryId id: ', categoryId);
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setCategoryToRemove({ categoryId: categoryId });
    };

    console.log('product to remove information: ', categoryToRemove);
    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setCategoryToRemove(null);
    };

    const handleConfirmAgree = async () => {
        console.log('chay vo day');
        if (categoryToRemove) {
            const id = categoryToRemove.categoryId;
            try {
                // filter products and update rows
                const deleteResponse = await categoriesAPI.deleteCategory(id);
                console.log('deleteResponse: ', deleteResponse);
                mutate();

                if (deleteResponse.status === 200) {
                    showMessage('success', 'Delete Category', 'Xóa category thành công');
                    // re-update to list
                    const updatedCategories = categories.filter((category) => category._id !== id);
                    setCategories(updatedCategories);
                    setOpenConfirmMessage(false);
                    setCategoryToRemove(null);
                }

                console.log('deleteResponse: ', deleteResponse);
            } catch (error) {
                showMessage('error', 'Delete Category', 'Xóa category thất bại');
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <Box sx={{ height: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Categories</Typography>
                    <Stack spacing={1} direction="row">
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <UploadIcon sx={{ mr: 1 }} />
                            Import
                        </Button>
                        <Button sx={{ fontSize: '1.4rem', textTransform: 'none' }}>
                            <DownloadIcon sx={{ mr: 1 }} />
                            Export
                        </Button>
                    </Stack>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ fontSize: '1.6rem', borderRadius: 2.5, textTransform: 'capitalize' }}
                    component={Link}
                    to="/admin/manage-categories/add"
                >
                    Add
                </Button>
            </Box>
            {/* Search */}
            <Paper sx={{ mt: 4, mb: 4, padding: 1.5, borderRadius: 4 }}>
                <TextField
                    placeholder="Search Category"
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
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Parent Category</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Active</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.length > 0 &&
                            categories.map((category, index) => {
                                // find the parent category by matching the parentId
                                const parent = parentCategory.find(
                                    (pCategory) => pCategory._id === category.parent, // from category list
                                );
                                console.log('parent: ', parent);

                                return (
                                    <TableRow
                                        key={category._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="category">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">{category.nameEn}</TableCell>
                                        <TableCell align="left">
                                            {parent ? (
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {parent.nameEn}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    sx={{ bgcolor: '#d5d5d5', textAlign: 'center' }}
                                                >
                                                    No Parent
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align="left" sx={{ maxWidth: '400px' }}>
                                            {category.descriptionEn ? (
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {category.descriptionEn}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    sx={{ bgcolor: '#d5d5d5', textAlign: 'center' }}
                                                >
                                                    No Description
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {category.status === 'active' ? (
                                                <CheckIcon color="success" fontSize="large" />
                                            ) : (
                                                <CloseIcon color="error" fontSize="large" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleDeleteCategory(category._id)}
                                            >
                                                <DeleteIcon color="error" fontSize="large" />
                                            </IconButton>

                                            <IconButton onClick={() => handleEdit(category)}>
                                                <EditNoteIcon color="info" fontSize="large" />
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
    );
}

export default AdminCategoriesTable;
