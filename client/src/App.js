import './App.css'; // reset css at this file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { privateRoutes, publicRoutes } from './routes/routes';
import UserLayouts from './layouts/UserLayout/UserLayouts';

function App() {
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
                                    <Navigate to="/signin" />
                                    // user.user ? ( // for login
                                    //     <Layout>
                                    //         <Page />
                                    //     </Layout>
                                    // ) : (
                                    //     <Navigate to="/signin" />
                                    // )
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
