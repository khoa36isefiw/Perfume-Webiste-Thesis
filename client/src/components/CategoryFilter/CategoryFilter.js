import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { tabletScreen, theme } from '../../Theme/Theme';
import { blue } from '@mui/material/colors';

function CategoryFilter() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomizeTypography
                sx={{ fontWeight: 'bold', mb: 0, color: blue[400], fontSize: '18px' }}
            >
                Categories
            </CustomizeTypography>

            <Button
                sx={{
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'initial',
                    color: 'white',
                    '&:hover': {
                        bgcolor: theme.palette.background.thirth,
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
                    color: 'white',
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
            <Button
                sx={{
                    py: 1,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'initial',
                    color: 'white',
                    '&:hover': {
                        bgcolor: theme.palette.background.thirth,
                    },
                    [tabletScreen]: {
                        fontSize: '13px',
                    },
                }}
            >
                Recent Added
            </Button>
        </Box>
    );
}

export default CategoryFilter;
