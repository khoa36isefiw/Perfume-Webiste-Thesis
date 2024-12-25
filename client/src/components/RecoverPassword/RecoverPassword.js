import { Box, Container, Grid } from '@mui/material';
import React, { useRef } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { CustomizeButtonV2 } from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';
import { userAPI } from '../../api/userAPI';
import { useTranslation } from 'react-i18next';

import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import { useBlur } from '../../hooks/useBlur';
import useValidationWithRef from '../../hooks/useValidationWithRef';

function RecoverPassword() {
    const navigate = useNavigate();
    const { formErrors, onHandleBlur } = useBlur();
    const { validateEmail } = useValidationWithRef();
    const { t, i18n } = useTranslation('translate');
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const emailRef = useRef(null);

    const handleSubmitResetPassword = async () => {
        const email = emailRef.current.value.trim(); // get value from input
        console.log('email: ', email);
        if (formErrors.email.status) {
            // if user types email
            const sendNewPassword = await userAPI.sendNewPassword(email);
            try {
                if (sendNewPassword.status === 200) {
                    showNotificationMessage(
                        'success',
                        t('common.notifyMessage.recover.rT'),
                        t('common.notifyMessage.recover.rS'),
                    );
                    // const sendMail = await userAPI
                    setTimeout(() => {
                        navigate(`/${i18n.language}/sign-in`);
                    }, 2800);
                } else {
                    // const sendMail = await userAPI
                    showNotificationMessage(
                        'warning',
                        t('common.notifyMessage.recover.rT'),
                        t('common.notifyMessage.recover.rWN'),
                    );
                }
            } catch (error) {
                console.log('error: ', error);
                showNotificationMessage(
                    'warning',
                    t('common.notifyMessage.recover.rT'),
                    'Your email is not available, please check again333!',
                );
            }
        } else {
            showNotificationMessage(
                'warning',
                t('common.notifyMessage.recover.rT'),
                t('common.notifyMessage.recover.rFL'),
            );
        }
    };

    return (
        <Container
            sx={{
                width: '50%',
                mt: 20,
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
                            {t('common.recover.reset')}
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
                                    {t('common.recover.title')}
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
                                        helperText={formErrors?.email?.message}
                                        onBlur={() =>
                                            onHandleBlur(
                                                'email',
                                                emailRef.current.value.trim(),
                                                validateEmail,
                                            )
                                        }
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
                                            textAction={t('common.recover.submit')}
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
                                    {t('common.recover.cancel')}
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
