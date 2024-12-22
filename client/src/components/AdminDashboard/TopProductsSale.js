import { Avatar, Box, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
    AdminHeadingTypography,
    AdminTypography,
} from '../CustomizeTypography/CustomizeTypography';
import { converToVND } from '../convertToVND/convertToVND';
import useTopProductSold from '../../api/useTopProductSold';
import { mobileScreen } from '../../Theme/Theme';

const dataTitleTable = ['Name', 'Price', 'Units Sold'];

function TopProductsSale() {
    const { data: productSold } = useTopProductSold();

    const [topProductSold, setTopProductSold] = useState([]);

    useEffect(() => {
        if (productSold && productSold?.data) {
            const listUsers = productSold?.data?.map((product) => {
                return {
                    id: product._id,
                    image: product.imagePath[0],
                    name: product.nameEn,
                    price: product.variants[0].price,
                    unitsSold: product.unitsSold,
                };
            });
            setTopProductSold(listUsers);
        }
    }, [productSold]);
    // console.log('topProductSold: ', topProductSold);

    return (
        <Box sx={{ padding: 2, borderRadius: 1, bgcolor: '#fff', border: '1px solid #d5d5d5' }}>
            <AdminHeadingTypography sx={{ fontSize: '24px', mb: 2 }}>
                Top Products by Units Sold
            </AdminHeadingTypography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    alignItems: 'center',
                    mb: 1,
                }}
            >
                {dataTitleTable.map((title, index) => (
                    <AdminTypography key={index} sx={{ flex: 1, textAlign: 'left' }}>
                        {title}
                    </AdminTypography>
                ))}
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 1 }} />

            {/* Table Body */}
            <Box sx={{ maxHeight: '270px', overflow: 'scroll' }}>
                {topProductSold.length > 0 &&
                    topProductSold.map((product, index) => (
                        <Box key={product.id}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        src={product.image}
                                        alt="Best Products"
                                        sx={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: 1,
                                            bgcolor: '#ccc',
                                        }}
                                    />
                                    <AdminTypography
                                        sx={{
                                            ml: 2,
                                            textAlign: 'left',
                                            width: '100px',
                                            textTransform: 'capitalize',
                                            [mobileScreen]: {
                                                ml: 1,
                                                fontSize: '13px',
                                            },
                                        }}
                                    >
                                        {product.name}
                                    </AdminTypography>
                                </Box>

                                <AdminTypography
                                    sx={{
                                        textAlign: 'left',
                                        pr: 2,
                                    }}
                                >
                                    {converToVND(product.price)}
                                </AdminTypography>

                                <AdminTypography
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {product.unitsSold}
                                </AdminTypography>
                            </Box>

                            <React.Fragment>
                                {topProductSold.length - 1 !== index && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
}

export default TopProductsSale;
