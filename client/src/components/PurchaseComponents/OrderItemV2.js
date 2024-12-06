import React from 'react';
import { Avatar, Box, Divider, Button } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { converToVND } from '../convertToVND/convertToVND';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

import useProduct from '../../api/useProduct';
import { backTop } from '../goBackTop/goBackTop';
import { useTranslation } from 'react-i18next';

export const OrderItemV2 = ({ listData }) => {
    const { i18n } = useTranslation('translate');
    const { data: products } = useProduct();
    const navigate = useNavigate();
    const handleRating = (item) => {
        const perfume = products?.data?.find(
            (product) =>
                product._id === item.product &&
                product?.variants.find((variant) => variant._id === item.variant),
        );
        window.localStorage.setItem('productInfor', JSON.stringify(perfume));
        navigate(`/${i18n.language}/${perfume.name}?pId=${perfume._id}`);
        setTimeout(() => {
            backTop(); // deplay 100ml waiting for navigating
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
                                        mb: '2px',
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
                                        mb: '2px',
                                        fontSize: '13.5px',
                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                            mb: '4px',
                                        },
                                    }}
                                >
                                    {item.brand}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        mb: '2px',
                                        fontSize: '13.5px',

                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                            mb: '4px',
                                        },
                                    }}
                                >
                                    <strong>Size:</strong> {item.size}
                                </CustomizeTypography>
                                <CustomizeTypography
                                    sx={{
                                        mb: '2px',
                                        fontSize: '13.5px',

                                        [mobileScreen]: {
                                            fontSize: '12.5px',
                                            mb: '4px',
                                        },
                                    }}
                                >
                                    <strong>Qty:</strong> {item.quantity}
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
