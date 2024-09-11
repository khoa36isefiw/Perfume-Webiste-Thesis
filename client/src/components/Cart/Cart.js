import { Button, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

import { ProductInCart } from './ProductInCart';

import { useSelector } from 'react-redux';
import CartTotal from './CartTotal';
import TotalPriceInCart from './TotalPriceInCart';
import EmptyCart from '../EmptyCart/EmptyCart';
import EmptyOrders from '../EmptyOrders/EmptyOrders';

function Cart() {
    const productAdded = useSelector((state) => state.cartManagement.productInfor);
    // console.log('productAdded', productAdded);
    const navigate = useNavigate();
    return (
        <React.Fragment>
            {productAdded.length > 0 ? (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item lg={12} xs={12}>
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
                                    fontSize: '16px',
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
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Grid>
                        <Grid item lg={12}>
                            <CustomizeTypography sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                                Your Cart
                            </CustomizeTypography>
                        </Grid>
                        <Grid item lg={12}>
                            <Divider sx={{ bgcolor: '#fff', my: 2 }} />
                        </Grid>

                        <Grid container spacing={4} sx={{ ml: '-16px' }}>
                            <Grid item xs={12} lg={8}>
                                <ProductInCart productsList={productAdded} />
                            </Grid>
                            {/* <Grid item xs={12} lg={4}>
                            <CartTotal productsList={productAdded} />
                        </Grid> */}
                            <Grid item xs={12} lg={4}>
                                <TotalPriceInCart productsList={productAdded} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <>
                    <EmptyCart />
                    <EmptyOrders />
                </>
            )}
        </React.Fragment>
    );
}

export default Cart;
