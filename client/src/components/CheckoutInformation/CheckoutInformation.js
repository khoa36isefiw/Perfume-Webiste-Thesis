import { Box, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { SelectAddress } from '../SelectAddress/SelectAddress';
import { addressApi } from '../api/addressApi';

function CheckoutInformation() {
    const [listProvince, setListProvince] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');

    useEffect(() => {
        const fetchProvinces = async () => {
            const provinceList = await addressApi.getProvinceApi();
            // console.log('provinceList: ', provinceList);
            setListProvince(provinceList.results);
        };
        fetchProvinces();
    }, []);

    console.log('list: ', listProvince);

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item lg={7}>
                    <Box sx={{ minHeight: '200px', p: 2 }}>
                        <CustomizeTypography>Địa chỉ thanh toán và vận chuyển</CustomizeTypography>
                        <CustomizeCheckoutInput placeholder="Nhập số điện thoại" />
                        <CustomizeCheckoutInput placeholder="Nhập họ tên" />

                        <SelectAddress
                            select={'Chọn Tỉnh/Thành phố'}
                            listProvince={listProvince}
                            setSelectedProvince={setSelectedProvince}
                            selectedProvince={selectedProvince}
                        />
                        <SelectAddress
                            select={'Chọn Quận/Huyện'}
                            listProvince={listProvince}
                            setSelectedProvince={setSelectedProvince}
                            selectedProvince={selectedProvince}
                        />
                        <CustomizeCheckoutInput placeholder="Nhập địa chỉ nhà cụ thể. Số nhà, tên đường..." />
                    </Box>
                </Grid>
                <Grid item lg={5}>
                    <Box sx={{ bgcolor: '#555', height: '200px' }}>ahiahahihii</Box>
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
                    // width: '400px',
                    color: 'white',
                    // borderTopLeftRadius: '12px',
                    // borderBottomLeftRadius: '12px',
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
