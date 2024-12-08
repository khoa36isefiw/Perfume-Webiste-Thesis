import { Box, Button, Container, Divider, Grid, IconButton, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { quickViewImage } from './perfumeDetailData';
import { useLocation, useNavigate } from 'react-router-dom';
import { converToVND } from '../convertToVND/convertToVND';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import CheckIcon from '@mui/icons-material/Check';
import { userAPI } from '../../api/userAPI';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import { useTranslation } from 'react-i18next';
import useProductById from '../../api/useProductById';
import useLoadingV2 from '../../hooks/useLoadingV2';
import CustomizeDivider from '../CustomizeDivider/CustomizeDivider';
import ProductInformation from '../ProductInformation/ProductInformation';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

function PerfumeDetail() {
    const { LoadingAPI } = useLoadingV2();
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = React.useState(0);
    const { t, i18n } = useTranslation('translate');
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || null;
    // const productInformation = JSON.parse(window.localStorage.getItem('productInfor')) || null;
    const locationPath = location.pathname.split('/');
    console.log('currentQueryParams: ', location.pathname);
    console.log('split: ', locationPath[locationPath.length - 1]);
    console.log();

    const {
        data: productData,
        isLoading,
        error,
    } = useProductById(locationPath[locationPath.length - 1]);

    console.log('productData: ', productData?.data?.product);

    const [selectedSize, setSelectedSize] = useState(null);

    // update selectedSize after product data is loaded
    useEffect(() => {
        if (productData?.data?.product?.variants?.length > 0) {
            const firstVariant = productData?.data?.product.variants[0];
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
        if (selectedImage < productData?.data?.product?.imagePath?.length - 1) {
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
            const userId = userData.userId; // id user here
            const mockData = {
                product: productData?.data?.product?._id, // id product here
                variant: selectedSize?.variantIDSelected, // id variant here
                quantity: 1,
            };
            const result = await userAPI.addProductToCart(userId, mockData);
            // console.log('product information: ', result.data);
            if (result) {
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
            size: productData?.data?.product?.variants[index].size,
            price: productData?.data?.product?.variants[index].price,
            priceSale: productData?.data?.product?.variants[index].priceSale,
            variantIDSelected: productData?.data?.product?.variants[index]?._id,
            discount: productData?.data?.product?.variants[index]?.discountPercent,
            numberStock: productData?.data?.product?.variants[index]?.stock,
        });
    };

    // console.log('selectedSize: ', selectedSize);

    if (isLoading) {
        return <LoadingAPI />;
    }

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
                                {/* discount must !== 0 */}
                                {/* {selectedSize?.discount !== 0 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '10%',
                                            left: '10%',
                                            height: '30px',
                                            width: '60px',
                                            // bgcolor: 'red',
                                            backgroundImage: `linear-gradient(-60deg, #b31217 0%, #e52d27 100%)`,
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        - {selectedSize?.discount}%
                                    </Box>
                                )} */}

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
                                    // src={perfume.perfumeImage}
                                    src={productData?.data?.product?.imagePath[selectedImage]}
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
                                    disabled={
                                        selectedImage ===
                                        productData?.data?.product.imagePath.length - 1
                                    }
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
                                {productData?.data?.product.imagePath.map((image, index) => (
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
                            {productData?.data?.product.nameEn}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>{t('common.productDetails.brand')}: </strong>
                            <span>
                                {productData?.data?.product
                                    ? productData?.data?.product?.brand.nameEn
                                    : 'Loading...'}
                            </span>
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
                            {productData.data.shortDescription}
                        </CustomizeTypography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // justifyContent: 'space-between',
                            }}
                        >
                            <CustomizeTypography>5.0</CustomizeTypography>

                            <Rating
                                readOnly
                                value={5}
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
                                // onClick={}
                            >
                                {/* ({commentsList.length > 0 ? commentsList.length : 0}{' '} */}
                                {t('common.productDetails.rate')} 0
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
                                {t('common.productDetails.sold')}{' '}
                                {productData?.data?.product.unitsSold}
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
                            {productData?.data?.product?.variants.map((size, index) => (
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
                            <CustomizeButtonOutlined
                                textAction={t('common.productDetails.addToCart')}
                                onHandleClick={() => handleAddProduct()}
                                disabled={selectedSize?.numberStock <= 0}
                            />

                            {/* <CustomizeButton textAction={'Add to cart'} /> */}
                            <Box sx={{ ml: 2 }}>
                                <CustomizeButton textAction={t('common.productDetails.buyNow')} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <CustomizeDivider />
            <ProductInformation productInformation={productData?.data?.product} />
        </Box>
    );
}

export default PerfumeDetail;
