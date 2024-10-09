import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { quickViewImage } from './perfumeDetailData';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart,
    increaseQuantity,
} from '../../redux/feature/CartManagement/CartManagementSlice';
import { converToVND } from '../convertToVND/convertToVND';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import CheckIcon from '@mui/icons-material/Check';

function PerfumeDetail() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

    // get the perfume data passed from navigation
    const { perfume } = location.state || {};
    const [selectedSize, setSelectedSize] = useState(perfume.perfumeGroupSize[0]);

    // get list product added to cart
    const cartItems = useSelector((state) => state.cartManagement.productInfor);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    // Hàm selector để lấy số lượng sản phẩm đã bán theo productId
    const selectSoldQuantityByProductId = (state, productId) => {
        const productInfo = state.checkoutManagement.listOrdersBasedOnProduct[productId];
        return productInfo ? productInfo.quantitySold : 0;
    };

    // Sử dụng trong component
    const productId = perfume.perfumeID;
    const soldQuantity = useSelector((state) => selectSoldQuantityByProductId(state, productId));

    const [selectedImage, setSelectedImage] = React.useState(0);

    // Handle Previous button click
    const handlePrevious = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + quickViewImage.length) % quickViewImage.length,
        );
    };

    // Handle Next button click
    const handleNext = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % quickViewImage.length);
    };

    useEffect(() => {}, [perfume]);

    const handleAddProduct = (productInfor) => {
        const existingItem = cartItems.find(
            (item) =>
                item.perfumeID === productInfor.perfumeID &&
                item.perfumeSize === productInfor.perfumeSize,
        );
        const productToDispatch = {
            perfumeID: productInfor.perfumeID,
            perfumeName: productInfor.perfumeName,
            // perfumePrice: productInfor.perfumePriceVND,
            perfumeSize: selectedSize.perfumeSize,
            perfumePrice: selectedSize.perfumePrice,
            perfumePriceDiscount: productInfor.perfumePriceDiscount,
            perfumeImage: productInfor.perfumeImage,
            perfumeBrand: productInfor.perfumeBrand,
            perfumeQuantity: 1,
        };

        // check, is product existed in cart items?
        if (cartItems !== null) {
            // exists in cart items
            if (existingItem) {
                console.log('chạy vô đây không');
                dispatch(increaseQuantity(productInfor.perfumeID, productInfor.perfumeSize));
            } else {
                console.log('chạy vô đây');

                dispatch(addToCart({ ...productToDispatch }));
            }
            setShowNotification(true);
            setShowAnimation('animate__bounceInRight');
        }
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    const handleSizeSelected = (size) => {
        setSelectedSize(size);
    };

    // calculate the quantity of products is sold
    // const getSoldQuantity = (productId) => {
    //     const soldQuantity = orderHistory.reduce((total, order) => {
    //         // check all products in the orderHistory based on their productId
    //         const productSold = order.purchaseInfo.products.find(
    //             (product) => product.perfumeID === productId,
    //         );
    //         // if it exists, increase the quantity
    //         return productSold ? total + productSold.quantity : total;
    //     }, 0);
    //     return soldQuantity;
    // };

    // const soldQuantity = 1;
    // const soldQuantity = getSoldQuantity(perfume.perfumeID);
    console.log('soldQuantity: ', soldQuantity);

    return (
        <Container
            sx={{
                mt: 18,
                [mobileScreen]: {
                    mt: 16,
                },
            }}
        >
            <Grid container>
                <Grid
                    container
                    item
                    spacing={4}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ height: '600px', p: 1 }}
                >
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box>
                            <Box
                                sx={{
                                    height: '400px',
                                    // width: '400px',
                                    bgcolor: theme.palette.background.main,
                                    borderRadius: '8px',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* discount must !== 0 */}
                                {perfume.perfumeDiscount !== 0 && (
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
                                        {/* - 15% */}- {perfume.perfumeDiscount}%
                                    </Box>
                                )}

                                <IconButton
                                    onClick={handlePrevious}
                                    sx={{
                                        [mobileScreen]: {
                                            position: 'absolute',
                                            top: '50%',
                                            left: '-2%',
                                        },
                                    }}
                                >
                                    <ArrowBackIosIcon
                                        sx={{
                                            fontSize: '28px',
                                            color: '#fff',
                                            '&:hover': {
                                                color: theme.palette.text.primary.primary,
                                            },
                                        }}
                                    />
                                </IconButton>
                                <Box
                                    component={'img'}
                                    // src={perfume.perfumeImage}
                                    src={perfume.quickViewImage[selectedImage]}
                                    sx={{
                                        height: '100%',
                                        objectFit: 'cover',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                        [tabletScreen]: {
                                            width: '75%',
                                        },
                                        [mobileScreen]: {
                                            width: '100%',
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

                            <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
                                {perfume.quickViewImage.map((image, index) => (
                                    <Box
                                        key={index}
                                        alt="Quick View Image"
                                        component={'img'}
                                        src={
                                            // 'https://res.cloudinary.com/dxulhqdp3/image/upload/v1724161759/perfumes/men/Homme_Intense_zw7zee.png'
                                            image
                                        }
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
                    <Grid item sm={6} md={6} lg={6}>
                        {/* product name */}
                        <CustomizeTypography sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                            {/* Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum */}
                            {perfume.perfumeName}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>Thương hiệu: </strong>
                            <span>{perfume.brand}</span>
                            {/* <span>Maison Francis Kurkdjian Paris</span> */}
                        </CustomizeTypography>
                        <CustomizeTypography>
                            <strong>Tình trạng: </strong>
                            <span
                                style={{
                                    color:
                                        perfume.perfumeQuantity !== 0
                                            ? theme.palette.text.verified
                                            : theme.palette.text.primary,
                                    fontWeight: 'bold',
                                }}
                            >
                                {perfume.perfumeQuantity !== 0 ? 'Còn hàng' : 'Hết Hàng'}
                            </span>
                        </CustomizeTypography>

                        <CustomizeTypography>
                            {/* Hương thơm sang trọng và độc đáo, lý tưởng cho những dịp đặc biệt và
                            tiệc tối đẳng cấp. */}
                            {perfume.shortDescription}
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
                                (2 đánh giá)
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
                            <CustomizeTypography sx={{ ml: 1 }}>
                                đã bán {soldQuantity}
                            </CustomizeTypography>
                        </Box>

                        <Box
                            sx={{
                                backgroundImage: ` linear-gradient(-90deg, #f0451e 9%, #f32424 96%)`,
                                height: '40px',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '4px',
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            <Box
                                component={'img'}
                                alt="Flash Sale"
                                src={
                                    'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/dea74facf15efdbdb982.svg'
                                }
                                sx={{ height: '20px' }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                    sx={{ height: '20px', width: '20px', mr: 1 }}
                                    component={'img'}
                                    alt="Counter"
                                    src={
                                        'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/db37ab11d87a41f61b7d.svg'
                                    }
                                />
                                <CustomizeTypography sx={{ mb: 0 }}>ENDS IN</CustomizeTypography>
                                <CountdownTimer />
                            </Box>
                        </Box>

                        {/* Price */}
                        <Box sx={{ display: 'flex' }}>
                            {/* original price */}
                            <CustomizeTypography
                                sx={{
                                    textDecoration: perfume.discount ? 'line-through' : null,
                                    fontWeight: 'bold',
                                }}
                            >
                                {/* 10.500.000 ₫ */}
                                {/* {converToVND(perfume.perfumePriceVND)} */}
                                {converToVND(selectedSize.perfumePrice)}
                            </CustomizeTypography>
                            {/* price sale off */}
                            {perfume.discount && perfume.perfumePriceDiscount !== null && (
                                <CustomizeTypography
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        ml: 2,
                                    }}
                                >
                                    {/* 9.980.000 ₫ */}
                                    {converToVND(perfume.perfumePriceDiscount)}
                                </CustomizeTypography>
                            )}
                        </Box>

                        {/* Product Size */}
                        <Box sx={{ display: 'flex' }}>
                            {perfume.perfumeGroupSize.map((size, index) => (
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
                                    onClick={() => handleSizeSelected(size)}
                                >
                                    <Box>
                                        <CustomizeTypography
                                            sx={{
                                                mb: 0,
                                                fontSize: '12.5px',
                                                fontWeight: 'bold',
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            {size.perfumeSize} ml
                                        </CustomizeTypography>
                                        <CustomizeTypography sx={{ mb: 0, fontSize: '12px' }}>
                                            {converToVND(size.perfumePrice)}
                                        </CustomizeTypography>
                                    </Box>
                                    {selectedSize.perfumeSize === size.perfumeSize && (
                                        <IconButton>
                                            <CheckIcon
                                                sx={{ color: '#18920D', fontSize: '18px' }}
                                            />
                                        </IconButton>
                                    )}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <CustomizeButtonOutlined
                                textAction={'Add to cart'}
                                onHandleClick={() => handleAddProduct(perfume)}
                            />
                            {/* <CustomizeButton textAction={'Add to cart'} /> */}
                            <Box sx={{ ml: 2 }}>
                                <CustomizeButton textAction={'Buy Now'} />
                            </Box>
                        </Box>
                        <Divider sx={{ bgcolor: '#fff', my: 4 }} />
                        {/* for membership */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* ..... don't know what is it :) */}
                            <Avatar
                                sx={{ height: '15px', width: '15px', mr: 1, mb: 1 }}
                                src={'https://orchard.vn/wp-content/uploads/2018/04/red-dot.gif'}
                            />
                            <CustomizeTypography>
                                <strong
                                    style={{
                                        textTransform: 'uppercase',
                                        textDecoration: 'underline',
                                        color: theme.palette.text.main,
                                    }}
                                >
                                    membership:
                                </strong>
                                <span> Giá đặc biệt dành cho khách hàng thân thiết</span>
                            </CustomizeTypography>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <TextFieldCustomize placeholder={'Enter phone number...'} />
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
                                Check
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={'success'}
                        msgTitle={'Add product'}
                        msgContent={'Product added to cart!'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default PerfumeDetail;
