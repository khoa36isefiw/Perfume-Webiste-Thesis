import './App.css'; // reset css at this file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { adminRoutes, privateRoutes, publicRoutes } from './routes/routes';
import UserLayouts from './layouts/UserLayout/UserLayouts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
    // default language for the website is English
    const { t, i18n } = useTranslation();
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.replace('/en');
        }
    }, []);

    const allDefinedRoutes = [
        ...publicRoutes.map((route) => route.path),
        ...privateRoutes.map((route) => route.path),
        ...adminRoutes.map((route) => route.path),
    ];

    const userData = JSON.parse(localStorage.getItem('user_data')) || {};

    return (
        <Box sx={{ bgcolor: '#000000' }}>
            <Router>
                <Routes>
                    {/* for guest --> not to login into system*/}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || UserLayouts;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* for authenticated  */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || UserLayouts;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    userData.user ? ( // for login
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to={`/${i18n.language}/sign-in`} />
                                    )
                                }
                            />
                        );
                    })}

                    {adminRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || UserLayouts;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    userData.role === 1 ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/404" />
                                    )
                                }
                            />
                        );
                    })}

                    <Route path="/404" element={<PageNotFound />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
