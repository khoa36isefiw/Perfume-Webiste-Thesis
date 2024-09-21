import { Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, theme } from '../../Theme/Theme';
export const SummaryRowInCart = ({ label, value, isTotal, discount = null }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <CustomizeTypography
                sx={{
                    fontWeight: isTotal ? 'bold' : 'normal',
                    fontSize: isTotal ? '18px' : '14px',
                    color: theme.palette.text.secondary,
                    [mobileScreen]: {
                        fontSize: '15px',
                    },
                }}
            >
                {label}
            </CustomizeTypography>

            {discount ? (
                <Box>
                    <CustomizeTypography
                        sx={{
                            fontWeight: isTotal ? 'bold' : 'normal',
                            fontSize: isTotal ? '18px' : '14px',
                            [mobileScreen]: {
                                fontSize: '13.5px',
                            },
                        }}
                    >
                        {discount}
                    </CustomizeTypography>
                    <CustomizeTypography
                        sx={{
                            fontWeight: isTotal ? 'bold' : 'normal',
                            fontSize: isTotal ? '18px' : '14px',
                        }}
                    >
                        - {value}
                    </CustomizeTypography>
                </Box>
            ) : (
                <CustomizeTypography
                    sx={{
                        fontWeight: isTotal ? 'bold' : 'normal',
                        fontSize: isTotal ? '18px' : '14px',
                        [mobileScreen]: {
                            fontSize: '14.5px',
                        },
                    }}
                >
                    {value}
                </CustomizeTypography>
            )}
        </Box>
    );
};
