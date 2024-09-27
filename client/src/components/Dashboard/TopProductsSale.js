import { Avatar, Box, Divider } from '@mui/material';
import React from 'react';
import {
    AdminHeadingTypography,
    AdminTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { converToVND } from '../convertToVND/convertToVND';

const dataTitleTable = ['Name', 'Price', 'Units Sold'];

const listProducts = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png',
        name: 'Luna Kei',
        price: 2133000,

        unitsSold: 3,
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png',
        name: 'Luna Kei',
        price: 2678000,

        unitsSold: 23,
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Allure_Homme_Sport_Eau_Extreme_sefblt.png',
        name: 'Luna Kei',
        price: 1121000,

        unitsSold: 13,
    },
    {
        id: 4,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Sauvage_EDT_vucd51.png',
        name: 'Luna Kei',
        price: 2563000,

        unitsSold: 24,
    },
    {
        id: 5,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png',
        name: 'Luna Kei',
        price: 1782000,

        unitsSold: 25,
    },
    {
        id: 6,
        image: 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png',
        name: 'Luna Kei',
        price: 12378000,

        unitsSold: 12,
    },
];

function TopProductsSale() {
    return (
        <Box sx={{ padding: 2, borderRadius: 1, bgcolor: '#fff', border: '1px solid #d5d5d5' }}>
            <AdminHeadingTypography sx={{ fontSize: '24px', mb: 2 }}>
                Top Products by Units Sold
            </AdminHeadingTypography>

            {/* Table Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {dataTitleTable.map((title, index) => (
                    <AdminTypography key={index} sx={{ flex: 1, textAlign: 'center' }}>
                        {title}
                    </AdminTypography>
                ))}
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 1 }} />

            {/* Table Body */}
            <Box sx={{ maxHeight: '270px', overflow: 'scroll' }}>
                {listProducts.map((product, index) => (
                    <Box key={product.id}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    px: 3,
                                }}
                            >
                                <Avatar
                                    src={product.image}
                                    alt="Best Products "
                                    sx={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: 1,
                                        bgcolor: '#ccc',
                                    }}
                                />
                                <AdminTypography sx={{ flex: 1, ml: 2 }}>
                                    {product.name}
                                </AdminTypography>
                            </Box>
                            <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                {converToVND(product.price)}
                            </AdminTypography>

                            <AdminTypography sx={{ flex: 1, textAlign: 'center' }}>
                                {product.unitsSold}
                            </AdminTypography>
                        </Box>
                        <React.Fragment>
                            {listProducts.length - 1 !== index && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default TopProductsSale;
