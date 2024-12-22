import './App.css'; // reset css at this file
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { adminRoutes, privateRoutes, publicRoutes } from './routes/routes';
import UserLayouts from './layouts/UserLayout/UserLayouts';
import { useEffect } from 'react';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { useAuth } from './contexts/authContext';
import useLoadingV2 from './hooks/useLoadingV2';

function App() {
    const { role, loggedIn, loading } = useAuth();
    const { LoadingAPI } = useLoadingV2();
    console.log('role: ', role, loggedIn);
    // default language for the website is English
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.replace('/en');
        }
    }, []);

    if (loading) {
        return <LoadingAPI />;
    }

    return (
        <Box sx={{ bgcolor: '#000000' }}>
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
                                loggedIn ? (
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

                {adminRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout || UserLayouts;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                loggedIn && role === 1 ? (
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
        </Box>
    );
}

export default App;
