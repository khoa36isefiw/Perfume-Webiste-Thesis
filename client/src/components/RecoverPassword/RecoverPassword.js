import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import {
    TextFieldLogin,
    TextFieldPassword,
    TextFieldVerifyCode,
} from '../TextFieldCustomize/TextFieldCustomize';
import { theme } from '../../Theme/Theme';
import { CustomizeDividerV2 } from '../CustomizeDividerV2/CustomizeDividerV2';
import CustomizeButton, {
    CustomizeButtonOutlined,
    CustomizeHoverButton,
    CustomizeHoverButtonV2,
} from '../CustomizeButton/CustomizeButton';
import { useNavigate } from 'react-router-dom';
import { CustomizeButtonInCart } from '../CustomizeButtonInCart/CustomizeButtonInCart';

function RecoverPassword() {
    return (
        <Container sx={{ width: '50%', mt: 10 }}>
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    mb: 1,
                }}
            >
                Forgot password
            </CustomizeTypography>
            <CustomizeTypography>Please enter your email to reset the password</CustomizeTypography>

            <Box sx={{ mt: 1, mb: 2 }}>
                <CustomizeTypography
                    sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                >
                    E-mail
                </CustomizeTypography>
                <TextFieldLogin placeholder="Email" fullWidth />
            </Box>
            <CustomizeHoverButtonV2 textAction={'Reset Password'} />
            <VerifyCode />
            <ConfirmResetPassword />
            <SetNewPassword />
        </Container>
    );
}

export default RecoverPassword;

const VerifyCode = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    mb: 1,
                }}
            >
                Check your email
            </CustomizeTypography>

            <CustomizeTypography>
                We sent a reset link to contact@dscode...com enter 6 digit code that mentioned in
                the email
            </CustomizeTypography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
                <TextFieldVerifyCode placeholder={'0'} />
                <TextFieldVerifyCode placeholder={'0'} />
                <TextFieldVerifyCode placeholder={'0'} />
                <TextFieldVerifyCode placeholder={'0'} />
                <TextFieldVerifyCode placeholder={'0'} />
                <TextFieldVerifyCode placeholder={'0'} />
            </Box>

            <CustomizeHoverButtonV2 textAction={'Verify Code'} />

            <CustomizeTypography sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                Haven’t got the email yet?{' '}
                <CustomizeTypography
                    sx={{
                        ml: 1,
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                        textDecoration: 'underline',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                        mb: 0,
                    }}
                    onClick={() => navigate('/recover-password')}
                >
                    Resend email
                </CustomizeTypography>
            </CustomizeTypography>
        </Box>
    );
};

const ConfirmResetPassword = () => {
    return (
        <Box>
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    mb: 1,
                }}
            >
                Password reset
            </CustomizeTypography>

            <CustomizeTypography>
                Your password has been successfully reset. click confirm to set a new password
            </CustomizeTypography>

            <CustomizeButtonInCart
                variant="outlined"
                textAction={'Confirm'}
                fullWidth={false}
                width={'150px'}
            />
        </Box>
    );
};

const SetNewPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [confrimNewPassword, setConfrimNewPassword] = useState(false);
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickConfirmNewPassword = () => {
        setConfrimNewPassword(!confrimNewPassword);
    };
    return (
        <Box>
            <CustomizeTypography
                sx={{
                    fontSize: '32px',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    mb: 1,
                }}
            >
                Set a new password
            </CustomizeTypography>
            <CustomizeTypography>
                Create a new password. Ensure it differs from previous ones for security
            </CustomizeTypography>

            <Box>
                <CustomizeTypography>Password</CustomizeTypography>
                <TextFieldPassword
                    showPassword={showNewPassword}
                    onHandleClick={handleClickShowNewPassword}
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <CustomizeTypography>Confirm Password</CustomizeTypography>
                <TextFieldPassword
                    showPassword={confrimNewPassword}
                    onHandleClick={handleClickConfirmNewPassword}
                />
            </Box>

            <Box sx={{ mt: 2 }}>
                <CustomizeHoverButton
                    textAction={'Update Password'}
                    color={'#fff'}
                    bgcolor={theme.palette.text.secondary}
                    borderColor={theme.palette.text.secondary}
                />
            </Box>
        </Box>
    );
};
