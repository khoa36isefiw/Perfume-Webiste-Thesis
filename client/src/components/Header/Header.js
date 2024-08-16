import { Avatar, Box, Container, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const headerData = [
    { headerText: 'Home', headerLink: '/' },
    { headerText: 'Shop', headerLink: '/shop' },
    { headerText: 'About Us', headerLink: '/about-us' },
    { headerText: 'Services', headerLink: '/services' },
    { headerText: 'Blog', headerLink: '/blog' },
];

const headerActionButton = [
    { headerIcon: <SearchIcon sx={{ fontSize: '24px' }} />, headerIconDest: '/search' },
    { headerIcon: <PersonIcon sx={{ fontSize: '24px' }} />, headerIconDest: '/sign-in' },
    { headerIcon: <FavoriteIcon sx={{ fontSize: '24px' }} />, headerIconDest: '/favorite-list' },
    {
        headerIcon: <ShoppingCartIcon sx={{ fontSize: '24px' }} />,
        headerIconDest: '/shopping-cart',
    },
];

function Header() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                height: '80px',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Container
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                <Box sx={{ height: '48px', width: '48px' }}>
                    <Avatar
                        sx={{ height: '100%', width: '100%', borderRadius: 0 }}
                        src={
                            'https://media.licdn.com/dms/image/v2/D5603AQHN6UEnO4czcw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720448281679?e=1729123200&v=beta&t=DZhDUnBbXmK-nc1Bz5Yxc9GOpXNsNa6lgBg70KgnSug'
                        }
                    />
                </Box>
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

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {headerActionButton.map((action, index) => (
                        <IconButton
                            key={index}
                            onClick={() => navigate(action.headerIconDest)}
                            sx={{
                                color: 'white',

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
            </Container>
        </Box>
    );
}

export default Header;
