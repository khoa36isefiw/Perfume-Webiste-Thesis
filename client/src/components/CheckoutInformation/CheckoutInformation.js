import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Avatar,
    Button,
} from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import { mobileScreen, theme } from '../../Theme/Theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { PayPalButton } from 'react-paypal-button-v2';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';

import { useDispatch } from 'react-redux';
import CartTotal from '../Cart/CartTotal';
import { converToVND } from '../convertToVND/convertToVND';
import { CustomizeDividerVertical } from '../CustomizeDivider/CustomizeDivider';
import { CustomizeCheckoutInput } from './CustomizeCheckoutInput';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalButtonsComponents from '../PayPalButtonComponents/PayPalButtonComponents';
import { paymentAPI } from '../../api/paymentAPI';
import { PAYMENT_METHOD } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import DeliveryAnimation from '../DeliveryAnimation/DeliveryAnimation';

function CheckoutInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { items } = location.state || { items: [] };
    // console.log('items:', items);
    const { t, i18n } = useTranslation('translate');

    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification

    const userData = useState(JSON.parse(window.localStorage.getItem('user_data')));
    const [email, setEmail] = useState(userData[0]?.email || '');
    const [phoneNumber, setphoneNumber] = useState(userData[0]?.phoneNumber || '');
    const [address, setAddress] = useState(userData[0]?.address || '');

    // console.log('userData: ',userData);
    const getListProductSelected =
        JSON.parse(window.localStorage.getItem('list_product_selected')) || [];
    // console.log('getListProductSelected: ', getListProductSelected);

    // component parent
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeApplied, setPromoCodeApplied] = useState({
        isApplied: false,
        codeApplied: null,
    });
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method
    const userId = JSON.parse(window.localStorage.getItem('user_data'))?.userId;

    // test animation
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [animation, setAnimation] = useState(false);

    console.log('userId: ', userId);

    console.log('promoCode:', promoCode);
    const handleCheckout = async () => {
        const promotionCodeApplied = promoCodeApplied?.codeApplied?.code || '';
        console.log('promotionCodeApplied: ', promotionCodeApplied);
        if (email !== '' && address !== '' && phoneNumber !== '') {
            if (paymentMethod === 'VNPAY') {
                const response = await paymentAPI.createOrder(
                    userId,
                    items,
                    address,
                    email,
                    phoneNumber,
                    promotionCodeApplied,
                    PAYMENT_METHOD.VNPAY,
                );

                console.log('response vnpay:', response);
                if (response.data?.vnpUrl) {
                    console.log('response: ', response);
                    window.location.href = response.data.vnpUrl;
                }
            } else {
                const response = await paymentAPI.createOrder(
                    userId,
                    getListProductSelected,
                    address,
                    email,
                    phoneNumber,
                    promotionCodeApplied,
                    PAYMENT_METHOD.COD,
                );

                if (response.data?.order) {
                    console.log('response: ', response?.data);
                    // remove user cart in local storage
                    window.localStorage.removeItem('list_product_selected');
                    const dataShowInvoice = {
                        userName: userData[0].firstName + ' ' + userData[0].lastName,
                        userPhoneNumber: phoneNumber,
                        userAddress: address,
                        userPaymentType: 'COD',
                    };
                    showNotificationMessage(
                        'success',
                        t('common.notifyMessage.checkout.cT'),
                        t('common.notifyMessage.checkout.cS'),
                    );
                    // animation
                    setAnimation(true);
                    // checkout checking
                    setIsCheckingOut(true);
                    setTimeout(() => {
                        setAnimation(false);
                        setIsCheckingOut(false);
                        navigate(`/${i18n.language}/success?Ref=${response.data.order._id}`);
                    }, 3000);
                    window.localStorage.setItem('payment_data', JSON.stringify(dataShowInvoice));
                    window.localStorage.setItem(
                        'order_id',
                        JSON.stringify(response.data.order._id),
                    ); // store pay_ref Id to local storage
                }
            }
        } else {
            showNotificationMessage(
                'warning',
                t('common.notifyMessage.checkout.cT'),
                t('common.notifyMessage.checkout.cW'),
            );
        }
    };

    useEffect(() => {
        if (!isCheckingOut && getListProductSelected.length === 0) {
            navigate(`/${i18n.language}/shop`);
        }
    }, [getListProductSelected, isCheckingOut]);
    if (animation) {
        console.log('chay vo day');
        return <DeliveryAnimation />;
    }

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
            {/* <DeliveryAnimation /> */}
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
                        {t('common.checkout.backCart')}
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
                            {t('common.checkout.address')}
                        </CustomizeTypography>
                        <CustomizeCheckoutInput
                            // placeholder="Nhập họ tên"
                            placeholder={t('common.checkout.infor.name')}
                            value={email}
                            onHandleChange={(e) => setEmail(e.target.value)} // if value is changed
                        />
                        <CustomizeCheckoutInput
                            // placeholder="Nhập số điện thoại"
                            placeholder={t('common.checkout.infor.phone')}
                            value={phoneNumber}
                            onHandleChange={(e) => setphoneNumber(e.target.value)} // if value is changed
                        />

                        <CustomizeCheckoutInput
                            // placeholder="Nhập địa chỉ nhà cụ thể. Số nhà, tên đường..."
                            placeholder={t('common.checkout.infor.address')}
                            value={address}
                            onHandleChange={(e) => setAddress(e.target.value)} // if value is changed
                        />
                    </Box>
                    {/* Thanh toán */}
                    <Box
                        sx={{
                            mt: 2,
                            [mobileScreen]: {
                                width: '100%',
                            },
                        }}
                    >
                        <CustomizeTypography sx={{ fontSize: '32px' }}>
                            {t('common.checkout.checkout')}
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '16px' }}>
                            {t('common.checkout.title')}
                        </CustomizeTypography>
                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <CustomizeTypography sx={{ fontSize: '16px' }}>
                                {t('common.checkout.paymentNoti')}
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
                                            {t('common.checkout.cod')}
                                        </span>
                                    }
                                />
                                <FormControlLabel
                                    value="VNPAY"
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
                                            {t('common.checkout.vnpay')}
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
                                            {t('common.checkout.paypal')}
                                        </span>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'paypal' ? (
                            // {paymentMethod === 'cod' && (
                            <Box sx={{ mt: 3 }}>
                                <PayPalButtonsComponents
                                    user={userId}
                                    items={getListProductSelected}
                                    promotionCode={promoCodeApplied}
                                    address={address}
                                    email={email}
                                    phoneNumber={phoneNumber}
                                />
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
                        {getListProductSelected.length > 0 &&
                            getListProductSelected.map((product, index) => (
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
                                                src={product.product.imagePath[0]}
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
                                                    {product.product.nameEn}
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
                                                    Size: {product.variant.size}
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
                                                    {product.variant.discountPercent !== 0
                                                        ? converToVND(product.variant.priceSale)
                                                        : converToVND(product.variant.price)}
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
                                                <strong>{t('common.checkout.qty')}:</strong>{' '}
                                                {product.quantity}
                                            </CustomizeTypography>
                                        </Box>
                                    </Box>
                                    {index !== getListProductSelected.length - 1 && (
                                        <CustomizeDividerVertical />
                                    )}
                                </Box>
                            ))}
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <CartTotal
                            productsList={getListProductSelected}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            promoCodeApplied={promoCodeApplied}
                            setPromoCodeApplied={setPromoCodeApplied}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default CheckoutInformation;
