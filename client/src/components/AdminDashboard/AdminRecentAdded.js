import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import { Box } from '@mui/material';
import ActionsButton from './ActionsButton';
import DashboardProducts from './DashboardProducts';
import { theme } from '../../Theme/Theme';
import useRecentProduct from '../../api/useRecentProduct';

const productList = [
    {
        id: 1,
        name: 'Homme Intense',
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png',
    },
    {
        id: 2,
        name: 'Chanel Bleu',
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/1_152c85d7-a3b0-4a5b-8b7c-af0a1fe1bf0d.jpg?v=1714556075',
    },
    {
        id: 3,
        name: 'Dior Sauvage',
        image: 'https://product.hstatic.net/200000793347/product/z4963966225148_a7c2e811511e9ec811b2bd3e67c08211_5b6322be3b4c4b1ebb761514e81558d1_master.jpg',
    },
    {
        id: 4,
        name: 'Dior Sauvage',
        image: 'https://product.hstatic.net/200000793347/product/z4963966225148_a7c2e811511e9ec811b2bd3e67c08211_5b6322be3b4c4b1ebb761514e81558d1_master.jpg',
    },
];

const columns = [
    { field: 'id', headerName: 'UID', width: 10 },
    {
        field: 'product',
        headerName: 'Product',
        width: 160,

        // accept render component and render DashboardProducts for each row
        renderCell: (params) => <DashboardProducts product={params.row} />,
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 70 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90 },
    { field: 'stock', headerName: 'Stock', width: 70, type: 'number' },
    { field: 'rating', headerName: 'Rating', width: 70, type: 'number' },
    { field: 'order', headerName: 'Order', width: 70, type: 'number' },
    { field: 'sales', headerName: 'Sales', width: 150, type: 'number' },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        description: 'This column has a value getter and is not sortable.',
        // render <Actions/> for each row
        renderCell: () => <ActionsButton />,
    },
];

const rows = [
    {
        id: '#1',
        category: 'women',
        brand: 'Dior',
        price: 2890000,
        stock: 40,
        rating: 4.5,
        order: 38,
        sales: 18000000,
        name: 'Homme Intense',
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png',
    },

    {
        category: 'men',
        brand: 'Chanel',
        price: 71,
        stock: 59,
        rating: 4,
        order: 68,
        sales: 36,
        id: '#2',
        name: 'Chanel Bleu',
        image: 'https://bellavitaluxury.co.in/cdn/shop/files/1_152c85d7-a3b0-4a5b-8b7c-af0a1fe1bf0d.jpg?v=1714556075',
    },
    {
        category: 'men',
        brand: 'Chanel',
        price: 99,
        stock: 18,
        rating: 5,
        order: 32,
        sales: 4,
        id: '#3',
        name: 'Dior Sauvage',
        image: 'https://product.hstatic.net/200000793347/product/z4963966225148_a7c2e811511e9ec811b2bd3e67c08211_5b6322be3b4c4b1ebb761514e81558d1_master.jpg',
    },
    {
        category: 'women',
        brand: 'Cellious',
        price: 80,
        stock: 23,
        rating: 31,
        order: 25,
        sales: 79,
        id: '#4',
        name: 'Dior Sauvage',
        image: 'https://product.hstatic.net/200000793347/product/z4963966225148_a7c2e811511e9ec811b2bd3e67c08211_5b6322be3b4c4b1ebb761514e81558d1_master.jpg',
    },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AdminRecentAdded() {
    const { data: recentProduct, isLoading } = useRecentProduct();
    console.log('recentProduct: ', recentProduct?.data);

    return (
        <Box
            sx={{
                bgcolor: '#fff',
                borderRadius: 1,
                p: 1,
                height: 600,
                width: '100%',
            }}
        >
            <AdminTypography
                sx={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: theme.palette.admin.primaryColor,
                }}
            >
                Recent Products Added
            </AdminTypography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{
                    width: '100%',
                    border: 0,
                    '.MuiDataGrid-columnHeaderTitleContainer': {
                        fontSize: '14px',
                    },
                    '.MuiDataGrid-cell': {
                        fontSize: '13px',
                    },
                    '.MuiTablePagination-selectLabel': {
                        fontSize: '13px',
                    },
                    '.MuiInputBase-root': {
                        fontSize: '13px',
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '13px',
                    },
                }}
            />
        </Box>
    );
}
