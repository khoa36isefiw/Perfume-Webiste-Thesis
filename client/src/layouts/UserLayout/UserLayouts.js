import { Box, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { theme } from '../../Theme/Theme';
import BackToTop from '../../components/ScrollTop/ScrollTop';
import NewHeader from '../../components/Header/NewHeader';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UserLayouts({ children }) {
    const location = useLocation();
    const { i18n } = useTranslation();
    useEffect(() => {
        localStorage.removeItem('filter');
        localStorage.removeItem('search_query');
        localStorage.removeItem('sortBy');
    }, [location.pathname !== `/${i18n.language}/shop`]);
    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: '#000' }}>
            {/* pre-defined layout */}
            <NewHeader />

            {/* any components call this layout */}
            <Box sx={{ mt: 10 }}>{children}</Box>
            <Divider sx={{ p: '2px', bgcolor: theme.palette.text.secondary, my: 10 }} />
            <BackToTop />
            <Footer />
        </Box>
    );
}

export default UserLayouts;
