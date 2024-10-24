import { Box, Button, Checkbox, Container, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

import { ProductInCart } from './ProductInCart';

import { useSelector } from 'react-redux';
import CartTotal from './CartTotal';
import TotalPriceInCart from './TotalPriceInCart';
import EmptyCart from '../EmptyCart/EmptyCart';
import EmptyOrders from '../EmptyOrders/EmptyOrders';
import Check from '@mui/icons-material/Check';
import useUserById from '../../api/useUserById';

function Cart() {
    const navigate = useNavigate();
    const productAdded = useSelector((state) => state.cartManagement.productInfor);
    const userId = JSON.parse(window.localStorage.getItem('user_data')).userId;
    const { data, isLoading, error } = useUserById(userId);

    const [selectedProducts, setSelectedProducts] = useState([]);

    return (
        <React.Fragment>
            {data?.data?.cart.length > 0 ? (
                <Container sx={{ my: 16 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Button
                                onClick={() => navigate('/shop')}
                                startIcon={
                                    <ArrowBackIcon
                                        sx={{
                                            fontSize: '24px',
                                            color: '#fff',
                                        }}
                                    />
                                }
                                sx={{
                                    fontSize: '20px',
                                    textTransform: 'initial',
                                    color: '#fff',
                                    fontWeight: 'normal',
                                    transition:
                                        'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateX(-10px)',
                                        color: theme.palette.text.secondary,
                                        fontWeight: 'bold',
                                        // change color for icon
                                        '& .MuiSvgIcon-root': {
                                            color: theme.palette.text.secondary,
                                        },
                                    },
                                    [mobileScreen]: {
                                        fontSize: '16px',
                                    },
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <CustomizeTypography sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                                Your Cart
                            </CustomizeTypography>
                        </Grid>
                        {/* <Grid item xs={12} lg={8}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 1,
                                }}
                            >
                                <Checkbox
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: theme.palette.background.thirth,
                                        },
                                    }}
                                    checked={isAllSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <CustomizeTypography sx={{ mb: 0 }}>Select All</CustomizeTypography>
                            </Box>
                        </Grid> */}
                        <Grid item xs={12} lg={12}>
                            <Divider sx={{ bgcolor: '#fff', my: 2 }} />
                        </Grid>

                        <Grid
                            container
                            spacing={4}
                            sx={{
                                ml: '-16px',
                            }}
                        >
                            <Grid item xs={12} lg={8}>
                                <ProductInCart
                                    productsList={data.data.cart}
                                    selectedProducts={selectedProducts}
                                    setSelectedProducts={setSelectedProducts}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <TotalPriceInCart
                                    productsList={data.data.cart}
                                    selectedProducts={selectedProducts}
                                    setSelectedProducts={setSelectedProducts}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <>
                    <EmptyCart />
                </>
            )}
        </React.Fragment>
    );
}

export default Cart;
