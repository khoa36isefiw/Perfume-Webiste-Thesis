import { Box, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import {
    TextFieldLogin,
    TextFieldPassword,
    TextFieldVerifyCode,
} from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import CustomizeButton, {
    CustomizeButtonOutlined,
    CustomizeButtonV2,
    CustomizeHoverButton,
    CustomizeHoverButtonV2,
} from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';

function RecoverPassword() {
    return (
        <Container sx={{ width: '50%', mt: 10 }}>
            const navigate = useNavigate(); return (
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <CustomizeTypography
                            sx={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }}
                        >
                            Reset your password
                        </CustomizeTypography>
                    </Grid>
                    <Grid item lg={12}>
                        <Grid
                            container
                            sx={{
                                border: '1px solid #555',
                                borderRadius: 1,
                                borderBottom: '1px solid #555',
                            }}
                        >
                            <Grid item xs={12} lg={12} sx={{ borderBottom: '1px solid #555' }}>
                                <CustomizeTypography variant="body1" sx={{ p: 2 }}>
                                    We will send you an email to reset your password
                                </CustomizeTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12} sx={{ p: 2 }}>
                                <CustomizeTypography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    E-mail:
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Email" fullWidth />
                            </Grid>

                            <Grid
                                item
                                lg={12}
                                sx={{
                                    borderTop: '1px solid #555',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                }}
                            >
                                <Box sx={{ mb: -1 }}>
                                    <Box sx={{ mr: 2 }}>
                                        <CustomizeButtonInCart
                                            variant="outlined"
                                            textAction={'Submit'}
                                            fullWidth={false}
                                            width="120px"
                                        />
                                    </Box>
                                </Box>

                                <CustomizeButtonV2
                                    variant="outlined"
                                    sx={{ width: '100px', padding: '8px 32px', width: '120px' }}
                                >
                                    Cancel
                                </CustomizeButtonV2>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default RecoverPassword;
