import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Container,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextFieldLogin } from '../TextFieldCustomize/TextFieldCustomize';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

const ProfileSettings = () => {
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    return (
        <Container sx={{ display: 'flex', height: '100vh' }}>
            {/* Main content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <CustomizeTypography variant="h4" sx={{ mb: 4 }}>
                    My Profile
                </CustomizeTypography>
                <CustomizeTypography variant="body2" sx={{ mb: 4 }}>
                    Your profile is a record of your personal information that defines who you are.
                </CustomizeTypography>

                <Grid2 container spacing={4}>
                    <Grid2 item xs={12} md={6}>
                        <TextFieldLogin
                            fullWidth
                            placeholder="hisalim.ux@gmail.com"
                            // margin="normal"
                        />
                        <TextFieldLogin
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            defaultValue="Muhammad"
                            margin="normal"
                        />
                        <TextFieldLogin
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            defaultValue="Salim"
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Update
                        </Button>
                    </Grid2>

                    <Grid2 item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Change Password
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            You can change your password for security reasons or reset it if you
                            forget it.
                        </Typography>

                        <TextFieldLogin
                            fullWidth
                            label="Current Password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowCurrentPassword}
                                            edge="end"
                                        >
                                            {showCurrentPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextFieldLogin
                            fullWidth
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowNewPassword} edge="end">
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextFieldLogin
                            fullWidth
                            label="Your Name"
                            variant="outlined"
                            defaultValue="Salim"
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Update
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
};

export default ProfileSettings;
