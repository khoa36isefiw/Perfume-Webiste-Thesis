import { Container, Grid, Box } from '@mui/material';
import React, { useId, useRef, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';

import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import ButtonComponent from '../SignIn/test';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import userDefaultAvatar from '../../assets/images/defaultA.png';

function RegisterAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useId();
    const listAccountRegistered = useSelector((state) => state.accountManagement.listAccounts);
    console.log('listAccountRegistered: ', listAccountRegistered);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const [messageType, setMessageType] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');

    const handleRegisterAccount = () => {
        // get value of first name input
        const userImage =
            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1726898366/perfumes/user-image/default-image-1.png';
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const phoneNumber = phoneRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        if (firstName) {
            dispatch(
                signUpAccount({
                    userImage, // default image
                    userId,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    email,
                    password,
                }),
            );
        }

        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setMessageType('success');
        setMessageTitle('Register account');
        setMessageContent('Create new account successfully!');
    };

    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
        backTop();
    };
    return (
        <Container
            sx={{
                width: '50%',
                mt: 15,
                [ipadProScreen]: {
                    width: '70%',
                    mt: 15,
                },
                [tabletScreen]: {
                    width: '80%',
                    mt: 16,
                },
                [mobileScreen]: {
                    width: '100%',
                    mt: 12,
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
                                <TextFieldLogin
                                    placeholder="First Name"
                                    fullWidth
                                    inputRef={firstNameRef}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Last Name<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Last Name"
                                    fullWidth
                                    inputRef={lastNameRef}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Phone Number<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Phone Number"
                                    fullWidth
                                    inputRef={phoneRef}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Address<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Address"
                                    fullWidth
                                    inputRef={addressRef}
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

                                p: 2,
                            }}
                        >
                            <Grid item xs={12} sm={12} lg={12}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    E-mail<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="E-mail"
                                    fullWidth
                                    inputRef={emailRef}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={12} sx={{ mt: 2, mb: '4px' }}>
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
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
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <ButtonComponent
                                textAction={'Register Account'}
                                onHandleClick={handleRegisterAccount}
                            />
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
                            <ButtonComponent
                                textAction={'Back to Sign In'}
                                onHandleClick={handleNavigateSignIn}
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

export default RegisterAccount;
