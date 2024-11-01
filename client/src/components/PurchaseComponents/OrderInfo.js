import React from 'react';
import { Box } from '@mui/material';

import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

export const OrderInfo = ({ label, value }) => (
    <Box
        sx={{
            textAlign: 'center',
            width: '100%',
            [tabletScreen]: {
                width: '100%',
            },
            [mobileScreen]: {
                width: '100%',
            },
        }}
    >
        <CustomizeTypography
            sx={{
                mb: 0,
                color: theme.palette.text.secondary,
                fontWeight: 'bold',
                [mobileScreen]: {
                    fontSize: '12px',
                },
            }}
        >
            {label}
        </CustomizeTypography>
        {/* <CustomizeTypography sx={{ color: '#d9d9d9', flexWrap: 'wrap' }}>
            {value}
        </CustomizeTypography> */}
        <CustomizeTypography
            sx={{
                color: '#d9d9d9',
                flexWrap: 'wrap',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0 8px',
                [mobileScreen]: {
                    fontSize: '12px',
                },
            }}
        >
            {value}
        </CustomizeTypography>
    </Box>
);
