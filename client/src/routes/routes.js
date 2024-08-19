import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import HomePage from '../pages/HomePage';

// not sign into this website
const publicRoutes = [
    { path: '/', component: HomePage, layout: UserLayouts },
    { path: '/about-us', component: AboutUs, layout: UserLayouts },
];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
