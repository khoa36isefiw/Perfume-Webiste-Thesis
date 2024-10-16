import { Avatar, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import useAvatar from '../../assets/images/defaultA.png';
import { AdminTypography } from '../../components/CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PercentIcon from '@mui/icons-material/Percent';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const sidebarData = [
    {
        sidebarText: 'Dashboard',
        sidebarIcon: <SpaceDashboardIcon />,

        sidebarAddress: '/admin/dashboard',
    },
    {
        sidebarText: 'Users',
        sidebarIcon: <PersonIcon />,
        sidebarAddress: '/admin/manage-users',
    },
    {
        sidebarText: 'Category',
        sidebarIcon: <CategoryIcon />,
        sidebarAddress: '/admin/manage-categories',
    },
    {
        sidebarText: 'Products',
        sidebarIcon: <Inventory2Icon />,
        sidebarAddress: '/admin/manage-products',
    },
    {
        sidebarText: 'Orders',
        sidebarIcon: <LocalShippingIcon />,
        sidebarAddress: '/admin/manage-orders',
    },
    {
        sidebarText: 'Coupons',
        sidebarIcon: <PercentIcon />,
        sidebarAddress: '/admin/manage-coupons',
    },
];

function AdminSidebar() {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('Dashboard');
    const handleChooseSidebar = (buttonText) => {
        setActiveButton(buttonText.sidebarText);
        navigate(buttonText.sidebarAddress);
    };

    return (
        <Box sx={{ p: 2, position: 'sticky', top: 100, left: 0 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '80px',
                    bgcolor: '#fff',
                    borderRadius: 2,
                    px: 1,
                }}
            >
                <Avatar src={useAvatar} sx={{ height: 56, width: 56 }} />
                <Box sx={{ ml: 1 }}>
                    <AdminTypography
                        sx={{
                            fontSize: 16,
                            color: theme.palette.admin.primaryColor,
                            fontWeight: 'bold',
                        }}
                    >
                        Luna Kei
                    </AdminTypography>
                    <AdminTypography sx={{ fontSize: 13, color: '#6c757d', fontWeight: '500' }}>
                        Admin Tomtoc
                    </AdminTypography>
                </Box>
            </Box>

            {/* Page? */}
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
                {sidebarData.map((sidebar, index) => (
                    <Button
                        key={index}
                        sx={{
                            color:
                                activeButton === sidebar.sidebarText
                                    ? theme.palette.admin.primaryColor
                                    : '#000',

                            textTransform: 'initial',
                            fontSize: 16,
                            fontWeight: activeButton === sidebar.sidebarText ? 'bold' : 'normal',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            m: '4px',
                            py: '8px',
                            px: 4,
                            fontWeight: activeButton === sidebar.sidebarText ? 'bold' : 'normal',
                            '&:hover': {
                                fontWeight: 'bold',
                                color: theme.palette.admin.primaryColor,
                                transform: 'scale(1.05)',
                                bgcolor: theme.palette.admin.buttonColor,
                            },
                            bgcolor:
                                activeButton === sidebar.sidebarText
                                    ? theme.palette.admin.buttonColor
                                    : null,
                            borderRadius: '24px',
                            borderLeft:
                                activeButton === sidebar.sidebarText
                                    ? `4px solid ${theme.palette.admin.bgColor}`
                                    : null,
                            borderRight:
                                activeButton === sidebar.sidebarText
                                    ? `4px solid ${theme.palette.admin.bgColor}`
                                    : null,
                        }}
                        startIcon={sidebar.sidebarIcon}
                        onClick={() => handleChooseSidebar(sidebar)}
                    >
                        {sidebar.sidebarText}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}

export default AdminSidebar;
