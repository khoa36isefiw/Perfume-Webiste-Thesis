import { Avatar, Box, Button, Container, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import {
    customersFooterData,
    footerSocialData,
    pagesFooterData,
    shoppingFooterData,
} from './footerData';
import Copyrights from '../Copyrights/Copyrights';
import { TextFieldCustomize } from '../TextFieldCustomize/TextFieldCustomize';
import { mobileScreen, theme } from '../../Theme/Theme';

function Footer() {
    return (
        <Box
            sx={{
                position: 'relative',
                top: '100%',
                bottom: '0',
                bgcolor: 'black',
                minHeight: '100px',
            }}
        >
            <Container
                sx={{
                    p: 4,
                    [mobileScreen]: {
                        p: 1,
                    },
                }}
            >
                <Grid container>
                    {/* subscribe */}
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CustomizeTypography
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: theme.palette.secondaryText,
                            }}
                        >
                            Tomtoc Perfumes
                        </CustomizeTypography>
                        <CustomizeTypography sx={{ fontSize: '18px', fontWeight: '600' }}>
                            Subscribe to Our Newsletter:
                        </CustomizeTypography>
                        <Box sx={{ width: '250px' }}>
                            <CustomizeTypography>
                                Receive Updates on New Arrivals and Special Promotions!
                            </CustomizeTypography>
                        </Box>
                        <Box sx={{ py: 1 }}>
                            <TextFieldCustomize placeholder={'Your email here'} />
                            <Button
                                variant="contained"
                                sx={{
                                    py: 1,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,

                                    bgcolor: theme.palette.secondaryText,
                                    fontSize: '14px',
                                    textTransform: 'initial',
                                    '&:hover': {
                                        bgcolor: theme.palette.secondaryText,
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                        {/* Load social  */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1,
                            }}
                        >
                            {footerSocialData.map((social, index) => (
                                <Avatar
                                    key={index}
                                    src={social.footerImage}
                                    alt="Social Image"
                                    sx={{ height: '24px', width: '24px', mr: 2 }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* filter  */}
                    <Grid container item lg={8}>
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Shopping
                            </CustomizeTypography>
                            {shoppingFooterData.map((shopping, index) => (
                                <CustomizeTypography key={index} sx={{ color: 'white' }}>
                                    {shopping}
                                </CustomizeTypography>
                            ))}
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Customer care
                            </CustomizeTypography>
                            {customersFooterData.map((customer, index) => (
                                <CustomizeTypography key={index} sx={{ color: 'white' }}>
                                    {customer}
                                </CustomizeTypography>
                            ))}
                        </Grid>
                        <Grid item xs={6} sm={4} md={4} lg={4}>
                            <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Pages
                            </CustomizeTypography>
                            {pagesFooterData.map((page, index) => (
                                <CustomizeTypography key={index} sx={{ color: 'white' }}>
                                    {page}
                                </CustomizeTypography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Copyrights />
        </Box>
    );
}

export default Footer;
