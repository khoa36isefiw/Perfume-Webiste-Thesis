import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { CustomizeAccountText } from '../CustomizeTypography/CustomizeTypography';
import { TextFieldPassword } from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeHoverButtonV2 } from '../CustomizeButton/CustomizeButton';

import { CustomizeDividerVertical8 } from '../CustomizeDivider/CustomizeDivider';

function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confrimNewPassword, setConfrimNewPassword] = useState(false);
    const handleChangePassword = () => {};
    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickConfirmNewPassword = () => {
        setConfrimNewPassword(!confrimNewPassword);
    };

    console.log('current password status: ', showCurrentPassword);

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
                    />
                </Grid>
            </Grid>

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
                    />
                </Grid>
            </Grid>
            <CustomizeHoverButtonV2
                textAction={'Change Password'}
                onHandleClick={handleChangePassword}
            />
        </Container>
    );
}

export default ChangePassword;
