import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/Theme';
import { backTop } from '../goBackTop/goBackTop';
import { Typography } from '@mui/material';
import Face5Icon from '@mui/icons-material/Face5';

export default function MobileBottomNavigation() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0); // Track selected icon
    const userData = JSON.parse(window.localStorage.getItem('user_data')); // get data of user who logged into the system

    const currentValue = JSON.parse(localStorage.getItem('bottom_nav_number'));

    const handleNavigateHomePage = (value) => {
        setValue(value);
        window.localStorage.setItem('bottom_nav_number', JSON.stringify(value));
        backTop();
        navigate('/');
    };

    const handleNavigateSignIn = (value) => {
        window.localStorage.setItem('bottom_nav_number', JSON.stringify(value));
        setValue(value);
        backTop();
        navigate('/sign-in');
    };

    const handleNavigateSearch = (value) => {
        window.localStorage.setItem('bottom_nav_number', JSON.stringify(value));
        setValue(value);
        backTop();
        navigate('/search');
    };

    const handleNavigateProfile = (value) => {
        window.localStorage.setItem('bottom_nav_number', JSON.stringify(value));
        setValue(value);
        backTop();
        navigate('/profile-settings');
    };

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{ bgcolor: '#000' }}
            >
                {/* Recents */}
                <BottomNavigationAction
                    onClick={() => handleNavigateHomePage(0)}
                    // label="Home"
                    label={
                        <Typography
                            sx={{
                                color: currentValue === 0 ? theme.palette.text.secondary : '#fff',
                                fontSize: '13px',
                                fontWeight: currentValue === 0 ? 'bold' : 'normal', // Bold when selected
                            }}
                        >
                            Home
                        </Typography>
                    }
                    sx={{
                        color: '#fff',
                        // change color for text
                        '.Mui-selected': {
                            color: theme.palette.text.secondary,
                        },
                        '.MuiBottomNavigationAction-label': { fontSize: '14px' },
                        fontSize: '16px',
                        fontWeight: currentValue === 0 ? 'bold' : 'normal', // Bold when selected
                    }}
                    icon={
                        <StoreIcon
                            sx={{
                                // change icon color
                                color: currentValue === 0 ? theme.palette.text.secondary : '#fff',
                                fontSize: '24px',
                            }}
                        />
                    }
                />

                {/* Favorites */}
                <BottomNavigationAction
                    // label="Search"
                    onClick={() => handleNavigateSearch(1)}
                    label={
                        <Typography
                            sx={{
                                color: currentValue === 1 ? theme.palette.text.secondary : '#fff',
                                fontSize: '13px',
                                fontWeight: currentValue === 1 ? 'bold' : 'normal', // Bold when selected
                            }}
                        >
                            Search
                        </Typography>
                    }
                    sx={{
                        color: '#fff',
                        // change color for text
                        '.Mui-selected': {
                            color: theme.palette.text.secondary,
                        },
                        fontSize: '16px',
                        fontWeight: currentValue === 1 ? 'bold' : 'normal',
                    }}
                    icon={
                        <SearchIcon
                            sx={{
                                color: currentValue === 1 ? theme.palette.text.secondary : '#fff',
                                fontSize: '24px',
                            }}
                        />
                    }
                />

                {/* Nearby */}
                <BottomNavigationAction
                    label="Nearby"
                    sx={{
                        color: '#fff',
                        // change color for text
                        '.Mui-selected': {
                            color: theme.palette.text.secondary,
                        },
                        fontSize: '16px',
                        fontWeight: currentValue === 2 ? 'bold' : 'normal',
                    }}
                    icon={
                        <LocationOnIcon
                            sx={{
                                color: currentValue === 2 ? theme.palette.text.secondary : '#fff',
                                fontSize: '24px',
                            }}
                        />
                    }
                />

                {/* Sign In */}
                {userData ? (
                    //  {/* for logged in */}
                    <BottomNavigationAction
                        // label="Sign In"
                        label={
                            <Typography
                                sx={{
                                    color:
                                        currentValue === 3 ? theme.palette.text.secondary : '#fff',
                                    fontSize: '13px',
                                    fontWeight: currentValue === 3 ? 'bold' : 'normal', // Bold when selected
                                }}
                            >
                                Me
                            </Typography>
                        }
                        sx={{
                            color: '#fff',
                            // change color for text
                            '.Mui-selected': {
                                color: theme.palette.text.secondary,
                            },
                            fontSize: '16px',
                            fontWeight: currentValue === 3 ? 'bold' : 'normal',
                        }}
                        icon={
                            <Face5Icon
                                sx={{
                                    color:
                                        currentValue === 3 ? theme.palette.text.secondary : '#fff',
                                    fontSize: '24px',
                                }}
                            />
                        }
                        onClick={() => handleNavigateProfile(3)}
                    />
                ) : (
                    <BottomNavigationAction
                        // label="Sign In"
                        label={
                            <Typography
                                sx={{
                                    color:
                                        currentValue === 4 ? theme.palette.text.secondary : '#fff',
                                    fontSize: '13px',
                                    fontWeight: currentValue === 4 ? 'bold' : 'normal', // Bold when selected
                                }}
                            >
                                Sign In{' '}
                            </Typography>
                        }
                        sx={{
                            color: '#fff',
                            // change color for text
                            '.Mui-selected': {
                                color: theme.palette.text.secondary,
                            },
                            fontSize: '16px',
                            fontWeight: currentValue === 4 ? 'bold' : 'normal',
                        }}
                        icon={
                            <PersonIcon
                                sx={{
                                    color:
                                        currentValue === 4 ? theme.palette.text.secondary : '#fff',
                                    fontSize: '24px',
                                }}
                            />
                        }
                        onClick={() => handleNavigateSignIn(4)}
                    />
                )}
            </BottomNavigation>
        </Box>
    );
}
