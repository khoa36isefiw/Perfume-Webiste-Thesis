import { Box, Button, Container, Grid, IconButton, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { converToVND } from '../convertToVND/convertToVND';

import CheckIcon from '@mui/icons-material/Check';
import { userAPI } from '../../api/userAPI';
import { useTranslation } from 'react-i18next';

import CustomizeDivider from '../CustomizeDivider/CustomizeDivider';
import ProductInformation from '../ProductInformation/ProductInformation';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function PerfumeDetail({ productData, onHandleClick }) {
    console.log('productData: ', productData);
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = React.useState(0);
    const { t, i18n } = useTranslation('translate');
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || null;
    // const productInformation = JSON.parse(window.localStorage.getItem('productInfor')) || null;

    const [selectedSize, setSelectedSize] = useState(null);

    // update selectedSize after product data is loaded
    useEffect(() => {
        if (productData?.variants?.length > 0) {
            const firstVariant = productData.variants[0];

            setSelectedSize({
                size: firstVariant.size,
                price: firstVariant.price,
                priceSale: firstVariant.priceSale,
                variantIDSelected: firstVariant._id,
                discount: firstVariant.discountPercent,
                numberStock: firstVariant.stock, // number of products in stock
            });
        }
    }, [productData]);

    const handleNext = () => {
        // Check if current image is the last one

        if (selectedImage < productData?.imagePath.length - 1) {
            setSelectedImage((prevIndex) => prevIndex + 1); // Move to the next image
        }
    };

    const handlePrevious = () => {
        // Check if current image is the first one
        if (selectedImage > 0) {
            setSelectedImage((prevIndex) => prevIndex - 1); // Move to the previous image
        }
    };

    // khi add to cart --> thì sẽ chạy .create order,
    // with status: inshoppingcart
    const handleAddProduct = async () => {
        // add to cart, when users moving to cart --> get user byID get all information
        if (userData) {
            const userId = userData._id; // id user here
            console.log('userId: ', userId);
            const mockData = {
                product: productData?._id, // id product here

                variant: selectedSize?.variantIDSelected, // id variant here
                quantity: 1,
            };
            const result = await userAPI.addProductToCart(userId, mockData);
            // console.log('product information: ', result.data);
            if (result.status === 200) {
                showNotificationMessage(
                    'success',
                    `${t('common.notifyMessage.addToCart.title')}`,
                    `${t('common.notifyMessage.addToCart.success')}`,
                );
            }
        } else {
            showNotificationMessage(
                'warning',
                `${t('common.notifyMessage.addToCart.title')}`,
                `${t('common.notifyMessage.addToCart.warning')}`,
            );
            setTimeout(() => {
                navigate(`/${i18n.language}/sign-in`);
            }, 2800);
        }
    };

    const handleSizeSelected = (index) => {
        // setSelectedSize(size);
        setSelectedSize({
            size: productData?.variants[index].size,
            price: productData?.variants[index].price,
            priceSale: productData?.variants[index].priceSale,
            variantIDSelected: productData?.variants[index]?._id,
            discount: productData?.variants[index]?.discountPercent,
            numberStock: productData?.variants[index]?.stock,
        });
    };

    const handleBuyNow = () => {
        // return an object
        const productObjectBuy = productData?.variants.map((size) => ({
            product: { ...productData },
            quantity: 1,
            variant: { ...size },
        }));

        console.log('productObjectBuy: ', productObjectBuy);
        window.localStorage.setItem('list_product_selected', JSON.stringify(productObjectBuy));
        navigate(`/${i18n.language}/checkout`);
    };

    return (
        <Box
            sx={{
                mt: 18,
                [mobileScreen]: {
                    mt: 16,
                },
            }}
        >
            <Container>
                <Grid
                    container
                    item
                    spacing={4}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                        height: '550px',
                        p: 1,
                    }}
                >
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box>
                            <Box
                                sx={{
                                    height: '350px',
                                    width: '100%',
                                    bgcolor: theme.palette.background.main,
                                    borderRadius: '8px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <IconButton
                                    onClick={handlePrevious}
                                    sx={{
                                        [mobileScreen]: {
                                            position: 'absolute',
                                            top: '50%',
                                            left: '-2%',
                                        },
                                    }}
                                    disabled={selectedImage === 0}
                                >
                                    <ArrowBackIosIcon
                                        sx={{
                                            fontSize: '28px',
                                            color: '#fff',
                                            '&:hover': {
                                                color: theme.palette.text.primary,
                                            },
                                        }}
                                    />
                                </IconButton>
                                <Box
                                    component={'img'}
                                    // src={perfume.perfumeImage}s
                                    src={productData?.imagePath[selectedImage]}
                                    sx={{
                                        // height: '400px',
                                        height: '100%',
                                        width: '65%',
                                        objectFit: 'cover',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                        [tabletScreen]: {
                                            width: '75%',
                                        },
                                        [mobileScreen]: {
                                            height: '350px',
                                            width: '75%',
                                        },
                                    }}
                                />
                                <IconButton
                                    onClick={handleNext}
                                    sx={{
                                        [mobileScreen]: {
                                            position: 'absolute',
                                            top: '50%',
                                            right: '-4%',
                                        },
                                    }}
                                    disabled={selectedImage === productData?.imagePath.length - 1}
                                >
                                    <ArrowForwardIosIcon
                                        sx={{
                                            fontSize: '28px',
                                            color: '#fff',
                                            '&:hover': {
                                                color: theme.palette.text.primary,
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Box>

                            <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
                                {productData?.imagePath.map((image, index) => (
                                    <Box
                                        key={index}
                                        alt="Quick View Image"
                                        component={'img'}
                                        src={image}
                                        sx={{
                                            p: 1,
                                            mt: 1,
                                            ml: 1,
                                            height: '100px',
                                            objectFit: 'cover',
                                            border:
                                                selectedImage === index
                                                    ? `2px solid ${theme.palette.text.primary}`
                                                    : '',
                                            // border: '1px solid #333',
                                            transition: 'border 0.3s ease',
                                            '&:hover': {
                                                cursor: 'pointer',
                                            },
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        {/* product name */}
                        <CustomizeTypography sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                            {/* Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum */}

                            {productData?.nameEn}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>{t('common.productDetails.brand')}: </strong>
                            <span>{productData ? productData?.brand.nameEn : 'Loading...'}</span>

                            {/* <span>Maison Francis Kurkdjian Paris</span> */}
                        </CustomizeTypography>
                        <CustomizeTypography>
                            <strong>{t('common.productDetails.status')}: </strong>
                            <span
                                style={{
                                    color:
                                        selectedSize?.numberStock <= 0
                                            ? theme.palette.orderHistory.cancel.icon
                                            : theme.palette.text.verified,
                                    fontWeight: 'bold',
                                }}
                            >
                                {selectedSize?.numberStock <= 0
                                    ? t('common.productDetails.outStock')
                                    : t('common.productDetails.inStock')}
                            </span>
                        </CustomizeTypography>

                        <CustomizeTypography>
                            {/* Hương thơm sang trọng và độc đáo, lý tưởng cho những dịp đặc biệt và
                            tiệc tối đẳng cấp. */}
                            {productData?.shortDescription}
                        </CustomizeTypography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                            }}
                        >
                            {/* average rating */}
                            <CustomizeTypography>
                                {productData?.rating.toFixed(1)}
                            </CustomizeTypography>

                            <Rating
                                readOnly
                                value={+productData?.rating.toFixed(1)}
                                // MuiRating-root MuiRating-sizeMedium css-1qqgbpl-MuiRating-root
                                sx={{
                                    fontSize: '18px',
                                    // change border color
                                    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                        color: theme.palette.thirth.main,
                                    },
                                    ml: 1,
                                    mb: 1,
                                }}
                                precision={0.1}
                            />
                            <CustomizeTypography
                                sx={{
                                    ml: 1,
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                    },
                                }}
                                // handle for showing comments and reviews
                                onClick={onHandleClick}
                            >
                                {/* ({commentsList.length > 0 ? commentsList.length : 0}{' '} */}
                                {t('common.productDetails.rate')} {productData?.numReviews}
                            </CustomizeTypography>
                            <Box
                                sx={{
                                    height: '20px',
                                    bgcolor: '#fff',
                                    width: '1px',
                                    ml: 1,
                                    mb: 1,
                                }}
                            />
                            {/* product sold quantity */}
                            <CustomizeTypography sx={{ ml: 1 }}>
                                {t('common.productDetails.sold')} {productData?.unitsSold}
                            </CustomizeTypography>
                        </Box>

                        {/* Price */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '50px',
                                width: '100%',
                                background: `linear-gradient(to right, #101820FF, #F2AA4CFF)`,
                                mb: 2,
                                [mobileScreen]: {
                                    width: '100%',
                                },
                            }}
                        >
                            {/* original price */}
                            <CustomizeTypography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    bgcolor: '#4a545e',
                                    p: '4px',
                                }}
                            >
                                {/* Sale */}
                                {t('common.productDetails.sale')}
                            </CustomizeTypography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: '4px',
                                }}
                            >
                                {/* price sale off */}
                                {selectedSize?.discount && (
                                    <CustomizeTypography
                                        sx={{
                                            color: theme.palette.text.primary,
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                        }}
                                    >
                                        {/* 9.980.000 ₫ */}
                                        {converToVND(selectedSize?.priceSale)}
                                    </CustomizeTypography>
                                )}
                                <CustomizeTypography
                                    sx={{
                                        fontSize: !selectedSize?.discount ? '20px' : '16px',
                                        textDecoration: selectedSize?.discount
                                            ? 'line-through'
                                            : null,
                                        fontWeight: 'bold',
                                        ml: selectedSize?.discount !== 0 ? 1 : 0,
                                        color:
                                            selectedSize?.discount === 0
                                                ? theme.palette.text.primary
                                                : '#d5d5d5',
                                    }}
                                >
                                    {/* undefine or null */}
                                    {selectedSize?.price
                                        ? converToVND(selectedSize.price)
                                        : 'Loading...'}
                                </CustomizeTypography>

                                {/* percen discount */}
                                {selectedSize?.discount !== 0 && (
                                    <Box
                                        sx={{
                                            ml: 2,
                                            height: '20px',
                                            mb: 1,
                                            // bgcolor: 'red',
                                            bgcolor: `#feeeea`,
                                            borderRadius: 1,
                                            fontSize: '12px',
                                            color: '#ff2a00',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '0px 8px',
                                        }}
                                    >
                                        -{selectedSize?.discount}%
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* Product Size */}
                        <Box sx={{ display: 'flex' }}>
                            {productData?.variants.map((size, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        minHeight: '50px',
                                        borderRadius: 2,
                                        mr: 2,
                                        // border: '1px solid #ccc',
                                        border: `1px solid ${theme.palette.text.secondary}`,

                                        display: 'flex',
                                        // flexDirection: 'column',
                                        alignItems: 'center',

                                        p: '4px',
                                    }}
                                    onClick={() => handleSizeSelected(index)}
                                >
                                    <Box>
                                        <CustomizeTypography
                                            sx={{
                                                mb: 0,
                                                fontSize: '12.5px',
                                                fontWeight: 'bold',
                                                color: theme.palette.text.secondary,
                                                textTransform: 'initial',
                                            }}
                                        >
                                            {size.size}
                                        </CustomizeTypography>
                                        <CustomizeTypography sx={{ mb: 0, fontSize: '12px' }}>
                                            {converToVND(size.price)}
                                        </CustomizeTypography>
                                    </Box>
                                    {selectedSize?.size === size.size && (
                                        <CheckIcon sx={{ color: '#18920D', fontSize: '18px' }} />
                                    )}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            {/* Add to cart button */}
                            <CustomizeButtonOutlined
                                textAction={t('common.productDetails.addToCart')}
                                onHandleClick={() => handleAddProduct()}
                                disabled={selectedSize?.numberStock <= 0}
                            />

                            {/* Buy Now Button */}
                            <Box sx={{ ml: 2 }}>
                                <CustomizeButton
                                    textAction={t('common.productDetails.buyNow')}
                                    onHandleClick={handleBuyNow}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <CustomizeDivider />

            <ProductInformation productInformation={productData} />
        </Box>
    );
}

export default PerfumeDetail;
