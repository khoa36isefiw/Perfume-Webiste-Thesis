import React from 'react';
import { Avatar, Box, Divider, Button } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { converToVND } from '../convertToVND/convertToVND';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import useUserById from '../../api/useUserById';
import useProduct from '../../api/useProduct';
import { backTop } from '../goBackTop/goBackTop';

export const OrderItemV2 = ({ listData }) => {
    const userData = JSON.parse(localStorage.getItem('user_data')) || [];
    const { data: products } = useProduct();
    console.log('products: ', products?.data);

    console.log('listData: ', listData);
    const navigate = useNavigate();
    const handleRating = (item) => {
        console.log('item infor:', item);

        const perfume = products?.data?.find(
            (product) =>
                product._id === item.product &&
                product?.variants.find((variant) => variant._id === item.variant),
        );
        console.log('perfume: ', perfume);
        navigate(`/product/${perfume._id}`, { state: { perfume } });
        setTimeout(() => {
            backTop();
        }, 100);
    };
    return (
        <>
            {listData.map((item, index) => (
                <Box key={index}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: '12px',
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Avatar
                                src={item.image[0]}
                                sx={{
                                    borderRadius: 1,
                                    width: '100px',
                                    height: '120px',
                                    bgcolor: '#fff',
                                }}
                            />
                            <Box sx={{ ml: 2 }}>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                        },
                                    }}
                                >
                                    {item.productName}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '13.5px',
                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                        },
                                    }}
                                >
                                    brand
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        fontSize: '13.5px',
                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                        },
                                    }}
                                >
                                    {item.size}
                                </CustomizeTypography>
                                <Button
                                    startIcon={<StarIcon />}
                                    sx={{
                                        padding: '6px 0',
                                        textTransform: 'initial',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: theme.palette.text.secondary,
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                        [mobileScreen]: {
                                            fontSize: '13px',
                                        },
                                    }}
                                    onClick={() => handleRating(item)}
                                >
                                    Rate Now
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <CustomizeTypography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                    textDecoration:
                                        item.price - item.priceSale !== 0 ? 'line-through' : null,
                                }}
                            >
                                {converToVND(item.price)}
                            </CustomizeTypography>
                            {item.price - item.priceSale !== 0 && (
                                <CustomizeTypography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        color: red[500],
                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                        },
                                    }}
                                >
                                    {converToVND(item.priceSale)}
                                </CustomizeTypography>
                            )}
                        </Box>
                    </Box>
                    {index !== listData.length - 1 && <Divider sx={{ bgcolor: '#ccc', my: 1 }} />}
                </Box>
            ))}
        </>
    );
};
