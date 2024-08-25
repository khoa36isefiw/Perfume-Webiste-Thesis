import { Box, Button, Container, Divider, Grid, IconButton } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';

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

                <Grid container item spacing={4} xs={12} lg={12} sx={{ my: 2 }}>
                    <Grid
                        item
                        lg={8}
                        sx={{
                            // border: '1px solid #333',
                            borderRadius: 1,
                            '&.MuiGrid-item': {
                                paddingTop: 0,
                            },
                        }}
                    >
                        <ProductInCart />
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sx={{
                            border: '1px solid #333',
                            borderRadius: 1,
                            '&.MuiGrid-item': {
                                padding: 2,
                            },
                        }}
                    >
                        <Box>
                            <Box sx={{ py: 1 }}>
                                <TextFieldCustomize placeholder={'Promocode'} />
                                <Button
                                    variant="contained"
                                    sx={{
                                        py: 1,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,

                                        bgcolor: theme.palette.secondaryText,
                                        fontSize: '14px',
                                        textTransform: 'initial',
                                        '&:hover': {
                                            bgcolor: theme.palette.secondaryText,
                                        },
                                    }}
                                >
                                    Apply
                                </Button>
                            </Box>
                            <CustomizeTypography
                                sx={{
                                    // allows to set a width and height on the element.
                                    // display: 'inline-block',
                                    borderColor: '#fff',
                                }}
                            >
                                If you have a Promo Code you will get 20% off
                            </CustomizeTypography>
                            <Box sx={{ borderBottom: '1px dashed #fff', my: 1 }} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomizeTypography>Subtotal</CustomizeTypography>
                                <CustomizeTypography>$69.69</CustomizeTypography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomizeTypography>Discount</CustomizeTypography>
                                <CustomizeTypography>(20%) - $13.94</CustomizeTypography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomizeTypography>Delivery</CustomizeTypography>
                                <CustomizeTypography>$0.00</CustomizeTypography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: '1px dashed #fff',
                                }}
                            >
                                <CustomizeTypography>Tax</CustomizeTypography>
                                <CustomizeTypography>+ $6.69</CustomizeTypography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomizeTypography>Total</CustomizeTypography>
                                <CustomizeTypography>$62.44</CustomizeTypography>
                            </Box>
                            <Button variant="contained" fullWidth>
                                Procced to checkout
                            </Button>
                            <Button>Continue shopping</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cart;

export const ProductInCart = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        bgcolor: '#333',
                        height: '200px',
                        width: '200px',
                        borderRadius: '8px',
                        // p: 1,
                    }}
                >
                    <Box
                        loading="lazy"
                        src={
                            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161758/perfumes/men/Allure_Homme_Sport_wtevx6.png'
                        }
                        component="img"
                        sx={{
                            borderRadius: 1,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // flexDirection: 'column',
                        }}
                    />
                </Box>
                {/* name */}
                <Box sx={{ ml: 2 }}>
                    <CustomizeTypography>Allure Homme Sport Eau Extreme</CustomizeTypography>
                    {/* price and stocks status */}
                    <CustomizeTypography sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>3.780.000đ</span>
                        <Box sx={{ height: '20px', width: '1px', bgcolor: '#fff', mx: 2 }} />
                        <span style={{ color: theme.palette.text.verified, fontWeight: 'bold' }}>
                            In Stock
                        </span>
                    </CustomizeTypography>
                    {/* increase quantity */}
                    <Box
                        sx={{
                            height: '30px',
                            width: '120px',
                            borderRadius: '10px',
                            border: '1px solid #d9d9d9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                        }}
                    >
                        {/* <ButtonQuantity text={'-'} fontSize="28px" /> */}
                        <CustomizeTypography
                            sx={{
                                fontSize: '24px',
                                p: '4px',
                                mb: 0,
                                '&:hover': {
                                    color: theme.palette.text.secondary,
                                },
                                cursor: 'pointer',
                            }}
                        >
                            -
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '16px',
                                mb: 0,
                            }}
                        >
                            1
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '16px',
                                mb: 0,
                                p: '4px',
                                '&:hover': {
                                    color: theme.palette.text.secondary,
                                },
                                cursor: 'pointer',
                            }}
                        >
                            +
                        </CustomizeTypography>
                        {/* <ButtonQuantity text={'+'} /> */}
                    </Box>
                </Box>
            </Box>
            {/* Total price, remove item */}
            <Box
                sx={{
                    // margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CustomizeTypography>3.298.000đ</CustomizeTypography>
                <Button
                    startIcon={
                        <DeleteIcon
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
                            color: theme.palette.text.secondary,
                            fontWeight: 'bold',
                            // change color for icon
                            '& .MuiSvgIcon-root': {
                                color: theme.palette.text.secondary,
                            },
                        },
                    }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};
