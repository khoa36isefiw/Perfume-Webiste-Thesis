import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import userDefaultAvatar from '../../assets/images/defaultA.png';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PasswordIcon from '@mui/icons-material/Password';

import { useDispatch, useSelector } from 'react-redux';
import { logoutAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import { mobileScreen, theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';

export default function AdminAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const loggedInAccount = useSelector((state) => state.accountManagement.loggedInAccount);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateProfile = () => {
        setAnchorEl(null);
        navigate('/profile-settings');
        backTop();
    };

    const handleNavigateChangePassword = () => {
        setAnchorEl(null);
        navigate('/change-password');
        backTop();
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        dispatch(logoutAccount());
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip
                    title={
                        <AdminTypography sx={{ fontSize: '13px', mb: 0 }}>
                            Account settings
                        </AdminTypography>
                    }
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onClick={handleClick}
                    >
                        <IconButton
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    [mobileScreen]: {
                                        width: 36,
                                        height: 36,
                                    },
                                }}
                                src={loggedInAccount?.userImage}
                                alt="User Image"
                            />
                        </IconButton>
                        <Button
                            endIcon={
                                <ArrowDropDownIcon sx={{ fontSize: '24px', color: 'black' }} />
                            }
                            sx={{
                                textTransform: 'initial',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                },
                            }}
                            disableTouchRipple
                        >
                            <Box>
                                <AdminTypography
                                    sx={{
                                        [mobileScreen]: {
                                            fontSize: 13,
                                        },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Admin Tomtoc
                                </AdminTypography>
                                <AdminTypography
                                    sx={{
                                        [mobileScreen]: {
                                            fontSize: 13,
                                        },

                                        fontSize: 14,
                                    }}
                                >
                                    @admintomtoc
                                </AdminTypography>
                            </Box>
                        </Button>
                    </Box>
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
                            minWidth: '220px',
                            // bgcolor: '#3D3D3D',
                            bgcolor: 'white',
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
                                bgcolor: 'white',
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
                        src={loggedInAccount?.userImage}
                        alt="User Image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <AdminTypography sx={{ mb: 0, fontSize: '14px', fontWeight: 'bold' }}>
                            {loggedInAccount?.firstName + ' ' + loggedInAccount?.lastName}
                        </AdminTypography>

                        <AdminTypography
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
                            {loggedInAccount?.email}
                        </AdminTypography>
                    </Box>
                </MenuItem>
                <Divider sx={{ bgcolor: '#fff' }} />
                <MenuItem
                    onClick={handleNavigateProfile}
                    sx={{
                        '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: '#d3d3d3',
                        },
                    }}
                >
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
                            <ManageAccountsIcon fontSize="large" />
                        </ListItemIcon>

                        <AdminTypography sx={{ mb: 0, fontSize: '14px' }}>
                            My Account
                        </AdminTypography>
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={handleNavigateChangePassword}
                    sx={{
                        '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: '#d3d3d3',
                        },
                    }}
                >
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
                            <PasswordIcon fontSize="large" />
                        </ListItemIcon>

                        <AdminTypography sx={{ mb: 0, fontSize: '14px' }}>
                            Change Password
                        </AdminTypography>
                    </Box>
                </MenuItem>

                <Divider sx={{ bgcolor: '#fff' }} />
                <MenuItem
                    onClick={handleLogOut}
                    sx={{
                        '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: '#d3d3d3',
                        },
                    }}
                >
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
                            <LockIcon fontSize="large" sx={{ color: '#ff304f' }} />
                        </ListItemIcon>
                        <AdminTypography
                            sx={{ mb: 0, fontSize: '14px', color: '#ff304f', fontWeight: 'bold' }}
                        >
                            Logout
                        </AdminTypography>
                    </Box>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
