import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    Badge,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AuthenticatedUser from '../AuthenticatedUser/AuthenticatedUser';
import CustomizeButton, { CustomizeButtonOutlined } from '../CustomizeButton/CustomizeButton';
import { TextFieldCustomizeV2 } from '../TextFieldCustomize/TextFieldCustomize';

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
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHeader, setActiveHeader] = useState('Home');

    console.log('window: ', window.innerWidth);
    // get product in cart
    const productListInCart = useSelector((state) => state.cartManagement.productInfor);

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

    const handleHeaderClick = (header) => {
        setActiveHeader(header.headerText);
        navigate(header.headerLink);
    };

    const handleIconHeaderClick = (action, event) => {
        if (action.headerIconDest === '/sign-in') {
            // open the menu for "Sign In"
            setAnchorEl(event.currentTarget);
        } else {
            // close the menu if it's another icon
            setAnchorEl(null);
            // navigate to the icon's destination
            navigate(action.headerIconDest);
        }
        // set active header to the clicked icon
        setActiveHeader(action.des);
    };

    console.log('productListInCart: ', productListInCart);
    return (
        <Box
            sx={{
                minHeight: '150px',
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

                <Box>
                    {isMobile || isTablet ? (
                        <IconButton onClick={toggleMenu}>
                            <MenuIcon sx={{ fontSize: '32px', color: '#fff' }} />
                        </IconButton>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',

                                [tabletScreen]: {
                                    flexDirection: 'column',
                                },
                            }}
                        >
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
                                        onClick={() => handleHeaderClick(header)}
                                        sx={{
                                            fontSize: '16px',
                                            color:
                                                activeHeader === header.headerText
                                                    ? theme.palette.text.secondary
                                                    : 'white',
                                            margin: '0 32px',
                                            fontWeight:
                                                activeHeader === header.headerText
                                                    ? 'bold'
                                                    : 'normal',
                                            borderBottom:
                                                activeHeader === header.headerText
                                                    ? `1px solid ${theme.palette.text.secondary}`
                                                    : '1px solid transparent',
                                            transition:
                                                'color 0.3s ease, font-weight 0.3s ease, border-bottom 0.3s ease',
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
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: 2,
                                    [tabletScreen]: {
                                        mt: 2,
                                    },
                                }}
                            >
                                <TextFieldCustomizeV2
                                    // default
                                    placeholder={'Search here...'}
                                    sx={{
                                        width: '360px',
                                        [tabletScreen]: { width: '260px' },
                                        [mobileScreen]: {
                                            width: '100%',
                                        },
                                    }}
                                />

                                <IconButton
                                    sx={{
                                        bgcolor: theme.palette.text.secondary,
                                        borderTopLeftRadius: 1,
                                        borderBottomLeftRadius: 1,
                                        mr: 1,
                                        '&:hover': {
                                            bgcolor: theme.palette.text.secondary,
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        },
                                        [tabletScreen]: {
                                            mr: 4,
                                            mb: 2,
                                        },
                                    }}
                                >
                                    <SearchIcon sx={{ fontSize: '24px', color: 'white' }} />
                                </IconButton>

                                <Badge
                                    badgeContent={
                                        productListInCart && productListInCart.length > 0
                                            ? productListInCart.length
                                            : ''
                                    }
                                    max={9}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            fontSize: '10px',
                                            // fontWeight: 'bold',
                                            right: 4,
                                            top: 4,
                                            color: '#fff',
                                            bgcolor:
                                                productListInCart && productListInCart.length > 0
                                                    ? theme.palette.background.thirth
                                                    : 'black',
                                        },
                                    }}
                                    color="green"
                                >
                                    <IconButton
                                        sx={{
                                            mr: 1,
                                            '&:hover': {
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                            },
                                            [tabletScreen]: {
                                                mr: 4,
                                                mb: 2,
                                            },
                                        }}
                                    >
                                        <ShoppingCartIcon
                                            sx={{ fontSize: '24px', color: 'white' }}
                                        />
                                    </IconButton>
                                </Badge>
                            </Box>
                        </Box>
                    )}
                </Box>
                {/* <AuthenticatedUser /> */}
                {!isMobile && !isTablet && (
                    <>
                        <CustomizeButton textAction={'Sign In'} />
                        <CustomizeButtonOutlined textAction={'Register'} />
                    </>
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
                                <CustomizeTypography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
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
