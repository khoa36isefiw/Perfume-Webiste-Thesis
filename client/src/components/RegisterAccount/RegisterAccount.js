import { Container, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import ButtonComponent from '../SignIn/test';

function RegisterAccount() {
    return (
        <Container
            sx={{
                width: '50%',
                [ipadProScreen]: {
                    width: '70%',
                    mt: 15,
                },
                [tabletScreen]: {
                    width: '80%',
                    mt: 20,
                },
                [mobileScreen]: {
                    width: '100%',
                    mt: 10,
                },
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <CustomizeTypography
                        sx={{
                            fontSize: '48px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: theme.palette.text.secondary,
                            [mobileScreen]: {
                                fontSize: theme.fontSize.mobile.heading,
                            },
                        }}
                    >
                        Create account
                    </CustomizeTypography>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Grid
                        container
                        sx={{
                            border: '1px solid #555',
                            borderRadius: 1,
                            borderBottom: '1px solid #555',
                        }}
                    >
                        <Grid item xs={12} lg={12} sx={{ borderBottom: '1px solid #555', p: 2 }}>
                            <CustomizeTypography sx={{ fontSize: '18px', mb: 0 }}>
                                Your{' '}
                                <strong style={{ color: theme.palette.text.secondary }}>
                                    Personal Details
                                </strong>
                            </CustomizeTypography>
                        </Grid>
                        <Grid container item spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    First Name<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="First Name" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Last Name<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Last Name" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Phone Number<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Phone Number" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Address<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Address" fullWidth />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',

                                p: 2,
                            }}
                        >
                            <Grid item xs={12} sm={12} lg={12}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    E-mail<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="E-mail" fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2, mb: '4px' }}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Password<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin placeholder="Password" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <ButtonComponent textAction={'Register Account'} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                [mobileScreen]: {
                                    flexDirection: 'column',
                                },
                            }}
                        >
                            <CustomizeTypography sx={{ mb: 0, mr: 4 }}>
                                Already have an account?
                            </CustomizeTypography>
                            <ButtonComponent textAction={'Back to Sign In'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegisterAccount;
