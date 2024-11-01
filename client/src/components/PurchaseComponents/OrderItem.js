import React from 'react';
import { Avatar, Box, Button } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
import StarIcon from '@mui/icons-material/Star';

export const OrderItem = ({ listData }) => (
    <>
        {listData.map((item, index) => (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '12px',
                    [mobileScreen]: {
                        width: '100%',
                    },
                }}
                key={item?.orderNumber}
            >
                <Box sx={{ display: 'flex' }}>
                    <Avatar
                        src={item.orderImage}
                        sx={{
                            borderRadius: 1,
                            width: '100px',
                            height: '120px',
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
                            {item.orderName}
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '13.5px',
                                [mobileScreen]: {
                                    fontSize: '12.5px',
                                },
                            }}
                        >
                            {item.orderBrand}
                        </CustomizeTypography>
                        <CustomizeTypography
                            sx={{
                                fontSize: '13.5px',
                                [mobileScreen]: {
                                    fontSize: '12.5px',
                                },
                            }}
                        >
                            {item.orderSize} ml
                        </CustomizeTypography>
                        <Button
                            startIcon={<StarIcon />}
                            sx={{
                                padding: '6px 0',
                                textTransform: 'initial',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                                [mobileScreen]: {
                                    fontSize: '13px',
                                },
                            }}
                        >
                            Rate Now
                        </Button>
                    </Box>
                </Box>
                <CustomizeTypography
                    sx={{
                        fontWeight: 'bold',
                        [mobileScreen]: {
                            fontSize: '12.5px',
                        },
                    }}
                >
                    ${item.orderPrice}
                </CustomizeTypography>
            </Box>
        ))}
    </>
);
