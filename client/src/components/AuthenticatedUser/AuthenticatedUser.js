import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PasswordIcon from '@mui/icons-material/Password';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';

import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import { authAPI } from '../../api/authAPI';
import { theme } from '../../Theme/Theme';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/authContext';

export default function AuthenticatedUser() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const userData = JSON.parse(localStorage.getItem('user_data')) || null;
    const { t, i18n } = useTranslation('translate');
    const { role } = useAuth();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateProfile = () => {
        setAnchorEl(null);
        navigate(`/${i18n.language}/profile-settings`);
        backTop();
    };

    const handleNavigatePurchase = () => {
        setAnchorEl(null);
        navigate(`/${i18n.language}/my-purchase`);
        backTop();
    };
    const handleNavigateChangePassword = () => {
        setAnchorEl(null);
        navigate(`/${i18n.language}/change-password`);
        backTop();
    };

    const handleNavigateDashboard = () => {
        setAnchorEl(null);
        navigate(`/admin/dashboard`);
        backTop();
    };

    const handleLogOut = async () => {
        try {
            setAnchorEl(null);

            const logout = await authAPI.logout(userData.email);

            if (logout) {
                window.localStorage.removeItem('user_data');
                window.localStorage.removeItem('token');
                console.log('Logged out successfully');
                // navigate('/');
                navigate(`/${i18n.language}/sign-in`);
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display: userData !== null ? 'block' : 'none',
                }}
            >
                <Tooltip
                    title={
                        <CustomizeTypography sx={{ fontSize: '13px', mb: 0 }}>
                            Account settings
                        </CustomizeTypography>
                    }
                >
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 48, height: 48 }}
                            src={userData?.imagePath || 'https://i.pravatar.cc/300'}
                            alt="User Image"
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            // maxWidth: '250px',
                            maxWidth: '240px',
                            bgcolor: '#3D3D3D',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                minWidth: 32,
                                minHeight: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                bgcolor: '#3D3D3D',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleNavigateProfile}>
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        src={userData?.imagePath}
                        alt="User Image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CustomizeTypography
                            sx={{
                                mb: 0,
                                fontSize: '14px',
                                fontWeight: 'bold',
                                maxWidth: '180px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {[userData?.firstName, userData?.lastName].filter(Boolean).join(' ')}
                        </CustomizeTypography>

                        <CustomizeTypography
                            sx={{
                                mb: 0,
                                fontSize: '14px',
                                color: '#d5d5dd5',
                                maxWidth: '180px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {/* macbook@gmail.com */}
                            {userData?.email}
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
                <Divider sx={{ bgcolor: '#fff' }} />
                <MenuItem onClick={handleNavigateProfile}>
                    <Box
                        sx={{
                            display: 'flex',
                            '&:hover': {
                                color: theme.palette.text.primary,
                                transform: 'scale(1.10)',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <ManageAccountsIcon fontSize="large" sx={{ color: '#fff' }} />
                        </ListItemIcon>

                        <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                            {t('common.accountSettings.accInfor.myAcc')}
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleNavigateChangePassword}>
                    <Box
                        sx={{
                            display: 'flex',
                            '&:hover': {
                                color: theme.palette.text.primary,
                                transform: 'scale(1.10)',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <PasswordIcon fontSize="large" sx={{ color: '#fff' }} />
                        </ListItemIcon>

                        <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                            {t('common.accountSettings.changePass.title')}
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleNavigatePurchase}>
                    <Box
                        sx={{
                            display: 'flex',
                            '&:hover': {
                                color: theme.palette.text.primary,
                                transform: 'scale(1.10)',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <ManageHistoryIcon fontSize="large" sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <CustomizeTypography
                            sx={{
                                mb: 0,
                                fontSize: '14px',
                            }}
                        >
                            {t('common.accountSettings.purchase.title')}
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
                {role === 1 && (
                    <MenuItem onClick={handleNavigateDashboard}>
                        <Box
                            sx={{
                                display: 'flex',
                                '&:hover': {
                                    color: theme.palette.text.primary,
                                    transform: 'scale(1.10)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <SpaceDashboardIcon fontSize="large" sx={{ color: '#fff' }} />
                            </ListItemIcon>

                            <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {t('common.accountSettings.dashboard')}
                                {/* Dashboard */}
                            </CustomizeTypography>
                        </Box>
                    </MenuItem>
                )}

                <Divider sx={{ bgcolor: '#fff' }} />
                <MenuItem onClick={handleLogOut}>
                    <Box
                        sx={{
                            display: 'flex',
                            '&:hover': {
                                color: theme.palette.text.primary,
                                transform: 'scale(1.10)',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="large" sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <CustomizeTypography sx={{ mb: 0, fontSize: '14px' }}>
                            {t('common.accountSettings.logout')}
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
