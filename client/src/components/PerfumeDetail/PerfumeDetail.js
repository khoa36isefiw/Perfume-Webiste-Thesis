import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { quickViewImage } from './perfumeDetailData';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart,
    increaseQuantity,
} from '../../redux/feature/CartManagement/CartManagementSlice';
import { converToVND } from '../convertToVND/convertToVND';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import CheckIcon from '@mui/icons-material/Check';
import { ordersAPI } from '../../api/ordersAPI';
import { userAPI } from '../../api/userAPI';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';

function PerfumeDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || null;
    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    // get the perfume data passed from navigation
    const { perfume } = location.state || {};
    const [selectedSize, setSelectedSize] = useState(perfume.variants[0].size);

    // get list product added to cart
    const cartItems = useSelector((state) => state.cartManagement.productInfor);

    // Hàm selector để lấy số lượng sản phẩm đã bán theo productId
    const selectSoldQuantityByProductId = (state, productId) => {
        const productInfo = state.checkoutManagement.listOrdersBasedOnProduct[productId];
        return productInfo ? productInfo.quantitySold : 0;
    };
    console.log('perfume', perfume);
    // Sử dụng trong component
    const productId = perfume._id;
    const soldQuantity = useSelector((state) => selectSoldQuantityByProductId(state, productId));

    const [selectedImage, setSelectedImage] = React.useState(0);
    // get length of comment list for each product
    const commentsList = useSelector(
        (state) => state.commentsManagement.listComments[perfume.perfumeID] || [], // get data follow their productId
    );

    const handleNext = () => {
        // Check if current image is the last one
        if (selectedImage < perfume.imagePath.length - 1) {
            setSelectedImage((prevIndex) => prevIndex + 1); // Move to the next image
        }
    };

    const handlePrevious = () => {
        // Check if current image is the first one
        if (selectedImage > 0) {
            setSelectedImage((prevIndex) => prevIndex - 1); // Move to the previous image
        }
    };

    useEffect(() => {}, [perfume]);

    // khi add to cart --> thì sẽ chạy .create order,
    // with status: inshoppingcart

    // const handleAddProduct = (productInfor) => {
    //     const existingItem = cartItems.find(
    //         (item) =>
    //             item.perfumeID === productInfor.perfumeID &&
    //             item.perfumeSize === productInfor.perfumeSize,
    //     );
    //     const productToDispatch = {
    //         perfumeID: productInfor.perfumeID,
    //         perfumeName: productInfor.perfumeName,
    //         // perfumePrice: productInfor.perfumePriceVND,
    //         perfumeSize: selectedSize.perfumeSize,
    //         perfumePrice: selectedSize.perfumePrice,
    //         perfumePriceDiscount: productInfor.perfumePriceDiscount,
    //         perfumeImage: productInfor.perfumeImage,
    //         perfumeBrand: productInfor.perfumeBrand,
    //         perfumeQuantity: 1,
    //     };

    //     // check, is product existed in cart items?
    //     if (cartItems !== null) {
    //         // exists in cart items
    //         if (existingItem) {
    //             console.log('chạy vô đây không');
    //             dispatch(increaseQuantity(productInfor.perfumeID, productInfor.perfumeSize));
    //         } else {
    //             console.log('chạy vô đây');

    //             dispatch(addToCart({ ...productToDispatch }));
    //         }
    //         setShowNotification(true);
    //         setShowAnimation('animate__bounceInRight');
    //     }
    // };

    // create order with status and api
    // const handleAddProduct = async (productInfor) => {
    //     const existingItem = cartItems.find(
    //         (item) =>
    //             item.perfumeID === productInfor.perfumeID &&
    //             item.perfumeSize === productInfor.perfumeSize,
    //     );
    //     const productToDispatch = {
    //         perfumeID: productInfor.perfumeID,
    //         perfumeName: productInfor.perfumeName,
    //         // perfumePrice: productInfor.perfumePriceVND,
    //         perfumeSize: selectedSize.perfumeSize,
    //         perfumePrice: selectedSize.perfumePrice,
    //         perfumePriceDiscount: productInfor.perfumePriceDiscount,
    //         perfumeImage: productInfor.perfumeImage,
    //         perfumeBrand: productInfor.perfumeBrand,
    //         perfumeQuantity: 1,
    //     };

    //     //         const orderInformation = {
    //     // userId:userData._id,
    //     // items:, //
    //     // totalPrice:,

    //     // status:'InShoppingCart',

    //     //         }

    //     const createOrder = await ordersAPI.createOrder();

    //     // check, is product existed in cart items?
    //     if (cartItems !== null) {
    //         // exists in cart items
    //         if (existingItem) {
    //             console.log('chạy vô đây không');
    //             dispatch(increaseQuantity(productInfor.perfumeID, productInfor.perfumeSize));
    //         } else {
    //             console.log('chạy vô đây');

    //             dispatch(addToCart({ ...productToDispatch }));
    //         }
    //         setShowNotification(true);
    //         setShowAnimation('animate__bounceInRight');
    //     }
    // };

    const handleAddProduct = async () => { // add to cart, when users moving to cart --> get user byID get all information
        if (userData) {
            const userId = userData.userId; // id user here
            const mockData = {
                product: perfume?._id, // id product here
                variant: '67148e73e24c52831551db7e', // id variant here
                quantity: 1,
                // productName, productImage
                // productName: perfume.nameEn,
                // productImage: perfume?.imagePath[0],
            };
            const result = await userAPI.addProductToCart(userId, mockData);
            console.log('product information: ', result.data);
            if (result) {
                // window.localStorage.setItem('cart', JSON.stringify(result.data));
                window.localStorage.setItem(
                    'cart',
                    JSON.stringify({
                        userId: result.data?._id,
                        cart: result.data?.cart,
                        email: result.data.email,
                        firstName: result.data.firstName,
                        lastName: result.data.lastName,
                        imagePath: result.data.imagePath,
                        phoneNumber: result.data.phoneNumber,
                    }),
                );
                showMessage(
                    'success',
                    'Add to cart',
                    'The product has been successfully added to cart!',
                );
            }
        } else {
            showMessage('warning', 'Add to cart', 'Must log into the system!');
            setTimeout(() => {
                navigate('/sign-in');
            }, 2800);
        }
    };

    const handleSizeSelected = (index) => {
        // setSelectedSize(size);
        selectedSize(perfume.variants[index].size);
    };

    console.log('selectedSize: ', selectedSize);

    // calculating the average rating
    const calculateAverageRating = () => {
        if (commentsList.length === 0) return 0; // doesn't have rating
        // calculate total of rating value from comment list
        const totalRating = commentsList.reduce((acc, comment) => acc + comment.ratingValue, 0);
        return (totalRating / commentsList.length).toFixed(1);
    };

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
                                {perfume?.perfumeDiscount !== 0 && (
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
                                    src={perfume.imagePath[selectedImage]}
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
                                    disabled={selectedImage === quickViewImage.length - 1}
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
                                {perfume.imagePath.map((image, index) => (
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
                    <Grid item sm={6} md={6} lg={6}>
                        {/* product name */}
                        <CustomizeTypography sx={{ mb: 1, fontSize: '20px', fontWeight: 'bold' }}>
                            {/* Maison Francis Kurkdjian Paris Baccarat Rouge 540 Extrait De Parfum */}
                            {perfume.nameEn}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ mb: 1 }}>
                            <strong>Thương hiệu: </strong>
                            <span>{perfume.brand.nameEn}</span>
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
                            {calculateAverageRating() > 0 && (
                                <CustomizeTypography>
                                    {calculateAverageRating()}
                                </CustomizeTypography>
                            )}

                            <Rating
                                readOnly
                                value={calculateAverageRating()}
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
                                ({commentsList.length > 0 ? commentsList.length : 0} đánh giá)
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

                        {/* flash sale */}
                        {/* <Box
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
                        </Box> */}

                        {/* Price */}
                        <Box sx={{ display: 'flex' }}>
                            {/* original price */}

                            <CustomizeTypography
                                sx={{
                                    textDecoration: perfume.discount ? 'line-through' : null,
                                    fontWeight: 'bold',
                                }}
                            >
                                {/* {converToVND(perfume.perfumePriceVND)} */}
                                {/* {converToVND(selectedSize.perfumePrice)} */}
                                10.500.000 ₫
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
                            {perfume.variants.map((size, index) => (
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
                                onHandleClick={() => handleAddProduct()}
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
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default PerfumeDetail;
