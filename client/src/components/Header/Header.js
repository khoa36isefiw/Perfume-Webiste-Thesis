import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Drawer,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { mobileScreen, theme } from '../../Theme/Theme';
import MenuIcon from '@mui/icons-material/Menu';

const headerData = [
    { headerText: 'Home', headerLink: '/' },
    { headerText: 'Shop', headerLink: '/shop' },
    { headerText: 'About Us', headerLink: '/about-us' },
    { headerText: 'Services', headerLink: '/our-services' },
    { headerText: 'Blog', headerLink: '/blog' },
];

const headerActionButton = [
    {
        headerIcon: <SearchIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/search',
        des: 'Search',
    },
    {
        headerIcon: <PersonIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/sign-in',
        des: 'Sign In',
    },
    {
        headerIcon: <FavoriteIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/favorite-list',
        des: 'Favorite',
    },
    {
        headerIcon: <ShoppingCartIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/shopping-cart',
        des: 'Cart',
    },
];

function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 739);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    console.log('isMobile: ', isMobile);

    // open menu setting
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
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

    return (
        <Box
            sx={{
                height: '80px',
                width: '100%',
                position: 'fixed',
                backgroundColor: 'black',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                [mobileScreen]: {
                    width: '100%',
                },
            }}
        >
            <Container
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <CustomizeTypography
                    sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: theme.palette.secondaryText,
                        [mobileScreen]: {
                            fontSize: theme.fontSize.mobile.text,
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    Tomtoc Perfumes
                </CustomizeTypography>
                {/* Menu for mobile */}

                {isMobile ? (
                    <IconButton onClick={toggleMenu}>
                        <MenuIcon sx={{ fontSize: '32px', color: '#fff' }} />
                    </IconButton>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            flexGrow={1}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {headerData.map((header, index) => (
                                <CustomizeTypography
                                    key={index}
                                    onClick={() => navigate(header.headerLink)}
                                    sx={{
                                        fontSize: '16px',
                                        color: 'white',
                                        margin: '0 32px',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {header.headerText}
                                </CustomizeTypography>
                            ))}
                        </Box>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {headerActionButton.map((action, index) => (
                                <IconButton
                                    key={index}
                                    onClick={(event) =>
                                        action.headerIconDest === '/sign-in'
                                            ? handleMenuOpen(event)
                                            : navigate(action.headerIconDest)
                                    }
                                    sx={{
                                        color: 'white',
                                        mr: 1,
                                        '&:hover': {
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {action.headerIcon}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                )}

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        onMouseLeave: handleMenuClose,
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: theme.palette.background.paper,
                            // color: theme.palette.text.primary,
                            width: '150px',
                        },
                    }}
                >
                    <MenuItem sx={{ fontSize: '14px' }} onClick={() => handleMenuClick('/sign-in')}>
                        Sign In
                    </MenuItem>
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => handleMenuClick('/create-account')}
                    >
                        Create account
                    </MenuItem>
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => handleMenuClick('/settings')}
                    >
                        Favorite list
                    </MenuItem>
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => handleMenuClick('/profile-settings')}
                    >
                        My Account
                    </MenuItem>
                </Menu>

                <Drawer
                    anchor="left" // menu will appear on left
                    open={isMenuOpen}
                    onClose={toggleMenu} // close menu when clicking outside
                    sx={{
                        '.MuiPaper-root': {
                            bgcolor: '#555 ',
                        },
                    }}
                >
                    <Box
                        sx={{ width: 250, bgcolor: '#555', padding: 2 }}
                        role="presentation"
                        onClick={toggleMenu} // Đóng menu khi click vào một mục trong menu
                    >
                        {headerData.map((header, index) => (
                            <Box
                                key={index}
                                sx={{
                                    padding: '8px',
                                    '&:hover': {
                                        backgroundColor: theme.palette.background.default,
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => navigate(header.headerLink)}
                            >
                                <CustomizeTypography sx={{ fontSize: '16px', fontWeight:'bold' }}>
                                    {header.headerText}
                                </CustomizeTypography>
                            </Box>
                        ))}
                        {/* Display action buttons at the bottom */}

                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            {headerActionButton.map((action, index) => (
                                <IconButton
                                    key={index}
                                    onClick={() => navigate(action.headerIconDest)}
                                    sx={{
                                        color: '#fff',
                                        mr: 1,
                                        mb: 2,
                                        '&:hover': {
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    {action.headerIcon}{' '}
                                    <CustomizeTypography sx={{ mb: 0, fontWeight: 'bold', ml: 2 }}>
                                        {action.des}
                                    </CustomizeTypography>
                                </IconButton>
                            ))}
                        </Box>
                    </Box>
                </Drawer>
            </Container>
        </Box>
    );
}

export default Header;
