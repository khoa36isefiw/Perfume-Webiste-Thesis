import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { theme } from '../../Theme/Theme';
import { backTop } from '../goBackTop/goBackTop';
import { AdminTypography } from '../CustomizeTypography/CustomizeTypography';
import RestoreIcon from '@mui/icons-material/Restore';

const filterDate = ['Last Day', 'Last Week', 'Last Month', 'Last Year'];

export default function DashboardMenu({ color }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateProfile = () => {
        setAnchorEl(null);
        // navigate('/profile-settings');
        backTop();
    };

    const handleNavigatePurchase = () => {
        setAnchorEl(null);
        // navigate('/my-purchase');
        backTop();
    };
    const handleNavigateChangePassword = () => {
        setAnchorEl(null);
        // navigate('/change-password');
        backTop();
    };

    const handleLogOut = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip
                    title={
                        <AdminTypography sx={{ fontSize: '13px', mb: 0 }}>
                            Filter By Day
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
                        <MoreVertIcon size="small" sx={{ fontSize: '24px', color: color }} />
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
                            minWidth: '100px',
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
                {filterDate.map((date, index) => (
                    <MenuItem
                        key={index}
                        onClick={handleNavigateProfile}
                        sx={{
                            mx: '2px',
                            '&:hover': {
                                color: theme.palette.text.primary,
                                bgcolor: '#d9d9d9',
                                borderRadius: 2,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <ListItemIcon>
                                <RestoreIcon fontSize="large" />
                            </ListItemIcon>

                            <AdminTypography sx={{ mb: 0, fontSize: '14px' }}>
                                {date}
                            </AdminTypography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
}
