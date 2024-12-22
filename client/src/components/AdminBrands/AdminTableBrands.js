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
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link, useNavigate } from 'react-router-dom';

import WarningIcon from '@mui/icons-material/Warning';
import ConfirmMessage from '../ConfirmMessage/ConfirmMessage';
import { AdminTypography, CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { blue } from '@mui/material/colors';
import * as XLSX from 'xlsx';
import useBrand from '../../api/useBrand';
import { brandApi } from '../../api/brandApi';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function AdminTableBrands() {
    const navigate = useNavigate();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const { data: brandsData, isLoading, mutate } = useBrand();

    const [brands, setBrands] = useState([]);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [brandToRemove, setBrandToRemove] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    if (brandsData?.data && brands !== brandsData?.data) {
        setBrands(brandsData?.data);
    }

    const handleEdit = (brand) => {
        navigate(`/admin/manage-brands/edit/${brand._id}`, { state: { brand } });
    };

    // delete brand
    const handleDeleteBrand = (brandId) => {
        // 1.  open confirm message
        setOpenConfirmMessage(true);
        // 2. store the product information data
        setBrandToRemove({ brandId: brandId });
    };

    // disagree, not delete the products
    const handleConfirmDisagree = () => {
        setOpenConfirmMessage(false);
        setBrandToRemove(null);
    };

    const handleConfirmAgree = async () => {
        if (brandToRemove) {
            const id = brandToRemove.brandId;
            try {
                // filter products and update rows
                const deleteResponse = await brandApi.deleteBrand(id);
                mutate();

                if (deleteResponse.status === 200) {
                    showNotificationMessage('success', 'Delete brand', 'Xóa brand thành công');
                    // re-update to list
                    const updatedbrands = brands.filter((brand) => brand._id !== id);
                    setBrands(updatedbrands);
                    setOpenConfirmMessage(false);
                    setBrandToRemove(null);
                }

                console.log('deleteResponse: ', deleteResponse);
            } catch (error) {
                showNotificationMessage('error', 'Delete brand', 'Xóa brand thất bại');
                console.error('Error deleting product:', error);
            }
        }
    };

    // export to excel
    const exportToExcel = () => {
        // create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheetData = brands.map((brand, index) => ({
            // define column name and get data
            No: index + 1,
            ID: brand._id,
            Name: brand.nameEn,
            Description: brand.descriptionEN,
            Status: brand.status,
        }));

        // convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TableData');

        // export the workbook as an Excel file
        XLSX.writeFile(workbook, 'Brands Table.xlsx');
    };

    const filterBrands = brands.filter(
        (brand) =>
            brand?.nameEn?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            brand?.status?.toLowerCase().includes(searchTerm?.toLowerCase()),
    );

    return (
        <React.Fragment>
            {isLoading ? (
                <Typography>Loading API....</Typography>
            ) : (
                <Box
                    sx={{
                        height: '100vh',
                        mr: 8,
                        [mobileScreen]: {
                            mr: 0,
                        },
                    }}
                >
                    <Box sx={{ mb: 4 }}>
                        <Box
                            sx={{
                                [mobileScreen]: {
                                    padding: 2,
                                },
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '3rem', fontWeight: 600 }}>
                                    Brands
                                </Typography>
                                <AdminTypography sx={{ fontSize: '18px', mb: 2 }}>
                                    You can <strong>Search Brands</strong> by Name, Status.
                                </AdminTypography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',

                                    marginBottom: '16px',
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
                                    to="/admin/manage-brands/add"
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                        {/* Search */}

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>
                    {/* Table */}
                    {/* <ToastMessage message={message} type={typeMessage} /> */}
                    <TableContainer
                        component={Paper}
                        sx={{ minWidth: 650, height: '60vh', overflow: 'scroll' }}
                    >
                        <Table aria-label="simple table">
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
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterBrands?.length > 0 &&
                                    filterBrands.map((brand, index) => {
                                        // find the parent brand by matching the parentId
                                        // const parent = parentbrand.find(
                                        //     (pbrand) => pbrand._id === brand.parent, // from brand list
                                        // );

                                        return (
                                            <>
                                                {brand.status === 'active' && (
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
                                                        <TableCell
                                                            sx={{ fontSize: '13px' }}
                                                            align="left"
                                                        >
                                                            {brand.nameEn}
                                                        </TableCell>

                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                maxWidth: '400px',
                                                                fontSize: '13px',
                                                            }}
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
                                                            <IconButton
                                                                onClick={() =>
                                                                    handleDeleteBrand(brand._id)
                                                                }
                                                            >
                                                                <DeleteIcon
                                                                    color="error"
                                                                    fontSize="large"
                                                                />
                                                            </IconButton>

                                                            <IconButton
                                                                onClick={() => handleEdit(brand)}
                                                            >
                                                                <EditNoteIcon
                                                                    color="info"
                                                                    fontSize="large"
                                                                />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </>
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
                    </TableContainer>
                </Box>
            )}{' '}
        </React.Fragment>
    );
}

export default AdminTableBrands;
