import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeAccountText } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldPassword } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';
import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from '../../api/authAPI';
import { userAPI } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbarMessage } from '../../hooks/useSnackbarMessage';

// current password --> cho tự nhập --> check với password login
// nếu oke --> cho nhảy sang step đổi mật khẩu
function ChangePassword() {
    const navigate = useNavigate();

    const { t } = useTranslation('translate');
    const { showNotificationMessage } = useSnackbarMessage(); // multiple notification
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confrimNewPassword, setConfrimNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);

    const userData = JSON.parse(localStorage.getItem('user_data'));

    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickConfirmNewPassword = () => {
        setConfrimNewPassword(!confrimNewPassword);
    };

    // handle for showing change password
    const handleNextStep = async () => {
        const currentPassword = currentPasswordRef.current.value.trim();
        const data = {
            email: userData.email,
            password: currentPassword,
        };

        if (currentPassword) {
            try {
                const loginData = await authAPI.login(data);
                if (loginData.status === 200) {
                    setShowChangePassword(true);
                    showNotificationMessage(
                        'success',
                        `${t('common.notifyMessage.changePassword.changeT')}`,
                        `${t('common.notifyMessage.changePassword.currentS')}`,
                    );
                } else {
                    showNotificationMessage(
                        'warning',
                        `${t('common.notifyMessage.changePassword.changeT')}`,
                        `${t('common.notifyMessage.changePassword.currentW')}`,
                    );
                    setShowChangePassword(false);
                }
            } catch (error) {
                showNotificationMessage(
                    'warning',
                    `${t('common.notifyMessage.changePassword.changeT')}`,
                    `${t('common.notifyMessage.changePassword.currentW')}`,
                );
                console.error('Error during login attempt:', error);
                setShowChangePassword(false);
            }
        } else {
            showNotificationMessage(
                'warning',
                `${t('common.notifyMessage.changePassword.changeT')}`,
                `${t('common.notifyMessage.changePassword.currentW2')}`,
            );
        }
    };

    const handleChangePassword = async () => {
        const newPassword = newPasswordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        console.log('userData.userId: ', userData.userId);
        if (newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                const data = {
                    // password, newPassword

                    newPassword,
                    confirmPassword, // New password
                };

                try {
                    const response = await userAPI.changePassword(userData.userId, data);
                    if (response) {
                        showNotificationMessage(
                            'success',
                            `${t('common.notifyMessage.changePassword.changeT')}`,
                            `${t('common.notifyMessage.changePassword.changeS')}`,
                        );
                        setTimeout(() => {
                            navigate('/');
                        }, 2500);
                    }
                } catch (error) {
                    showNotificationMessage(
                        'error',
                        `${t('common.notifyMessage.changePassword.changeT')}`,
                        error.response?.data || 'Failed to change password',
                    );
                }
            } else {
                showNotificationMessage(
                    'warning',
                    `${t('common.notifyMessage.changePassword.changeT')}`,
                    `${t('common.notifyMessage.changePassword.changeW')}`,
                );
            }
        } else {
            showNotificationMessage(
                'warning',
                `${t('common.notifyMessage.changePassword.changeT')}`,
                `${t('common.notifyMessage.changePassword.changeW2')}`,
            );
        }
    };

    return (
        <Container>
            <Grid xs={12} lg={12}>
                <CustomizeAccountText
                    variant="h6"
                    sx={{
                        fontSize: '18px',
                        mb: 2,
                        color: theme.palette.text.secondary,
                        fontWeight: 'bold',
                    }}
                >
                    {showChangePassword
                        ? t('common.accountSettings.changePass.title')
                        : t('common.accountSettings.changePass.verify')}
                </CustomizeAccountText>
            </Grid>
            <Grid xs={12} lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    {t('common.accountSettings.changePass.t1')}
                </CustomizeAccountText>
            </Grid>
            <CustomizeDividerVertical8 />
            {!showChangePassword && (
                <Box>
                    <Grid container item spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <CustomizeAccountText
                                sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                            >
                                {t('common.accountSettings.changePass.currentPass')}
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                {t('common.accountSettings.changePass.currentText')}
                            </CustomizeAccountText>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            {/* <TextFieldLogin fullWidth placeholder="hisalim.ux@gmail.com" /> */}

                            <TextFieldPassword
                                showPassword={showCurrentPassword}
                                placeholder={t('common.notifyMessage.changePassword.currentHolder')}
                                onHandleClick={handleClickShowCurrentPassword}
                                defaultValue={loggedInAccount?.password}
                                inputRef={currentPasswordRef}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} lg={12}>
                        <CustomizeHoverButtonV2
                            textAction={t('common.accountSettings.changePass.nStep')}
                            onHandleClick={handleNextStep}
                        />
                    </Grid>
                </Box>
            )}

            {showChangePassword && (
                <React.Fragment>
                    <Grid container item spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <CustomizeAccountText
                                sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                            >
                                {t('common.accountSettings.changePass.nPass')}
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                {t('common.accountSettings.changePass.nPass1')}
                            </CustomizeAccountText>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <TextFieldPassword
                                showPassword={showNewPassword}
                                placeholder={t('common.notifyMessage.changePassword.changeNew')}
                                onHandleClick={handleClickShowNewPassword}
                                inputRef={newPasswordRef}
                            />
                            {/* <TextFieldLogin fullWidth placeholder="Muhammad" /> */}
                        </Grid>
                    </Grid>

                    <Grid container item spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <CustomizeAccountText
                                sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                            >
                                {t('common.accountSettings.changePass.cNPass')}
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                {t('common.accountSettings.changePass.cNPass1')}
                            </CustomizeAccountText>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <TextFieldPassword
                                showPassword={confrimNewPassword}
                                placeholder={t('common.notifyMessage.changePassword.changeCNew')}
                                onHandleClick={handleClickConfirmNewPassword}
                                inputRef={confirmPasswordRef}
                            />
                        </Grid>
                    </Grid>
                    <CustomizeHoverButtonV2
                        textAction={t('common.accountSettings.changePass.change')}
                        onHandleClick={handleChangePassword}
                    />
                </React.Fragment>
            )}
        </Container>
    );
}

export default ChangePassword;
