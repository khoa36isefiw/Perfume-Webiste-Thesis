import { Button, Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import TotalPriceInCart from './TotalPriceInCart';
import EmptyCart from '../EmptyCart/EmptyCart';
import useUserById from '../../api/useUserById';
import { ProductInCart } from './ProductInCart';
import { useTranslation } from 'react-i18next';

function Cart() {
    const navigate = useNavigate();

    const [priceChange, setPriceChange] = useState(false);
    const userId = JSON.parse(window.localStorage.getItem('user_data'))?.userId;
    const { data, mutate, isLoading, error } = useUserById(userId);
    const { t, i18n } = useTranslation('translate');

    const [selectedProducts, setSelectedProducts] = useState([]);

    // console.log('selectedProducts: ', selectedProducts);
    useEffect(() => {
        window.localStorage.setItem('list_product_selected', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    return (
        <React.Fragment>
            {data?.data?.cart.length > 0 ? (
                <Container sx={{ my: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={12}>
                            <Button
                                onClick={() => navigate(`/${i18n.language}/shop`)}
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
                                {t(`common.shoppingCart.continue`)}
                            </Button>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <CustomizeTypography sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                                {t(`common.shoppingCart.yourCart`)}
                            </CustomizeTypography>
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Divider sx={{ bgcolor: '#fff', my: 2 }} />
                        </Grid>

                        <Grid
                            container
                            spacing={4}
                            sx={{
                                ml: '-16px',
                                [mobileScreen]: {
                                    // '.MuiGrid-item': {
                                    //     pr: 1,
                                    // },
                                },
                            }}
                        >
                            <Grid item xs={12} lg={8}>
                                <ProductInCart
                                    productsList={data.data.cart}
                                    selectedProducts={selectedProducts}
                                    setSelectedProducts={setSelectedProducts}
                                    setPriceChange={setPriceChange}
                                    mutate={mutate}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <TotalPriceInCart
                                    productsList={data.data.cart}
                                    selectedProducts={selectedProducts}
                                    setPriceChange={setPriceChange}
                                    priceChange={priceChange}
                                    mutate={mutate}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <>
                    <EmptyCart
                        title={t('common.shoppingCart.emptyCart.title')}
                        subTitle={t('common.shoppingCart.emptyCart.content')}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default Cart;
