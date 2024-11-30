import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ipadProScreen, mobileScreen, tabletScreen, theme } from '../../Theme/Theme';
import { useSelector } from 'react-redux';
import {
    AdminTypography,
    CustomizeTypography,
} from '../../components/CustomizeTypography/CustomizeTypography';
import AdminAuth from '../../components/AdminAuth/AdminAuth';
import { useTranslation } from 'react-i18next';

function AdminHeader() {
    const navigate = useNavigate();
    const { i18n } = useTranslation('translate');
    const adminHeader = window.localStorage.getItem('admin_titlle') || 'Dashboard';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

    console.log('window: ', window.innerWidth);
    // get product in cart

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

    return (
        <Box
            sx={{
                height: '80px',
                width: '100%',
                position: 'fixed',
                backgroundColor: '#f5f4fe',
                borderBottom: '1px solid #ccc',
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
                }}
            >
                <CustomizeTypography
                    sx={{
                        mb: 0,
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
                            fontSize: '18px',
                            textAlign: 'center',
                        },
                    }}
                    onClick={() => navigate(`/${i18n.language}`)}
                >
                    Tomtoc Perfumes
                </CustomizeTypography>
                {/* Menu for mobile */}

                <AdminTypography
                    sx={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        [mobileScreen]: {
                            fontSize: '18px',
                            textAlign: 'center',
                        },
                    }}
                >
                    Admin {adminHeader}
                </AdminTypography>

                <AdminAuth />
            </Container>
        </Box>
    );
}

export default AdminHeader;
