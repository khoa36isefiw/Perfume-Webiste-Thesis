import { Box, Button } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation('translate');
    return (
        <Box
            sx={{
                margin: 'auto',

                height: 'auto',
                width: '100%',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 0 0.75rem #ccc)',
            }}
        >
            <iframe
                title="Not Found Page"
                src="https://lottie.host/embed/9a1a3ace-39eb-4a46-9dc8-e6bd0b402466/mUgD7pZGPy.lottie"
                style={{ border: 0, width: '600px', height: '600px' }}
            />

            <CustomizeTypography
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: 'red',
                }}
            >
                Not Found
            </CustomizeTypography>
            <CustomizeTypography sx={{ textAlign: 'center' }}>
                Oops, Where are we
            </CustomizeTypography>
            <Button
                onClick={() => navigate(`/${i18n.language}`)}
                variant="contained"
                sx={{
                    mt: 2,
                    width: '200px',
                    py: 1,
                    borderRadius: '24px',
                    bgcolor: 'red',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'initial',
                    '&:hover': {
                        filter: 'drop-shadow(0 0 0.75rem #ccc)',
                        bgcolor: 'red',
                    },
                }}
            >
                Back home
            </Button>
        </Box>
    );
}

export default PageNotFound;
