import { Container, Grid } from '@mui/material';
import React, { useRef } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import ButtonComponent from './test';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const listAccounts = useSelector((state) => state.accountManagement.listAccounts);
    console.log('current list accounts: ', listAccounts && listAccounts);
    const handleSignIn = () => {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        const user = listAccounts.find(
            (account) => account.email === email && account.password === password,
        );

        if (user) {
            console.log('Login successfully');

            dispatch(
                loginAccount({
                    email: user.email,

                    password: user.password,
                }),
            );
            navigate('/');
        } else {
            console.log('Login failed: invalid email or password');
        }
    };

    const handleKeyDownEvent = (e) => {
        const isEnterKey = e.code === 'Enter' || e.keyCode === 13;
        if (isEnterKey && e.shiftKey === false) {
            handleSignIn();
        }
    };

    return (
        <Container
            sx={{
                width: '50%',
                my: 16,
                [ipadProScreen]: {
                    width: '70%',
                },
                [tabletScreen]: {
                    width: '80%',
                    my: 18,
                },
                [mobileScreen]: {
                    my: 12,
                    width: '100%',
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
                            [ipadProScreen]: {
                                fontSize: theme.fontSize.ipadPro.heading,
                            },
                            [tabletScreen]: {
                                fontSize: theme.fontSize.tablet.heading,
                            },
                            [mobileScreen]: {
                                fontSize: theme.fontSize.mobile.heading,
                            },
                        }}
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
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            sx={{ borderBottom: '1px solid #555', p: 2 }}
                        >
                            <CustomizeTypography sx={{ fontSize: '18px', mb: 0 }}>
                                Sign In
                            </CustomizeTypography>
                        </Grid>
                        <Grid container item spacing={2} sx={{ p: 2, mb: 1 }}>
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
                                <TextFieldLogin placeholder="Email" fullWidth inputRef={emailRef} />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    Password<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Password"
                                    fullWidth
                                    inputRef={passwordRef}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                p: 2,
                                [mobileScreen]: {
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
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
                                onClick={() => navigate('/recover-password')}
                            >
                                Forgot Password?
                            </CustomizeTypography>

                            <ButtonComponent
                                textAction={'Login'}
                                onHandleClick={handleSignIn}
                                onHandleKeyEvent={handleKeyDownEvent}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                [mobileScreen]: {
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            }}
                        >
                            <CustomizeTypography sx={{ mb: 0, mr: 4 }}>
                                If you don't have account
                            </CustomizeTypography>
                            <ButtonComponent
                                textAction={'Register'}
                                onHandleClick={() => navigate('/create-account')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignIn;
