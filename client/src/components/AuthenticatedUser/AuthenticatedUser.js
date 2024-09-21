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
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAccount } from '../../redux/feature/AccountManagement/AccountManagementSlice';
import { theme } from '../../Theme/Theme';
import { useNavigate } from 'react-router-dom';

export default function AuthenticatedUser() {
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
                            src={userDefaultAvatar}
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
                        src={userDefaultAvatar}
                        alt="User Image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CustomizeTypography sx={{ mb: 0, fontSize: '14px', fontWeight: 'bold' }}>
                            {loggedInAccount?.firstName + ' ' + loggedInAccount?.lastName}
                        </CustomizeTypography>

                        <CustomizeTypography sx={{ mb: 0, fontSize: '14px', color: '#d5d5dd5' }}>
                            {/* macbook@gmail.com */}
                            {loggedInAccount?.email}
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
                            My Account
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
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
                            <ManageHistoryIcon fontSize="large" sx={{ color: '#fff' }} />
                        </ListItemIcon>
                        <CustomizeTypography
                            sx={{
                                mb: 0,
                                fontSize: '14px',
                            }}
                        >
                            My Purchase
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
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
                            Logout
                        </CustomizeTypography>
                    </Box>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
