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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import {
    AdminHeadingTypography,
    AdminTypography,
    CustomizeTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { useNavigate } from 'react-router-dom';
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { theme } from '../../Theme/Theme';
import CategoryIcon from '@mui/icons-material/Category';
import productData from '../../data/admin/products.json';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import useProduct from '../../api/useProduct';
import { converToVND } from '../convertToVND/convertToVND';

const columns = [
    { id: 'image', label: 'Image' },
    { id: 'productName', label: 'Name' },
    { id: 'brand', label: 'Brand' },
    { id: 'size', label: 'Size' },
    { id: 'price', label: 'Price' },
    { id: 'stock', label: 'Stock' },
    { id: 'ratings', label: 'Rating' },

    // { id: 'category', label: 'Category' },
    { id: 'actions', label: 'Actions' },
];

export default function ProductTable() {
    const navigate = useNavigate();
    const { data: products, isLoading } = useProduct();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [productToRemove, setProductToRemove] = useState(null);

    useEffect(() => {
        const i = 0;
        if (products && products?.data) {
            setRows(products?.data);
        }
    }, [products]);

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

    // Flatten rows based on product sizes

    const flattenedRows = rows?.flatMap((row) =>
        // row.variants.map((size) => ({
        row.variants.map((size) => ({
            productId: row._id,
            productName: row.nameEn,
            brand: row.brand.nameEn,
            size: size.size,
            price: size.price,
            image: row?.imagePath[0],
            stock: size.stock,
            ratings: row.rating,
            variants: [size],
        })),
    );

    // Filter flattened rows based on product name, and brand
    // const filteredRows2 = flattenedRows.filter((row) => console.log('row2989: ', row));
    const filteredRows = flattenedRows.filter(
        (row) =>
            row?.productName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            row?.brand?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    console.log('filteredRows: ', filteredRows);

    const handleEdit = (productId, size) => {
        // /admin/manage-products/edit?productId=:id&size=:size
        const getPrice = filteredRows.find(
            (row) => row.productId === productId && row.size === size,
        );
        console.log('get price: ', getPrice.price);
        navigate(`/admin/manage-products/edit?productId=${productId}&size=${size}`, {
            state: {
                productData: filteredRows.find(
                    (row) => row.productId === productId && row.size === size,
                ),
                selectedSize: getPrice.size, // Pass the selected size
            },
        });
    };

    // delete feature

    const handleDeleteProduct = (productId, size) => {
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setProductToRemove({ productId, size });
        // try {
        //     // const response = await fetch(
        //     //     `https://api.example.com/products/${productId}/sizes/${size}`,
        //     //     { method: 'DELETE' },
        //     // );
    };

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    console.log('before delete product: ', rows);

    const handleConfirmAgree = async () => {
        if (productToRemove) {
            try {
                // filter products and update rows
                setRows(
                    (prevRows) =>
                        // prevRow is a list of products, contain many sizes
                        prevRows
                            .map((row) => {
                                // remove the size of product is selected to delete by product id
                                if (row.productId === productToRemove.productId) {
                                    // the remaining product list after deleting products of selected size
                                    const updatedSizes = row.sizes.filter(
                                        (size) => size.size !== productToRemove.size,
                                    );
                                    // if there are no sizes left, remove the entire product
                                    if (updatedSizes.length === 0) {
                                        return null;
                                    }

                                    // update list products with new size
                                    return { ...row, sizes: updatedSizes };
                                }
                                return row;
                            })
                            .filter(Boolean), //remove all products are null
                );

                setShowNotification(true);
                setShowAnimation('animate__bounceInRight');
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                setOpenConfirmMessage(false);
                setProductToRemove(null);
            }
        }
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
            {/* Search Bar */}
            <AdminHeadingTypography>List Products</AdminHeadingTypography>
            <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                We can <strong>Search product</strong> by Name or Brand
            </AdminTypography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    placeholder="Search by Name"
                    variant="outlined"
                    sx={{ marginBottom: 2, width: 750 }}
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
                        bgcolor: theme.palette.admin.bgColor,
                        textTransform: 'initial',
                        fontSize: '14px',
                        '&:hover': {
                            bgcolor: theme.palette.admin.bgColor,
                        },
                    }}
                    startIcon={<CategoryIcon />}
                    onClick={() => navigate('/admin/manage-products/add-product')}
                >
                    Add Product
                </Button>
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
                                        sx={{ bgcolor: blue[200], fontSize: '13px' }}
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
                                                    sx={{ fontSize: '13px' }}
                                                >
                                                    {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                    {column.id === 'image' ? (
                                                        <Avatar
                                                            alt={row.name}
                                                            src={row.image}
                                                            sx={{ height: '56px', width: '56px' }}
                                                        />
                                                    ) : column.id === 'actions' ? (
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
                                                                        Edit Users
                                                                    </CustomizeTypography>
                                                                }
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            row.productId,
                                                                            row.size,
                                                                        )
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
                                                                        Delete Users
                                                                    </CustomizeTypography>
                                                                }
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleDeleteProduct(
                                                                            row.productId,
                                                                            row.size,
                                                                        )
                                                                    }
                                                                    color="secondary"
                                                                >
                                                                    <DeleteIcon
                                                                        sx={{ fontSize: '22px' }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    ) : column.id === 'price' ? (
                                                        <Typography sx={{ fontSize: '13px' }}>
                                                            {converToVND(row.price)}
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
        </Box>
    );
}
