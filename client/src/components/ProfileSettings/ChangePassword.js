import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeAccountText } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldPassword } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';

import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import { useDispatch, useSelector } from 'react-redux';

import { authAPI } from '../../api/authAPI';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import { userAPI } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// current password --> cho tự nhập --> check với password login
// nếu oke --> cho nhảy sang step đổi mật khẩu
function ChangePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('translate');
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confrimNewPassword, setConfrimNewPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);
    // hooks for showing notifications
    const {
        showNotification,
        showAnimation,
        messageType,
        messageTitle,
        messageContent,
        showMessage,
        handleCloseNotification,
    } = useShowNotificationMessage();

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
                console.log('loginData: ', loginData);

                if (loginData.status === 200) {
                    console.log('Correct password');
                    setShowChangePassword(true);
                    showMessage('success', 'Change Password', 'Starting create new your password');
                } else {
                    showMessage('warning', 'Change Password', 'Your current password is incorrect');
                    setShowChangePassword(false);
                }
            } catch (error) {
                showMessage('warning', 'Change Password', 'Your current password is incorrect');
                console.error('Error during login attempt:', error);
                setShowChangePassword(false);
            }
        } else {
            showMessage('warning', 'Change Password', 'Please enter your email!');
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
                        showMessage(
                            'success',
                            'Change Password',
                            'You have successfully changed your password!',
                        );
                        setTimeout(() => {
                            navigate('/');
                        }, 2500);
                    }
                } catch (error) {
                    showMessage(
                        'error',
                        'Change Password',
                        error.response?.data || 'Failed to change password',
                    );
                }
            } else {
                showMessage('warning', 'Change Password', 'Your passwords do not match');
            }
        } else {
            showMessage('warning', 'Change Password', 'Please enter new password!');
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
                    {t('common.accountSettings.changePass.title')}
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
                                placeholder={'Your current password'}
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
                                placeholder={'Your new password'}
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
                                placeholder={'Confirm new password'}
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

export default ChangePassword;
