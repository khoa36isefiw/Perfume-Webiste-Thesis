import { Box } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
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
                }}
            >
                {label}
            </CustomizeTypography>

            {discount ? (
                <CustomizeTypography
                    sx={{
                        fontWeight: isTotal ? 'bold' : 'normal',
                        fontSize: isTotal ? '18px' : '14px',
                    }}
                >
                    {discount} - {value}
                </CustomizeTypography>
            ) : (
                <CustomizeTypography
                    sx={{
                        fontWeight: isTotal ? 'bold' : 'normal',
                        fontSize: isTotal ? '18px' : '14px',
                    }}
                >
                    {value}
                </CustomizeTypography>
            )}
        </Box>
    );
};
