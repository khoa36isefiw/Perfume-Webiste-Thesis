import { Box, Container } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import saleOff from '../../assets/images/hp_sell_of.png';
import CustomizeButton from '../CustomizeButton/CustomizeButton';
import { mobileScreen, theme } from '../../Theme/Theme';

function SaleOff() {
    return (
        <Container
            sx={{
                backgroundImage: `url(${saleOff})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                width: '100%',
                my: 8,
                p: 2,
                // border: '1px solid #d1d1d1',
                [mobileScreen]: {
                    p: 0,
                    height: '100%',
                    width: '100%',
                },
            }}
        >
            <Box sx={{ mt: 4, p: 4 }}>
                <CustomizeTypography
                    sx={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        width: '40%',
                        mb: 2,
                        [mobileScreen]: {
                            width: '80%',
                            fontSize: theme.fontSize.mobile.heading,
                        },
                    }}
                >
                    Perfume Year-End Sale! Up to 50%
                </CustomizeTypography>
                <CustomizeTypography
                    sx={{
                        fontSize: '16px',
                        mb: 4,
                        width: '40%',
                        [mobileScreen]: {
                            width: '60%',
                        },
                    }}
                >
                    OFF Discover an exquisite collection of premium perfumes at unbelievable prices
                    during our exclusive Perfume Sale!
                </CustomizeTypography>
                <CustomizeButton textAction={'Know More'} />
            </Box>
        </Container>
    );
}

export default SaleOff;
