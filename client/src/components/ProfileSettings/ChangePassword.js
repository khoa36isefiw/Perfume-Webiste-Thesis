import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { CustomizeAccountText } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldPassword } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';

import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import { userAPI } from '../../api/userApi';
import { authAPI } from '../../api/authAPI';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

// current password --> cho tự nhập --> check với password login
// nếu oke --> cho nhảy sang step đổi mật khẩu
function ChangePassword() {
    const dispatch = useDispatch();
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

        try {
            const loginData = await authAPI.login(data);

            if (loginData) {
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
    };

    // const handleChangePassword = async () => {
    //     const newPassword = newPasswordRef.current.value.trim();
    //     const confirmPassword = confirmPasswordRef.current.value.trim();
    //     if (newPassword === confirmPassword) {
    //         console.log('chayj voo day');
    //         //same

    //         // dispatch(changePassword({ email: loggedInAccount.email, password: newPassword }));
    //         const data = {
    //             userId: userData.userId,
    //             // email: userData.email,
    //             password: newPassword,
    //             newPassword: confirmPassword,
    //         };

    //         const response = await userAPI.changePassword(data);
    //         if (response) {
    //             console.log('chay vo change password');
    //             showMessage(
    //                 'success',
    //                 'Change Password',
    //                 'You have successfully changed your password!',
    //             );
    //         }
    //     } else {
    //         showMessage('warning', 'Change Password', 'Your password is not match');
    //         console.log('không change change password');
    //     }
    // };
    const handleChangePassword = async () => {
        const newPassword = newPasswordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        console.log('userData.userId: ', userData.userId);
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
                    Change Password
                </CustomizeAccountText>
            </Grid>
            <Grid xs={12} lg={12}>
                <CustomizeAccountText variant="h6" sx={{ mb: 2 }}>
                    You can change your password for security reasons or reset it if you forget it.
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
                                Current Password
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                Enter your current password here
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
                            textAction={'Next Step'}
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
                                New Password
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                Enter your new password here
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
                                Confirm Password
                            </CustomizeAccountText>
                            <CustomizeAccountText
                                sx={{ fontSize: '14px', color: theme.palette.text.subText }}
                            >
                                Confirm your new password here
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
                        textAction={'Change Password'}
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
