import {
    Box,
    IconButton,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    Avatar,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import VNFlag from '../../assets/images/VN-circle.png';
import UKFlag from '../../assets/images/UK-circle.png';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useShowNotificationMessage from '../../hooks/useShowNotificationMessage';

function MobileHeader({ setOpenMenu, openMenu }) {
    const { t, i18n } = useTranslation('translate');

    const navigate = useNavigate();
    const [enLanguage, setEnLanguage] = useState(false);
    const headerData = [
        { headerTextVi: 'Trang chủ', headerText: 'Home', headerLink: `/${i18n.language}` },
        { headerTextVi: 'Cửa hàng', headerText: 'Shop', headerLink: `/${i18n.language}/shop` },
        {
            headerTextVi: 'Chúng tôi',
            headerText: 'About Us',
            headerLink: `/${i18n.language}/about-us`,
        },
        {
            headerTextVi: 'Dịch vụ',
            headerText: 'Services',
            headerLink: `/${i18n.language}/our-services`,
        },
        { headerTextVi: 'Bài viết', headerText: 'Blog', headerLink: `/${i18n.language}/blog` },
    ];
    // Initialize the app's language based on localStorage
    useEffect(() => {
        const savedLanguage = window.localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage); // Set the language for i18n
        setEnLanguage(savedLanguage === 'en'); // Update local state
    }, []);

    const handleChangeLanguage = (lng) => {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${i18n.language}`, `/${lng}`);
        window.localStorage.setItem('language', lng); // set language is selected to local storage
        console.log('newPath: ', newPath);
        navigate(newPath);
        setEnLanguage(!enLanguage);
        i18n.changeLanguage(lng);
    };

    return (
        <Dialog open={openMenu} onClose={() => setOpenMenu(false)} fullScreen>
            <DialogContent sx={{ bgcolor: 'white', padding: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>Menu</Typography>
                    <IconButton onClick={() => setOpenMenu(false)}>
                        <CloseIcon sx={{ fontSize: '32px' }} />
                    </IconButton>
                </Box>

                {headerData.map((header, index) => (
                    <Typography
                        key={index}
                        sx={{
                            fontSize: '18px',
                            mb: 2,
                            '&:hover': {
                                cursor: 'pointer',
                                color: blue[600],
                            },
                        }}
                        onClick={() => {
                            navigate(header.headerLink);
                            setOpenMenu(false);
                        }}
                    >
                        {/* {t(`header.${header.title}`)} */}
                        {t(`common.${header.headerText}`)}
                    </Typography>
                ))}
            </DialogContent>
            <DialogActions>
                {/* mobile */}
                {!enLanguage ? (
                    <Box
                        sx={{
                            height: '55px',
                            width: '55px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            mr: 1,
                        }}
                        onClick={() => handleChangeLanguage('en')}
                    >
                        <Box
                            sx={{ height: '50px', width: '50px', borderRadius: '50%' }}
                            src={UKFlag}
                            alt="Language"
                            component={'img'}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: '55px',
                            width: '55px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            mr: 1,
                        }}
                        onClick={() => handleChangeLanguage('vi')}
                    >
                        <Box
                            sx={{ height: '50px', width: '50px', borderRadius: '50%' }}
                            src={VNFlag}
                            alt="Language"
                            component={'img'}
                        />
                    </Box>
                )}

                <Avatar
                    sx={{
                        bgcolor: '#000',
                        height: '50px',
                        width: '50px',
                        color: '#fff',
                        fontWeight: 'bold',
                        mx: 2,
                    }}
                >
                    Tomtoc
                </Avatar>
            </DialogActions>
        </Dialog>
    );
}

export default MobileHeader;
