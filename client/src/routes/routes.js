import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import HomePage from '../pages/HomePage';
import ProductDetail from '../pages/ProductDetail';
import Services from '../pages/Services';
import Shop from '../pages/Shop';

// not sign into this website
const publicRoutes = [
    { path: '/', component: HomePage, layout: UserLayouts },
    { path: '/about-us', component: AboutUs, layout: UserLayouts },
    { path: '/our-services', component: Services, layout: UserLayouts },
    { path: '/shop', component: Shop, layout: UserLayouts },
    // navigate to product has name...
    { path: `/product/:perfumeName`, component: ProductDetail, layout: UserLayouts },
];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
