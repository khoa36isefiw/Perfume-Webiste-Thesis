import { Box, Container, Grid } from '@mui/material';
import React, { useRef } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import ButtonComponent from './ButtonComponent';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import { authAPI } from '../../api/authAPI';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useTranslation } from 'react-i18next';
import GoogleAuthButton from '../GoogleLoginButton/GoogleLoginButton';

function SignIn() {
    const { t, i18n } = useTranslation('translate');
    const dispatch = useDispatch();
    const {
        showNotification,
        showAnimation,
        messageType,
        messageContent,
        messageTitle,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const listAccounts = useSelector((state) => state.accountManagement.listAccounts);
    console.log('current list accounts: ', listAccounts && listAccounts);
    const handleSignIn = async () => {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        const data = {
            email,
            password,
        };
        if (email && email) {
            try {
                const loginData = await authAPI.login(data);
                // console.log('request: ', loginData);
                console.log('response Sign In: ', loginData);
                if (loginData.status === 200) {
                    // store all user data in localStorage as a JSON string
                    window.localStorage.setItem(
                        'user_data',
                        JSON.stringify({
                            userId: loginData.data._id,
                            imagePath: loginData.data.imagePath,
                            email: loginData.data.email,
                            // Add any other data you want to store
                            firstName: loginData.data.firstName,
                            lastName: loginData.data.lastName,
                            role: loginData.data.role,
                            address: loginData.data.address,
                        }),
                    );
                    showMessage('success', 'Login', 'Login successfully!');
                    setTimeout(() => {
                        navigate(`/${i18n.language}`);
                    }, 1500);
                    window.localStorage.setItem('bottom_nav_number', JSON.stringify(0));
                } else {
                    showMessage('warning', 'Login', 'Your email or password is incorrect!');
                }
            } catch (error) {
                showMessage('warning', 'Login', 'Your email or password is incorrect!');
            }
        } else {
            showMessage('warning', 'Login', 'You should fill your information before login');
        }

        // if (user) {
        //     console.log('Login successfully');
        //     dispatch(
        //         loginAccount({
        //             email: user.email,
        //             password: user.password,
        //         }),
        //     );

        //     navigate('/');
        // } else {
        //     console.log('Login failed: invalid email or password');
        // }
    };

    const handleKeyEnterLogin = (e) => {
        const isEnterKey = e.code === 'Enter' || e.keyCode === 13;
        if (isEnterKey && e.shiftKey === false) {
            handleSignIn();
        }
    };

    return (
        <Container
            sx={{
                width: '50%',
                my: 20,
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
                        {t('common.signIn.registered')}
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
                                {t('common.signIn.signIn')}
                            </CustomizeTypography>
                        </Grid>
                        <Grid container item spacing={2} sx={{ p: 2, mb: 1 }}>
                            <Grid item xs={12} lg={12}>
                                <CustomizeTypography variant="body1">
                                    {t('common.signIn.new')}
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
                                    {t('common.signIn.password')}
                                    <span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Password"
                                    fullWidth
                                    inputRef={passwordRef}
                                    onHandleKeyDown={handleKeyEnterLogin}
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
                                onClick={() => navigate(`/${i18n.language}/recover-password`)}
                            >
                                {t('common.signIn.forgot')}
                            </CustomizeTypography>

                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <ButtonComponent
                                    textAction={t('common.signIn.login')}
                                    onHandleClick={handleSignIn}
                                    onHandleKeyEvent={handleKeyEnterLogin}
                                />
                                <GoogleAuthButton showMessage={showMessage} isLogin={true} />
                            </Box>
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
                                {t('common.signIn.donHave')}
                            </CustomizeTypography>
                            <ButtonComponent
                                textAction={t('common.signIn.register')}
                                onHandleClick={() => navigate(`/${i18n.language}/create-account`)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {showNotification && (
                <Box
                    sx={{ position: 'fixed', top: '5%', right: '1%', zIndex: 9999999 }}
                    className={`animate__animated ${showAnimation}`}
                >
                    <NotificationMessage
                        msgType={messageType}
                        msgTitle={messageTitle}
                        msgContent={messageContent}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default SignIn;
