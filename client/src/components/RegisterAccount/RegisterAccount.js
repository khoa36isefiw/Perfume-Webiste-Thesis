import { Container, Grid, Box, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldLogin, TextFieldPassword } from '../TextFieldCustomize/TextFieldCustomize';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import ButtonComponent from '../SignIn/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import { authAPI } from '../../api/authAPI';
import useValidationWithRef from '../../hooks/useValidationWithRef';
import { RequirementV2 } from '../Requirement/RequirementV2';
import { useTranslation } from 'react-i18next';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';
import { useBlur } from '../../hooks/useBlur';

function RegisterAccount() {
    const navigate = useNavigate();
    const { formErrors, onHandleBlur } = useBlur();
    const { validateName, validateEmail, validatePassword, validatePhoneNumber } =
        useValidationWithRef();

    const { t, i18n } = useTranslation('translate');
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [open, setOpen] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    //create user with api
    const handleRegisterAccount = async () => {
        // get value of first name input
        const userImage =
            'https://res.cloudinary.com/dxulhqdp3/image/upload/v1726898366/perfumes/user-image/default-image-1.png';
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const phoneNumber = phoneRef.current.value.trim();

        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (
            formErrors.fname.status &&
            formErrors.lname.status &&
            formErrors.phone.status &&
            formErrors.email.status &&
            formErrors.password.status
        ) {
            // if (
            //     isFirstNameValid &&
            //     isLastNameValid &&
            //     isEmailValid &&
            //     isPasswordValid &&
            //     isPhoneNumberValid
            // ) {
            const registrationData = {
                email,
                password,
                firstName,
                lastName,

                phoneNumber: phoneNumber,
                imagePath: userImage, // default image
            };

            // console.log('registrationData: ', registrationData);

            try {
                const response = await authAPI.registerAccount(registrationData);
                if (response.status === 200) {
                    showNotificationMessage(
                        'success',
                        t('common.notifyMessage.register.regisT'),
                        t('common.notifyMessage.register.regisS'),
                    );
                    navigate(`/${i18n.language}/sign-in`);
                } else {
                    showNotificationMessage(
                        'warning',
                        t('common.notifyMessage.register.regisT'),
                        t('common.notifyMessage.register.regisEE'),
                    );
                }
            } catch (error) {
                showNotificationMessage(
                    'warning',
                    t('common.notifyMessage.register.regisT'),
                    'Email exists, Please try another email2!',
                );
            }
            // } else {
            //     setOpen(true);
            //     setTimeout(() => {
            //         setOpen(false);
            //     }, 6000);
            //     showNotificationMessage(
            //         'warning',
            //         t('common.notifyMessage.register.regisT'),
            //         t('common.notifyMessage.register.regisFI'),
            //     );
            // }
        } else {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 6000);
            showNotificationMessage(
                'warning',
                t('common.notifyMessage.register.regisT'),
                t('common.notifyMessage.register.regisF'),
            );
        }
    };

    const handleNavigateSignIn = () => {
        navigate(`/${i18n.language}/sign-in`);
        backTop();
    };

    const handleClickShowPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    return (
        <Container
            sx={{
                width: '50%',
                mt: 18,
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
                        {t('common.register.create')}
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
                                {t('common.register.des')}
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
                                    {t('common.register.fName')}
                                    <span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder={t('common.notifyMessage.register.fName')}
                                    fullWidth
                                    inputRef={firstNameRef}
                                    helperText={formErrors?.fname?.message}
                                    onBlur={() =>
                                        onHandleBlur(
                                            'fname',
                                            firstNameRef.current.value.trim(),
                                            validateName,
                                        )
                                    }
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
                                    {t('common.register.lName')}
                                    <span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder={t('common.notifyMessage.register.lName')}
                                    fullWidth
                                    inputRef={lastNameRef}
                                    helperText={formErrors?.lname?.message}
                                    onBlur={() =>
                                        onHandleBlur(
                                            'lname',
                                            lastNameRef.current.value.trim(),
                                            validateName,
                                        )
                                    }
                                />
                            </Grid>
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
                                <CustomizeTypography sx={{ color: theme.palette.text.secondary }}>
                                    {t('common.register.phone')}
                                    <span style={{ color: '#d14949' }}>*</span> :
                                </CustomizeTypography>
                                <TextFieldLogin
                                    placeholder={t('common.notifyMessage.register.phone')}
                                    fullWidth
                                    inputRef={phoneRef}
                                    helperText={formErrors?.phone?.message}
                                    onBlur={() =>
                                        onHandleBlur(
                                            'phone',
                                            phoneRef.current.value.trim(),
                                            validatePhoneNumber,
                                        )
                                    }
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
                                        {t('common.register.password')}
                                        <span style={{ color: '#d14949' }}>*</span> :
                                    </CustomizeTypography>
                                    <TextFieldPassword
                                        showPassword={showCurrentPassword}
                                        onHandleClick={handleClickShowPassword}
                                        placeholder={t('common.notifyMessage.login.pass')}
                                        fullWidth
                                        inputRef={passwordRef}
                                        helperText={formErrors?.password?.message}
                                        onBlur={() =>
                                            onHandleBlur(
                                                'password',
                                                passwordRef.current.value.trim(),
                                                validatePassword,
                                            )
                                        }
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
                                gap: 1,
                            }}
                        >
                            <ButtonComponent
                                textAction={t('common.register.register')}
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
                                {t('common.register.haveAccount')}
                            </CustomizeTypography>
                            <ButtonComponent
                                textAction={t('common.register.back')}
                                onHandleClick={handleNavigateSignIn}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegisterAccount;
