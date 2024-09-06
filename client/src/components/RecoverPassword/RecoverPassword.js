import { Box, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeButtonV2 } from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

function RecoverPassword() {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [showAnimation, setShowAnimation] = useState('animate__bounceInRight');
    const handleSubmitResetPassword = () => {
        setShowNotification(true);
        setShowAnimation('animate__bounceInRight');
        setTimeout(() => {
            navigate('/sign-in');
        }, 2000);
    };
    // handle Close notification
    const handleCloseNotification = () => {
        setShowAnimation('animate__fadeOut');
        setTimeout(() => {
            setShowNotification(false);
        }, 1000);
    };
    return (
        <Container sx={{ width: '50%', mt: 10 }}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <CustomizeTypography
                            sx={{
                                fontSize: '48px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
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
                        msgType={'success'}
                        msgTitle={'Recovery Password'}
                        msgContent={'New password is sent to your email. Please, check it!'}
                        autoHideDuration={3000} // Auto-hide after 5 seconds
                        onClose={handleCloseNotification}
                    />
                </Box>
            )}
        </Container>
    );
}

export default RecoverPassword;
