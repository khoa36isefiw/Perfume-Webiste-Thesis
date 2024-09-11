import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Avatar,
    IconButton,
    styled,
    Button,
} from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { addressApi } from '../api/addressApi';
import SelectAddress from '../SelectAddress/SelectAddress';
import CreditCard from '../CreditCard/CreditCard';
import { theme } from '../../Theme/Theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { PayPalButton } from 'react-paypal-button-v2';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import CloseIcon from '@mui/icons-material/Close';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useDispatch, useSelector } from 'react-redux';
import CartTotal from '../Cart/CartTotal';
import { converToVND } from '../convertToVND/convertToVND';
import { removeProduct } from '../../redux/feature/CartManagement/CartManagementSlice';
import { CustomizeDividerVertical } from '../CustomizeDivider/CustomizeDivider';

function CheckoutInformation() {
    const dispatch = useDispatch();
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWardTown, setListWardTown] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(''); // return province_id
    const [selectedDistrict, setSelectedDistrict] = useState(''); // return district_id
    const [selectedWardTown, setSelectedWardTown] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method
    const [showNotification, setShowNotification] = useState(false);

    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');

    // get product in cart
    const listProductInCart = useSelector((state) => state.cartManagement.productInfor);

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
                const getDistrictFromProvince = await addressApi.getDistrictApi(selectedProvince);
                setListDistrict(getDistrictFromProvince.results);
            };
            fetchDistrict();
        }
    }, [selectedProvince]);

    // get town, ward from district_id
    useEffect(() => {
        if (selectedProvince && selectedDistrict) {
            const fetchWardTown = async () => {
                const getDistrictFromProvince = await addressApi.getWardTownApi(selectedDistrict);
                setListWardTown(getDistrictFromProvince.results);
            };
            fetchWardTown();
        }
    }, [selectedProvince, selectedDistrict]);

    // show notification
    const handleShowNotification = () => {
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
    };
    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    console.log('product: ', listProductInCart);

    return (
        <Container sx={{ position: 'relative' }}>
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
                <Grid item lg={6}>
                    <Box sx={{ minHeight: '200px', p: 2 }}>
                        <CustomizeTypography sx={{ color: 'white' }}>
                            Địa chỉ thanh toán và vận chuyển
                        </CustomizeTypography>
                        <CustomizeCheckoutInput placeholder="Nhập số điện thoại" />
                        <CustomizeCheckoutInput placeholder="Nhập họ tên" />
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
                        <CustomizeCheckoutInput placeholder="Nhập địa chỉ nhà cụ thể. Số nhà, tên đường..." />
                    </Box>
                    {/* Thanh toán */}
                    <Box sx={{ mt: 4 }}>
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
                            <Box sx={{ mt: 2, width: '200px' }}>
                                <CustomizeButtonInCart
                                    variant="outlined"
                                    textAction="Checkout"
                                    // show animation
                                    isReverseAnimation={false}
                                    fullWidth={false}
                                    onHandleClick={handleShowNotification}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ bgcolor: '#555', minHeight: '200px', p: 2, borderRadius: 1 }}>
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
                                        <Box sx={{ width: '80%', flexWrap: 'wrap' }}>
                                            <CustomizeTypography
                                                sx={{
                                                    mb: 0,
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: theme.palette.text.secondary,
                                                }}
                                            >
                                                {/* Versace Eros EDT - 100 ml */}
                                                {product.perfumeName}
                                            </CustomizeTypography>
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
                                                Size: 150ml
                                            </CustomizeTypography>
                                            <CustomizeTypography sx={{ fontSize: '14px', mb: 0 }}>
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
                        <CartTotal productsList={listProductInCart} />
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

const CustomizeCheckoutInput = ({ placeholder, value }) => {
    return (
        <TextField
            value={value}
            placeholder={placeholder}
            fullWidth
            sx={{
                mb: 2,
                '.MuiInputBase-root': {
                    fontSize: '14px',
                    height: '40px',
                    color: 'white',
                },
                '& .MuiFormHelperText-root': {
                    fontSize: '12.5px',
                    color: 'red',
                    mx: 1,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#555',
                    },
                    '&:hover fieldset': {
                        borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#fff',
                    },
                },
            }}
        />
    );
};

export const CheckoutContainer = styled(Box)(({}) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
}));
