import { Box, Typography } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { mobileScreen, theme } from '../../Theme/Theme';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';

function Hotline() {
    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '46px',
                        fontWeight: 'bold',
                        color: theme.palette.secondaryText,
                        textAlign: 'center',
                        mr: 2,
                        [mobileScreen]: {
                            fontSize: theme.fontSize.mobile.heading,
                            textAlign: 'center',
                        },
                    }}
                >
                    Hotline
                </Typography>

                <SupportAgentIcon sx={{ fontSize: '46px', color: theme.palette.secondaryText }} />
            </Box>
            <CustomizeTypography sx={{ mb: 0, textAlign: 'center', fontSize: '20px' }}>
                <strong style={{ fontSize: '24px' }}>Call Us:</strong>
                <span style={{ marginLeft: '18px' }}>08 372-227-64 | 0938-775-001</span>
            </CustomizeTypography>
            <CustomizeTypography sx={{ mb: 0, textAlign: 'center', fontSize: '20px' }}>
                Ho Chi Minh City University of Technology and Education
            </CustomizeTypography>
        </>
    );
}

export default Hotline;
