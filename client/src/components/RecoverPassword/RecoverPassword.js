import { Box, Container, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeButtonV2 } from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import { userAPI } from '../../api/userAPI';

function RecoverPassword() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const {
        showNotification,
        showAnimation,
        messageType,
        messageContent,
        messageTitle,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();

    const handleSubmitResetPassword = async () => {
        const email = emailRef.current.value.trim(); // get value from input
        console.log('email: ', email);
        if (email) {
            // if user types email
            const sendNewPassword = await userAPI.sendNewPassword(email);
            try {
                if (sendNewPassword.status === 200) {
                    showMessage(
                        'success',
                        'Check Email',
                        'Your email is available, new password will be sent to your mail!',
                    );
                    // const sendMail = await userAPI
                    setTimeout(() => {
                        navigate('/sign-in');
                    }, 2800);
                } else {
                    // const sendMail = await userAPI
                    showMessage(
                        'warning',
                        'Check Email',
                        'Your email is not available, please check again222!',
                    );
                }
            } catch (error) {
                console.log('error: ', error);
                showMessage(
                    'warning',
                    'Check Email',
                    'Your email is not available, please check again333!',
                );
            }
        } else {
            showMessage('warning', 'Check Email', 'Please enter your email address!');
        }
    };

    return (
        <Container
            sx={{
                width: '50%',
                mt: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                [ipadProScreen]: {
                    width: '70%',
                },
                [tabletScreen]: {
                    mt: 18,
                    width: '80%',
                },
                [mobileScreen]: {
                    mt: 12,
                    width: '100%',
                },
            }}
        >
            <Box>
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
                            {/* <Grid item container xs={12} sm={12} md={12} lg={12} sx={{ p: 2 }}> */}
                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 2 }}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <CustomizeTypography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        E-mail:
                                    </CustomizeTypography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextFieldLogin
                                        placeholder="Email"
                                        fullWidth={true}
                                        inputRef={emailRef}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
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
                                            onHandleClick={handleSubmitResetPassword}
                                        />
                                    </Box>
                                </Box>

                                <CustomizeButtonV2
                                    variant="outlined"
                                    sx={{ padding: '8px 32px', width: '120px' }}
                                >
                                    Cancel
                                </CustomizeButtonV2>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
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

export default RecoverPassword;
