import { Box, Divider } from '@mui/material';
import React from 'react';

import Footer from '../../components/Footer/Footer';
import { theme } from '../../Theme/Theme';
import BackToTop from '../../components/ScrollTop/ScrollTop';
import NewHeader from '../../components/Header/NewHeader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLayouts({ children }) {
    const navigate = useNavigate();
    const userData = JSON.parse(window.localStorage.getItem('user_data')) || null;

    useEffect(() => {
        if (userData === null) {
            navigate('/');
        }
    }, [userData, navigate]);
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
