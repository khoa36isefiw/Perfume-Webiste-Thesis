import React, { useState } from 'react';
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
import { mobileScreen, theme } from '../../Theme/Theme';
import CategoryIcon from '@mui/icons-material/Category';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import useProduct from '../../api/useProduct';
import { converToVND } from '../convertToVND/convertToVND';
import { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';
import { productAPI } from '../../api/productAPI';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import * as XLSX from 'xlsx';

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

export default function AdminProductTable() {
    const navigate = useNavigate();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const { data: products, isLoading, mutate } = useProduct();
    console.log('products: ', products?.data);
    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);

    const [productToRemove, setProductToRemove] = useState(null);
    if (products?.data && rows !== products.data) {
        setRows(products.data);
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
    };

    // Flatten rows based on product sizes
    const flattenedRows =
        Array.isArray(rows) &&
        rows?.flatMap(
            (row) =>
                // row.variants.map((size) => ({
                row.category.status === 'active' &&
                row.brand.status === 'active' &&
                row.variants.map((size) => ({
                    productId: row._id,
                    productName: row.nameEn,
                    category: row.category?.nameEn,
                    brand: row.brand?.nameEn,
                    size: size.size,
                    price: size.price,
                    image: row?.imagePath[0],
                    stock: size.stock,
                    ratings: row.rating,
                    variants: [size],
                })),
        );

    console.log('flattenedRows: ', flattenedRows);

    // Filter flattened rows based on product name, and brand
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
        navigate(`/admin/manage-products/edit/${productId}`, {
            state: {
                productData: filteredRows.find(
                    (row) => row.productId === productId && row.size === size,
                ),

                productTest: products.data?.find(
                    (product) =>
                        product._id === productId &&
                        product?.variants.map((size) => size.size === size),
                ),
                selectedSize: getPrice.size,
            },
        });
    };

    // delete feature
    const handleDeleteProduct = (productId, size) => {
        console.log('product id: ', productId);
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setProductToRemove({ productId: productId, size });
    };

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setProductToRemove(null);
    };

    const handleConfirmAgree = async () => {
        console.log('chay vo day');
        if (productToRemove) {
            const id = productToRemove.productId;
            try {
                // filter products and update rows
                const deleteResponse = await productAPI.deleteProduct(id);
                if (deleteResponse.status === 200) {
                    mutate();
                    showNotificationMessage(
                        'success',
                        'Delete Product',
                        'Delete product successfully!',
                    );
                }
            } catch (error) {
                showNotificationMessage('error', 'Delete Product', 'Something went wrong???');
                console.error('Error deleting product:', error);
            } finally {
                setOpenConfirmMessage(false);
                setProductToRemove(null);
            }
        }
    };
    console.log('flattenedRows: ', flattenedRows);

    const exportToExcel = () => {
        // create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetData = flattenedRows.map((row, index) => ({
            // define column name and get data
            No: index + 1,
            ID: row.productId,
            Image: row.image,
            Name: row.productName,
            Brand: row.brand,
            Category: row.category,
            Quantity: row.stock,
            Rating: row.ratings,
        }));

        // convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Products Table.xlsx');
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
                        <AdminHeadingTypography>List Products</AdminHeadingTypography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
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
                                    borderRadius: 2,
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
                        </Box>
                        <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                            We can <strong>Search product</strong> by Name or Brand
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
                            placeholder="Search by Name"
                            variant="outlined"
                            fullWidth={true}
                            sx={{ marginBottom: 2 }}
                            onChange={handleSearch}
                            value={searchTerm}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                                style: {
                                    fontSize: '14px',
                                },
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
                                                sx={{ bgcolor: blue[200], fontSize: '14px' }}
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
                                                            sx={{ fontSize: '14px' }}
                                                        >
                                                            {/* Render avatar if the column is 'avatar', otherwise display text */}
                                                            {column.id === 'image' ? (
                                                                <Avatar
                                                                    alt={row.name}
                                                                    src={row.image}
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
                                                                                Edit Product
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
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '22px',
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip
                                                                        title={
                                                                            <CustomizeTypography
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '13px',
                                                                                    mb: 0,
                                                                                }}
                                                                            >
                                                                                Delete Product
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
                                                                                sx={{
                                                                                    fontSize:
                                                                                        '22px',
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </>
                                                            ) : column.id === 'price' ? (
                                                                <Typography
                                                                    sx={{ fontSize: '13px' }}
                                                                >
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
            )}
        </React.Fragment>
    );
}
