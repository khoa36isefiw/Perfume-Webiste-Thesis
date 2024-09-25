import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Menu, MenuItem, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';

import { useSelector } from 'react-redux';

import {
    AdminTypography,
    CustomizeTypography,
} from '../../components/CustomizeTypography/CustomizeTypography';
import { TextFieldCustomizeV2 } from '../../components/TextFieldCustomize/TextFieldCustomize';
import CustomizeButton, {
    CustomizeButtonOutlined,
} from '../../components/CustomizeButton/CustomizeButton';
import AdminAuth from '../../components/AdminAuth/AdminAuth';

function AdminHeader() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHeader, setActiveHeader] = useState('Home');

    console.log('window: ', window.innerWidth);
    // get product in cart
    const productListInCart = useSelector((state) => state.cartManagement.productInfor);
    const isLogged = useSelector((state) => state.accountManagement.loggedInAccount);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 739);
        setIsTablet(window.innerWidth < 1024);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    console.log('isMobile: ', isMobile);

    // open menu setting

    // close menu setting
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // click into menu item
    const handleMenuClick = (path) => {
        navigate(path);
        handleMenuClose();
    };

    // open menu for mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleHeaderClick = (header) => {
        setActiveHeader(header.headerText);
        navigate(header.headerLink);
    };

    console.log('productListInCart: ', productListInCart);
    return (
        <Box
            sx={{
                minHeight: '150px',
                width: '100%',
                position: 'fixed',
                backgroundColor: '#f5f4fe',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                [tabletScreen]: {
                    minHeight: '80px',
                },
                [mobileScreen]: {
                    width: '100%',
                    minHeight: '80px',
                },
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // [tabletScreen]: {
                    //     flexDirection: 'column',
                    // },
                }}
            >
                <CustomizeTypography
                    sx={{
                        width: '200px',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        background: `linear-gradient(120deg, ${theme.palette.text.main}, ${theme.palette.text.secondary})`,
                        // chỉ hiển thị màu nền ở phần text
                        WebkitBackgroundClip: 'text',
                        // ẩn màu văn bản mặc định
                        WebkitTextFillColor: 'transparent',
                        [ipadProScreen]: {
                            fontSize: '26px',
                        },
                        [tabletScreen]: {
                            fontSize: '24px',
                        },
                        [mobileScreen]: {
                            fontSize: '20px',
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    Tomtoc Perfumes
                </CustomizeTypography>
                {/* Menu for mobile */}

                <AdminTypography sx={{ fontSize: '28px', fontWeight: 'bold' }}>
                    Overview
                </AdminTypography>

                <AdminAuth />
            </Container>
        </Box>
    );
}

export default AdminHeader;
