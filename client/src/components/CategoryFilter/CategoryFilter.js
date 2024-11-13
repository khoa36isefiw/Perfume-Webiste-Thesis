import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { tabletScreen, theme } from '../../Theme/Theme';
import { blue } from '@mui/material/colors';

function CategoryFilter() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomizeTypography sx={{ fontWeight: 'bold', mb: 0 }}>Categories</CustomizeTypography>

            <Button
                sx={{
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'initial',
                    color: theme.palette.background.thirth,
                    '&:hover': {
                        bgcolor: blue[50],
                    },
                    [tabletScreen]: {
                        fontSize: '13px',
                    },
                }}
            >
                Men
            </Button>
            <Button
                sx={{
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'initial',
                    color: blue[50],
                    '&:hover': {
                        bgcolor: theme.palette.background.thirth,
                    },
                    [tabletScreen]: {
                        fontSize: '13px',
                    },
                }}
            >
                Women
            </Button>
        </Box>
    );
}

export default CategoryFilter;
