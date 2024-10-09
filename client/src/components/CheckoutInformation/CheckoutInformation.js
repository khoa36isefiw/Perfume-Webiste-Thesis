import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Avatar,
    IconButton,
    Button,
} from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { addressApi } from '../../api/addressApi';
import SelectAddress from '../SelectAddress/SelectAddress';
import CreditCard from '../CreditCard/CreditCard';
import { mobileScreen, theme } from '../../Theme/Theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { PayPalButton } from 'react-paypal-button-v2';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import CloseIcon from '@mui/icons-material/Close';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useDispatch, useSelector } from 'react-redux';
import CartTotal from '../Cart/CartTotal';
import { converToVND } from '../convertToVND/convertToVND';
import { clearCart, removeProduct } from '../../redux/feature/CartManagement/CartManagementSlice';
import { CustomizeDividerVertical } from '../CustomizeDivider/CustomizeDivider';
import { CustomizeCheckoutInput } from './CustomizeCheckoutInput';
import { saveOrders } from '../../redux/feature/CheckoutManagement/CheckoutManagementSlice';

function CheckoutInformation() {
    const dispatch = useDispatch();
    const [informationSaved, setInformationSaved] = useState({});
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWardTown, setListWardTown] = useState([]);
    // component parent
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeApplied, setPromoCodeApplied] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState(''); // return object contains {province_id, province_name}
    const [selectedDistrict, setSelectedDistrict] = useState(''); // return district_id
    const [selectedWardTown, setSelectedWardTown] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method
    const [showNotification, setShowNotification] = useState(false);

    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

    // get product in cart
    const listProductInCart = useSelector((state) => state.cartManagement.productInfor);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    // console.log('current information: ', loggedInAccount);
    console.log('current product information: ', listProductInCart);

    // get province
    useEffect(() => {
        const fetchProvinces = async () => {
            const provinceList = await addressApi.getProvinceApi();
            setListProvince(provinceList.results);
        };
        fetchProvinces();
    }, []);

    // get district from province_id
    useEffect(() => {
        if (selectedProvince) {
            const fetchDistrict = async () => {
                const getDistrictFromProvince = await addressApi.getDistrictApi(
                    selectedProvince.id,
                );
                setListDistrict(getDistrictFromProvince.results);
            };
            fetchDistrict();
        }
    }, [selectedProvince]);

    // get town, ward from district_id
    useEffect(() => {
        if (selectedProvince && selectedDistrict) {
            const fetchWardTown = async () => {
                const getDistrictFromProvince = await addressApi.getWardTownApi(
                    selectedDistrict.id,
                );
                setListWardTown(getDistrictFromProvince.results);
            };
            fetchWardTown();
        }
    }, [selectedProvince, selectedDistrict]);

    // checkout and show notification
    const handleCheckout = () => {
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');

        // calculate the subtotal (sum of all products in the cart)
        const subtotal = listProductInCart.reduce(
            (accumulator, product) => accumulator + product.quantity * product.perfumePrice,
            0,
        );

        console.log('subtotal: ', subtotal);

        const calculateDiscount = (subtotal) => subtotal * 0.2; // 20%
        const calculateTax = (subtotal) => subtotal * 0.1; // 10%

        const discount = calculateDiscount(subtotal);
        const tax = calculateTax(subtotal);

        // final total: subtotal - discount + tax
        let finalTotal = subtotal - discount + tax;

        // optional: apply promotion code --> discount 5%
        if (promoCodeApplied && promoCode === 'UTE99') {
            finalTotal *= 0.95; // Apply 5% discount
        }

        // round final total to 2 decimal places
        finalTotal = Math.round(finalTotal * 100) / 100;

        console.log('final price: ' + finalTotal);

        // Create the checkout object for the current purchase
        // temporary checkout object
        const currentCheckout = {
            orderId: `${new Date().getTime()}`,
            paymentMethod,
            user: {
                name: loggedInAccount?.firstName + ' ' + loggedInAccount?.lastName,
                email: loggedInAccount?.email,
                phone: loggedInAccount?.phoneNumber,
                address: loggedInAccount?.address,
                shipTo:
                    selectedProvince.name +
                    ', ' +
                    selectedDistrict.name +
                    ', ' +
                    selectedWardTown.name,
            },
            products: listProductInCart.map((product) => ({
                productId: product.perfumeID,
                name: product.perfumeName,
                image: product.perfumeImage,
                quantity: product.quantity,
                size: product.perfumeSize,
                price: product.quantity * product.perfumePrice,
                brand: product.perfumeBrand,
            })),
            totalPrice: finalTotal,
            // add timestamp for when the purchase was made
            timestamp: new Date().toISOString(),
            // test for commenting
            isCommented: false,
        };

        // Step 2: retrieve the existing saved information from the state
        const existingData = { ...informationSaved };

        // step 3: update the saved information with the new order
        if (existingData[loggedInAccount?.userId]) {
            // exist
            // if the user already has previous orders, add the new one
            existingData[loggedInAccount?.userId].push(currentCheckout);
        } else {
            //not existed yet
            // the user's first purchase, create a new array with the current order
            existingData[loggedInAccount?.userId] = [currentCheckout];
        }

        // final step: save the updated information back into state
        setInformationSaved(existingData);
        dispatch(
            saveOrders({
                userId: loggedInAccount?.userId,
                purchaseInfo: currentCheckout,
                // productId:
            }),
        );

        dispatch(clearCart());

        console.log('All saved information: ', existingData);
    };

    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    return (
        <Container
            sx={{
                position: 'relative',
                mt: 20,
                [mobileScreen]: {
                    mt: 16,
                },
            }}
        >
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button
                        // back to the previous page
                        onClick={() => window.history.back(-1)}
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
                        Back to Cart
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box
                        sx={{
                            minHeight: '200px',
                            p: 2,
                            [mobileScreen]: {
                                p: 0,
                            },
                        }}
                    >
                        <CustomizeTypography sx={{ color: 'white' }}>
                            Địa chỉ thanh toán và vận chuyển
                        </CustomizeTypography>
                        <CustomizeCheckoutInput
                            placeholder="Nhập số điện thoại"
                            value={loggedInAccount?.phoneNumber}
                        />
                        <CustomizeCheckoutInput
                            placeholder="Nhập họ tên"
                            value={loggedInAccount?.firstName + ' ' + loggedInAccount?.lastName}
                        />
                        <SelectAddress
                            type="province"
                            select={'Chọn Tỉnh/Thành phố'}
                            listData={listProvince}
                            setSelectedProvince={setSelectedProvince}
                        />
                        <SelectAddress
                            type="district"
                            select={'Chọn Quận/Huyện'}
                            listData={listDistrict}
                            setSelectedProvince={setSelectedDistrict}
                        />
                        <SelectAddress
                            type="town"
                            select={'Chọn Xã/Phường/Thị trấn'}
                            listData={listWardTown}
                            selectedProvince={selectedWardTown}
                            setSelectedProvince={setSelectedWardTown}
                        />
                        <CustomizeCheckoutInput
                            placeholder="Nhập địa chỉ nhà cụ thể. Số nhà, tên đường..."
                            value={loggedInAccount?.address}
                        />
                    </Box>
                    {/* Thanh toán */}
                    <Box
                        sx={{
                            mt: 4,
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    >
                        <CustomizeTypography sx={{ fontSize: '32px' }}>
                            Thanh toán
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '16px' }}>
                            Tất cả các giao dịch đều được bảo mật và mã hóa
                        </CustomizeTypography>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <CustomizeTypography sx={{ fontSize: '16px' }}>
                                Chọn phương thức thanh toán
                            </CustomizeTypography>

                            <RadioGroup
                                aria-label="payment-method"
                                name="payment-method"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    value="cod"
                                    control={
                                        <Radio
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                '&.Mui-checked': {
                                                    color: theme.palette.text.secondary,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 24,
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <span style={{ color: 'white', fontSize: '16px' }}>
                                            Thanh toán khi nhận hàng (COD)
                                        </span>
                                    }
                                />
                                <FormControlLabel
                                    value="credit-card"
                                    control={
                                        <Radio
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                '&.Mui-checked': {
                                                    color: theme.palette.text.secondary,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 24,
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <span style={{ color: 'white', fontSize: '16px' }}>
                                            Thanh toán bằng thẻ tín dụng
                                        </span>
                                    }
                                />
                                <FormControlLabel
                                    value="paypal"
                                    control={
                                        <Radio
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                '&.Mui-checked': {
                                                    color: theme.palette.text.secondary,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 24,
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <span style={{ color: 'white', fontSize: '16px' }}>
                                            Thanh toán Paypal
                                        </span>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'credit-card' && (
                            // {paymentMethod === 'cod' && (
                            <Box sx={{ mt: 3 }}>
                                <CreditCard />
                            </Box>
                        )}
                        {paymentMethod === 'paypal' ? (
                            // {paymentMethod === 'cod' && (
                            <Box sx={{ mt: 3, bgcolor: '#fff' }}>
                                {/* <PayPalButton
                                    amount="0.01"
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        alert(
                                            'Transaction completed by ' +
                                                details.payer.name.given_name,
                                        );

                                        // OPTIONAL: Call your server to save the transaction
                                        return fetch('/paypal-transaction-complete', {
                                            method: 'post',
                                            body: JSON.stringify({
                                                orderID: data.orderID,
                                            }),
                                        });
                                    }}
                                    onError={() => alert('Transaction failed!')}
                                /> */}
                                ahiahi
                            </Box>
                        ) : (
                            //button check out COD
                            <Box sx={{ mt: 2, width: '200px' }}>
                                <CustomizeButtonInCart
                                    variant="outlined"
                                    textAction="Order"
                                    // show animation
                                    isReverseAnimation={false}
                                    fullWidth={false}
                                    onHandleClick={handleCheckout}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box
                        sx={{
                            bgcolor: '#555',
                            minHeight: '200px',
                            p: 2,
                            borderRadius: 1,
                            [mobileScreen]: {
                                p: 1,
                            },
                        }}
                    >
                        {listProductInCart.map((product, index) => (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={product.perfumeImage}
                                            sx={{
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: 1,
                                                bgcolor: '#fff',
                                                mr: 1,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                width: '80%',
                                                flexWrap: 'wrap',
                                                [mobileScreen]: {
                                                    width: '100%',
                                                },
                                            }}
                                        >
                                            <CustomizeTypography
                                                sx={{
                                                    mb: 0,
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: theme.palette.text.secondary,
                                                    [mobileScreen]: {
                                                        fontSize: '14px',
                                                    },
                                                }}
                                            >
                                                {/* Versace Eros EDT - 100 ml */}
                                                {product.perfumeName}
                                            </CustomizeTypography>
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '13px',
                                                    mb: 0,
                                                    [mobileScreen]: {
                                                        fontSize: '12.5px',
                                                    },
                                                }}
                                            >
                                                Size: {product.perfumeSize}ml
                                            </CustomizeTypography>
                                            <CustomizeTypography
                                                sx={{
                                                    fontSize: '13px',
                                                    mb: 0,
                                                    [mobileScreen]: {
                                                        fontSize: '12.5px',
                                                    },
                                                }}
                                            >
                                                {converToVND(product.perfumePrice)}
                                            </CustomizeTypography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                dispatch(removeProduct(product.perfumeID))
                                            }
                                        >
                                            <CloseIcon sx={{ fontSize: '24px', color: 'white' }} />
                                        </IconButton>
                                        <CustomizeTypography
                                            sx={{
                                                fontSize: '14px',
                                                mb: 0,
                                                mr: 1,
                                                color: theme.palette.text.secondary,
                                                [mobileScreen]: {
                                                    fontSize: '12.5px',
                                                },
                                            }}
                                        >
                                            <strong>Qty:</strong> {product.quantity}
                                        </CustomizeTypography>
                                    </Box>
                                </Box>
                                {index !== listProductInCart.length - 1 && (
                                    <CustomizeDividerVertical />
                                )}
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <CartTotal
                            productsList={listProductInCart}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            promoCodeApplied={promoCodeApplied}
                            setPromoCodeApplied={setPromoCodeApplied}
                        />
                    </Box>
                </Grid>
            </Grid>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={'success'}
                        msgTitle={'Buy products'}
                        msgContent={'Checkout successfully!'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default CheckoutInformation;
