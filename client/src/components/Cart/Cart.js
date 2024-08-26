import { Box, Button, Container, Divider, Grid } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import Promocode from './Promocode';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { ProductInCart } from './ProductInCart';
import { SummaryRowInCart } from './SummaryRowInCart';
import { CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';

function Cart() {
    const navigate = useNavigate();
    return (
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
                        <ProductInCart />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Box
                            sx={{
                                border: '1px solid #333',
                                borderRadius: 2,
                                p: 1,
                            }}
                        >
                            <CustomizeTypography
                                sx={{
                                    // allows to set a width and height on the element.
                                    // display: 'inline-block',
                                    borderColor: '#fff',
                                }}
                            >
                                If you have a Promo Code you will get 20% off
                            </CustomizeTypography>
                            <Box
                                sx={{
                                    py: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Promocode textAction={'Apply'} />
                            </Box>

                            <CustomizeHoverButtonV2 textAction={'Apply'} />

                            <CustomizeDividerV2 />
                            <SummaryRowInCart label="Subtotal" value="69.69" isTotal />
                            <SummaryRowInCart label="Discount" discount={'20%'} value="13.94" />
                            <SummaryRowInCart label="Delivery" value="0.00" />
                            <SummaryRowInCart label="Tax" value="6.69" />
                            <CustomizeDividerV2 />
                            <SummaryRowInCart label="Total" value="62.44" isTotal />
                            <CustomizeButtonInCart
                                variant="outlined"
                                textAction="Procced to checkout"
                                onHandleClick={''}
                                // show animation
                                isReverseAnimation={false}
                            />
                            <CustomizeButtonInCart
                                textAction="Continue Shopping"
                                onHandleClick={() => navigate('/shop')}
                                // hide animation
                                isReverseAnimation={true}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cart;
