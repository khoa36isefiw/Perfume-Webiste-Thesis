import React from 'react';
import { Avatar, Box, Divider } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen } from '../../Theme/Theme';
import { converToVND } from '../convertToVND/convertToVND';

export const OrderItemV2 = ({ listData }) => (
    <>
        {listData.map((item, index) => (
            <Box key={index}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: '12px',
                        [mobileScreen]: {
                            width: '100%',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Avatar
                            src={item.image[0]}
                            sx={{
                                borderRadius: 1,
                                width: '100px',
                                height: '120px',
                                bgcolor: '#fff',
                            }}
                        />
                        <Box sx={{ ml: 2 }}>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    [mobileScreen]: {
                                        fontSize: '13px',
                                    },
                                }}
                            >
                                {item.productName}
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                brand
                            </CustomizeTypography>
                            <CustomizeTypography
                                sx={{
                                    fontSize: '13.5px',
                                    [mobileScreen]: {
                                        fontSize: '12.5px',
                                    },
                                }}
                            >
                                {item.size}
                            </CustomizeTypography>
                        </Box>
                    </Box>
                    <CustomizeTypography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            [mobileScreen]: {
                                fontSize: '12.5px',
                            },
                        }}
                    >
                        {converToVND(item.price)} - price sale {converToVND(item.priceSale)}
                    </CustomizeTypography>
                </Box>
                {index !== listData.length - 1 && <Divider sx={{ bgcolor: '#ccc', my: 1 }} />}
            </Box>
        ))}
    </>
);
