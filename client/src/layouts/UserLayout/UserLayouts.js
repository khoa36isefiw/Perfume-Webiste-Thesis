import { Box, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { theme } from '../../Theme/Theme';
import BackToTop from '../../components/ScrollTop/ScrollTop';
import NewHeader from '../../components/Header/NewHeader';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';
import Chatbot from '../../components/Chatbot/Chatbot';

function UserLayouts({ children }) {
    const location = useLocation();
    const { i18n } = useTranslation();

    // remove some params in local storage
    useEffect(() => {
        if (
            location.pathname !== `/${i18n.language}/shop` &&
            location.pathname !== `/${i18n.language}/`
        ) {
            window.localStorage.removeItem('filter');
            localStorage.removeItem('search_query');
            localStorage.removeItem('sortBy');
        }
    }, [location.pathname, i18n.language]);

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <SubscribeModal />
            <NewHeader />

            {/* any components call this layout */}
            <Box sx={{ mt: 10 }}>{children}</Box>
            <Divider sx={{ p: '2px', bgcolor: theme.palette.text.secondary, mt: 8, mb: 1 }} />
            <Chatbot />
            <BackToTop />
            <Footer />
        </Box>
    );
}

export default UserLayouts;
