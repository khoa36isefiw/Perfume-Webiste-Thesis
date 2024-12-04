import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { AdminHeadingTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box, Typography } from '@mui/material';
import { mobileScreen } from '../../Theme/Theme';
import useProduct from '../../api/useProduct';
import { converToVND } from '../convertToVND/convertToVND';
import { ModalDesginV2 } from '../Modal/ModalDesgin';
import Loading from '../Loading/Loading';
import useLoading from '../../hooks/useLoading';

const columns = [
    { id: 'image', label: 'Image' },
    { id: 'productName', label: 'Name' },
    { id: 'brand', label: 'Brand' },
    { id: 'category', label: 'Category' },
    { id: 'size', label: 'Size' },
    { id: 'price', label: 'Price' },
    { id: 'discount', label: 'Discount' },
    { id: 'stock', label: 'Stock' },
];

export default function AdminRecentAddedV2() {
    const { data: products, isLoading, mutate } = useProduct();
    const { open, animateStyle, handleClose, setAnimateStyle } = useLoading();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]); // Dynamic user data
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    useEffect(() => {
        if (products && products?.data) {
            setRows(products?.data);
        }
    }, [products?.data]);

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
            brand: row.brand?.nameEn,
            category: row.category?.nameEn,
            size: size.size,
            price: size.price,
            discount: size.discountPercent,
            image: row?.imagePath[0],
            stock: size.stock,
            variants: [size],
        })),
    );

    // Filter flattened rows based on product name, and brand

    const filteredRows = flattenedRows.filter(
        (row) =>
            row?.productName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            row?.brand?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

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
                        <AdminHeadingTypography>Recent Products Added</AdminHeadingTypography>
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
                                                            {column.id === 'image' ? (
                                                                <Avatar
                                                                    alt={row.name}
                                                                    src={row.image}
                                                                    sx={{
                                                                        height: '56px',
                                                                        width: '56px',
                                                                    }}
                                                                />
                                                            ) : // Render Edit and Delete buttons in the 'actions' column

                                                            column.id === 'price' ? (
                                                                <Typography
                                                                    sx={{ fontSize: '13px' }}
                                                                >
                                                                    {converToVND(row.price)}
                                                                </Typography>
                                                            ) : column.id === 'discount' ? (
                                                                <Typography
                                                                    sx={{ fontSize: '13px' }}
                                                                >
                                                                    {row.discount}%
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
                </Box>
            )}
        </React.Fragment>
    );
}
