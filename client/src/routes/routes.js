import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import HomePage from '../pages/HomePage';
import Services from '../pages/Services';

// not sign into this website
const publicRoutes = [
    { path: '/', component: HomePage, layout: UserLayouts },
    { path: '/about-us', component: AboutUs, layout: UserLayouts },
    { path: '/our-services', component: Services, layout: UserLayouts },
];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
