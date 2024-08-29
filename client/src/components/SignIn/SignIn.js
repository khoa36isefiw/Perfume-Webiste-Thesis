import { Container, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import ButtonComponent from './test';
import { theme } from '../../Theme/Theme';

function SignIn() {
    return (
        <Container sx={{ width: '50%' }}>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <CustomizeTypography
                        sx={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        Already Registered?
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
                        <Grid item lg={12} sx={{ borderBottom: '1px solid #555', p: 2 }}>
                            <CustomizeTypography sx={{ fontSize: '18px', mb: 0 }}>
                                Sign In
                            </CustomizeTypography>
                        </Grid>
                        <Grid container item spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} lg={12}>
                                <CustomizeTypography variant="body1">
                                    I am a returning customer
                                </CustomizeTypography>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography
                                    sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                                >
                                    E-mail<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Email" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography
                                    sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                                >
                                    Password<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Password" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <CustomizeTypography
                                sx={{
                                    mb: 0,
                                    mr: 4,
                                    fontStyle: 'oblique',
                                    // color: theme.palette.text.secondary,
                                    transition: ' all 0.3s ease-in-out', // Smooth transition effect
                                    '&:hover': {
                                        color: theme.palette.text.secondary,
                                        cursor: 'pointer',
                                        fontWeight: 'bold',

                                        transform: 'translateY(-2px)',
                                        borderBottom: `1px solid ${theme.palette.text.secondary}`,
                                    },
                                }}
                            >
                                Forgot Password?
                            </CustomizeTypography>

                            <ButtonComponent textAction={'Login'} />
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                            }}
                        >
                            <CustomizeTypography sx={{ mb: 0, mr: 4 }}>
                                If you dont have account
                            </CustomizeTypography>
                            <ButtonComponent textAction={'Register'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignIn;
