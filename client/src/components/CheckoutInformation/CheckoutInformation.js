// import { Box, Container, Grid, TextField } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
// import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';

// import { addressApi } from '../api/addressApi';
// import SelectAddress from '../SelectAddress/SelectAddress';

// function CheckoutInformation() {
//     const [listProvince, setListProvince] = useState([]);
//     const [listDistrict, setListDistrict] = useState([]);
//     const [listWardTown, setListWardTown] = useState([]);
//     const [selectedProvince, setSelectedProvince] = useState(''); // return province_id
//     const [selectedDistrict, setSelectedDistrict] = useState(''); // return district_id
//     const [selectedWardTown, setSelectedWardTown] = useState('');

//     // get province
//     useEffect(() => {
//         const fetchProvinces = async () => {
//             const provinceList = await addressApi.getProvinceApi();
//             // console.log('provinceList: ', provinceList);
//             setListProvince(provinceList.results);
//         };
//         fetchProvinces();
//     }, []);

//     console.log('selectedProvince: ', selectedProvince);

//     // get district from province_id
//     useEffect(() => {
//         if (selectedProvince) {
//             console.log('chạy vô đây nè');
//             const fetchDistrict = async () => {
//                 const getDistrictFromProvince = await addressApi.getDistrictApi(selectedProvince);
//                 console.log('getDistrictFromProvince: ', getDistrictFromProvince);
//                 setListDistrict(getDistrictFromProvince.results);
//             };
//             fetchDistrict();
//         }
//     }, [selectedProvince]);

//     // get town, ward from district_id
//     console.log('selectedDistrict: ', selectedDistrict);
//     useEffect(() => {
//         if (selectedProvince && selectedDistrict) {
//             console.log('chạy vô đây nè');
//             const fetchWardTown = async () => {
//                 const getDistrictFromProvince = await addressApi.getWardTownApi(selectedDistrict);
//                 console.log('getDistrictFromProvince: ', getDistrictFromProvince);
//                 setListWardTown(getDistrictFromProvince.results);
//             };
//             fetchWardTown();
//         }
//     }, [selectedProvince, selectedDistrict]);

//     return (
//         <Container>
//             <Grid container spacing={4}>
//                 <Grid item lg={7}>
//                     <Box sx={{ minHeight: '200px', p: 2 }}>
//                         <CustomizeTypography>Địa chỉ thanh toán và vận chuyển</CustomizeTypography>
//                         <CustomizeCheckoutInput placeholder="Nhập số điện thoại" />
//                         <CustomizeCheckoutInput placeholder="Nhập họ tên" />
//                         <SelectAddress
//                             type="province"
//                             select={'Chọn Tỉnh/Thành phố'}
//                             listData={listProvince}
//                             setSelectedProvince={setSelectedProvince}
//                         />

//                         <SelectAddress
//                             type="district"
//                             select={'Chọn Quận/Huyện'}
//                             listData={listDistrict}
//                             setSelectedProvince={setSelectedDistrict}
//                         />
//                         <SelectAddress
//                             type="town"
//                             select={'Chọn Xã/Phường/Thị trấn'}
//                             listData={listWardTown}
//                             selectedProvince={selectedWardTown}
//                             setSelectedProvince={setSelectedWardTown}
//                         />

//                         <CustomizeCheckoutInput placeholder="Nhập địa chỉ nhà cụ thể. Số nhà, tên đường..." />
//                     </Box>
//                     {/* Thanh toán */}
//                     <Box>
//                         <CustomizeTypography>Thanh toán</CustomizeTypography>
//                         <CustomizeTypography>
//                             {' '}
//                             Tất cả các giao dịch đều được bảo mật và mã hóa
//                         </CustomizeTypography>
//                         <></>
//                     </Box>
//                 </Grid>
//                 <Grid item lg={5}>
//                     <Box sx={{ bgcolor: '#555', height: '200px' }}>ahiahahihii</Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

// export default CheckoutInformation;

// const CustomizeCheckoutInput = ({ placeholder, value }) => {
//     return (
//         <TextField
//             value={value}
//             placeholder={placeholder}
//             fullWidth
//             sx={{
//                 mb: 2,
//                 '.MuiInputBase-root': {
//                     fontSize: '14px',
//                     height: '40px',
//                     // width: '400px',
//                     color: 'white',
//                     // borderTopLeftRadius: '12px',
//                     // borderBottomLeftRadius: '12px',
//                 },
//                 '& .MuiFormHelperText-root': {
//                     fontSize: '12.5px',
//                     color: 'red',
//                     mx: 1,
//                 },
//                 '& .MuiOutlinedInput-root': {
//                     '& fieldset': {
//                         borderColor: '#555',
//                     },
//                     '&:hover fieldset': {
//                         borderColor: '#fff',
//                     },
//                     '&.Mui-focused fieldset': {
//                         borderColor: '#fff',
//                     },
//                 },
//             }}
//         />
//     );
// };

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
    Divider,
} from '@mui/material';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { addressApi } from '../api/addressApi';
import SelectAddress from '../SelectAddress/SelectAddress';
import CreditCard from '../CreditCard/CreditCard';
import { theme } from '../../Theme/Theme';
import { PayPalButton } from 'react-paypal-button-v2';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import CloseIcon from '@mui/icons-material/Close';

function CheckoutInformation() {
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWardTown, setListWardTown] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(''); // return province_id
    const [selectedDistrict, setSelectedDistrict] = useState(''); // return district_id
    const [selectedWardTown, setSelectedWardTown] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method

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

    return (
        <Container>
            <Grid container spacing={4}>
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
                                <PayPalButton
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
                                />
                            </Box>
                        ) : (
                            <Box sx={{ mt: 2, width: '200px' }}>
                                <CustomizeButtonInCart
                                    variant="outlined"
                                    textAction="Checkout"
                                    // show animation
                                    isReverseAnimation={false}
                                    fullWidth={false}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Box sx={{ bgcolor: '#555', minHeight: '200px', p: 2, borderRadius: 1 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <Avatar
                                    src={
                                        'https://orchard.vn/wp-content/uploads/2023/08/ralph-lauren-polo-black_1.jpg'
                                    }
                                    sx={{ width: '56px', height: '56px', borderRadius: 1, mr: 1 }}
                                />
                                <Box sx={{ width: '80%', flexWrap: 'wrap' }}>
                                    <CustomizeTypography
                                        sx={{ mb: 0, fontSize: '16px', fontWeight: 'bold' }}
                                    >
                                        Versace Eros EDT - 100 ml
                                    </CustomizeTypography>
                                    <CustomizeTypography sx={{ mb: 0, fontSize: '12px' }}>
                                        Quà tặng:
                                        <span>
                                            Chanel Coco Mademoiselle - 5ML Trị giá: 400.000₫
                                        </span>
                                    </CustomizeTypography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    // justifyContent: 'space-between',
                                }}
                            >
                                <IconButton>
                                    <CloseIcon sx={{ fontSize: '24px', color: 'white' }} />
                                </IconButton>
                                <CustomizeTypography>2.880.000 ₫</CustomizeTypography>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <CheckoutContainer>
                                <CustomizeTypography>Tạm tính</CustomizeTypography>
                                <CustomizeTypography>2.880.000 ₫</CustomizeTypography>
                            </CheckoutContainer>
                            <CheckoutContainer>
                                <CustomizeTypography>Giao hàng</CustomizeTypography>
                                <CustomizeTypography>Miễn phí!</CustomizeTypography>
                            </CheckoutContainer>
                            <Divider sx={{ bgcolor: '#d9d9d9', my: 4 }} />
                            <CheckoutContainer>
                                <CustomizeTypography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    Tổng
                                </CustomizeTypography>
                                <CustomizeTypography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    2.880.000 ₫
                                </CustomizeTypography>
                            </CheckoutContainer>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
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
