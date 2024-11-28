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
import { AdminTypography, CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { blue } from '@mui/material/colors';
import * as XLSX from 'xlsx';
import { ConstructionOutlined } from '@mui/icons-material';

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
    const [searchTerm, setSearchTerm] = useState('');

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

    // export to excel
    const exportToExcel = async () => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Fetch parent category names asynchronously
        const worksheetData = await Promise.all(
            responseCategories.map(async (category, index) => {
                console.log('category.parent: ', category.parent);
                const parentCategory = await categoriesAPI.getCategoryById(category.parent);

                console.log('parentCategory', parentCategory);
                return {
                    // Define column names and get data
                    No: index + 1,
                    ID: category._id,
                    'Category Name': category.nameEn,
                    'Parent Category':
                        parentCategory.status === 200 ? parentCategory?.data?.nameEn : 'N/A',
                    Description: category.descriptionEn,
                };
            }),
        );

        // Convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'CategoryTable');

        // Export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Categories Table.xlsx');
    };

    const filterCategories = categories?.filter(
        (cate) =>
            cate?.nameEn?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            cate?.descriptionEn?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    return (
        <Box sx={{ height: '100vh', mr: 8, [mobileScreen]: { mr: 0 } }}>
            <Box
                sx={{
                    marginBottom: '16px',
                }}
            >
                <Box
                    sx={{
                        [mobileScreen]: {
                            padding: 2,
                        },
                    }}
                >
                    <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>Categories</Typography>
                    <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                        You can <strong>Search Brands</strong> by Name, Status.
                    </AdminTypography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Stack spacing={1} direction="row">
                            <Button
                                sx={{ fontSize: '1.4rem', textTransform: 'none' }}
                                onClick={exportToExcel}
                            >
                                <DownloadIcon sx={{ mr: 1 }} />
                                Export
                            </Button>
                        </Stack>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                fontSize: '1.6rem',
                                borderRadius: 2.5,
                                textTransform: 'capitalize',
                            }}
                            component={Link}
                            to="/admin/manage-categories/add"
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
                {/* Search */}
                <TextField
                    placeholder="Search Category"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ height: 25, width: 25 }} />
                            </InputAdornment>
                        ),
                        style: { fontSize: '1.4rem', color: '#000', borderRadius: 8 },
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            {/* Table */}
            {/* <ToastMessage message={message} type={typeMessage} /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }}>No</TableCell>
                            <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }} align="left">
                                Name
                            </TableCell>
                            <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }} align="center">
                                Parent Category
                            </TableCell>
                            <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }} align="center">
                                Description
                            </TableCell>
                            <TableCell sx={{ bgcolor: blue[200], fontSize: '13px' }} align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterCategories?.length > 0 &&
                            filterCategories.map((category, index) => {
                                // find the parent category by matching the parentId
                                const parent = parentCategory.find(
                                    (pCategory) => pCategory._id === category.parent, // from category list
                                );

                                return (
                                    <TableRow
                                        key={category._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell
                                            sx={{ fontSize: '13px' }}
                                            component="th"
                                            scope="category"
                                        >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '13px' }} align="left">
                                            {category.nameEn}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '13px' }} align="left">
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
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ maxWidth: '400px', fontSize: '13px' }}
                                        >
                                            {category.descriptionEn ? (
                                                <Typography
                                                    sx={{ textAlign: 'center', fontSize: '12px' }}
                                                >
                                                    {category.descriptionEn}
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
