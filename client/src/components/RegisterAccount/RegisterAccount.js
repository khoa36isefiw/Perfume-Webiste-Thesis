import { Container, Grid, Box, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import ButtonComponent from '../SignIn/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import { authAPI } from '../../api/authAPI';
import useValidationWithRef from '../../hooks/useValidationWithRef';

import { RequirementV2 } from '../Requirement/RequirementV2';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';

function RegisterAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();
    const [open, setOpen] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // check input validation
    const firstNameValidation = useValidationWithRef();
    const lastNameValidation = useValidationWithRef();
    const phoneValidation = useValidationWithRef();
    const emailValidation = useValidationWithRef();
    const passwordValidation = useValidationWithRef();

    //create user with api
    const handleRegisterAccount = async () => {
        // get value of first name input
        const userImage =
            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1726898366/perfumes/user-image/default-image-1.png';
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const phoneNumber = phoneRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        // check information from user input
        const isFirstNameValid = firstNameValidation?.validateName(firstName);
        const isLastNameValid = lastNameValidation.validateName(lastName);
        const isEmailValid = emailValidation.validateEmail(email);
        const isPasswordValid = passwordValidation.validatePassword(password);
        const isPhoneNumberValid = phoneValidation.validatePhoneNumber(phoneNumber);
        console.log('isFirstNameValid: ', isFirstNameValid);
        console.log('isLastNameValid: ', isLastNameValid);
        console.log('isEmailValid: ', isEmailValid);
        console.log('isPasswordValid: ', isPasswordValid);
        console.log('isPhoneNumberValid: ', isPhoneNumberValid);

        if (firstName && lastName && phoneNumber && address && email && password) {
            if (
                isFirstNameValid &&
                isLastNameValid &&
                isEmailValid &&
                isPasswordValid &&
                isPhoneNumberValid
            ) {
                const registrationData = {
                    email,
                    password,
                    firstName,
                    lastName,
                    address,
                    phoneNumber: phoneNumber,
                    imagePath: userImage, // default image
                };

                console.log('registrationData: ', registrationData);

                try {
                    const response = await authAPI.registerAccount(registrationData);
                    if (response.status === 200) {
                        showMessage(
                            'success',
                            'Register account',
                            'Create new account successfully!',
                        );
                    } else {
                        showMessage(
                            'warning',
                            'Register account',
                            'Email exists, Please try another email!',
                        );
                    }
                } catch (error) {
                    showMessage(
                        'warning',
                        'Register account',
                        'Email exists, Please try another email2!',
                    );
                }
            } else {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 6000);
                showMessage(
                    'warning',
                    'Register account',
                    'Please fill your information correctly!',
                );
            }
        } else {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 6000);
            showMessage('warning', 'Register account', 'Please fill your information');
        }
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
                            mb: 0,
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
                        {/* MuiGrid-root  */}
                        <Grid
                            container
                            item
                            spacing={2}
                            sx={{
                                p: 2,
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                lg={12}
                                sx={{
                                    '&.MuiGrid-item': {
                                        pt: 1,
                                    },
                                }}
                            >
                                <Tooltip
                                    title={
                                        <Typography
                                            sx={{
                                                fontSize: '13px',
                                            }}
                                        >
                                            Requirement
                                        </Typography>
                                    }
                                >
                                    <RequirementV2
                                        onHandleOpen={() => setOpen(true)}
                                        open={open}
                                        onHandleClose={() => setOpen(false)}
                                    />
                                </Tooltip>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={6}
                                sx={{
                                    '&.MuiGrid-item': {
                                        pt: 1,
                                    },
                                }}
                            >
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    First Name<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="First Name"
                                    fullWidth
                                    inputRef={firstNameRef}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={6}
                                sx={{
                                    '&.MuiGrid-item': {
                                        pt: 1,
                                    },
                                }}
                            >
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Last Name<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Last Name"
                                    fullWidth
                                    inputRef={lastNameRef}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={6}
                                sx={{
                                    '&.MuiGrid-item': {
                                        pt: 1,
                                    },
                                }}
                            >
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    Phone Number<span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder="Phone Number"
                                    fullWidth
                                    inputRef={phoneRef}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                lg={6}
                                sx={{
                                    '&.MuiGrid-item': {
                                        pt: 1,
                                    },
                                }}
                            >
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

                        <Box sx={{ width: '100%', borderTop: '1px solid #555' }}>
                            <Grid
                                container
                                spacing={4}
                                sx={{
                                    p: 2,
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={6}
                                    sx={{
                                        '&.MuiGrid-item': {
                                            pt: 1,
                                        },
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        E-mail<span style={{ color: '#d14949' }}>*</span> :
                                    </CustomizeTypography>
                                    <TextFieldLogin
                                        placeholder="E-mail"
                                        fullWidth
                                        inputRef={emailRef}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    lg={6}
                                    sx={{
                                        // mb: '4px',
                                        '&.MuiGrid-item': {
                                            pt: 1,
                                        },
                                    }}
                                >
                                    <CustomizeTypography
                                        sx={{ color: theme.palette.text.secondary }}
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
                        </Box>
                        <Grid
                            item
                            xs={12}
                            lg={12}
                            sx={{
                                borderTop: '1px solid #555',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                // p: 2,
                                p: '4px',
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
                                // p: 2,
                                p: '4px',
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
