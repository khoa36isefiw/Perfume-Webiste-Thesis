import React from 'react';
import { Box, IconButton } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';

export const OrderSummary = ({ iconBgColor, iconColor, orderCount, orderLabel }) => (
    <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #555',
                p: '8px',
                borderRadius: 1,
                width: '100%',
            }}
        >
            <IconButton
                disableTouchRipple
                sx={{
                    padding: '10px',
                    bgcolor: iconBgColor,
                    '&:hover': {
                        bgcolor: iconBgColor,
                        cursor: 'default',
                    },
                }}
            >
                <ViewInArIcon sx={{ fontSize: '30px', color: iconColor }} />
            </IconButton>
            <Box sx={{ ml: 1 }}>
                <CustomizeTypography
                    sx={{
                        mb: 0,
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                    }}
                >
                    {orderCount}
                </CustomizeTypography>
                <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                    {orderLabel}
                </CustomizeTypography>
            </Box>
        </Box>
    </>
);
