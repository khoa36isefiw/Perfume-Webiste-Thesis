import PerfumeDetail from '../components/PerfumeDetail/PerfumeDetail';
import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import Checkout from '../pages/Checkout';
import HomePage from '../pages/HomePage';
import ProductDetail from '../pages/ProductDetail';
import Services from '../pages/Services';
import Shop from '../pages/Shop';
import ShoppingCart from '../pages/ShoppingCart';

// not sign into this website
const publicRoutes = [
    { path: '/', component: HomePage, layout: UserLayouts },
    { path: '/about-us', component: AboutUs, layout: UserLayouts },
    { path: '/our-services', component: Services, layout: UserLayouts },
    { path: '/shop', component: Shop, layout: UserLayouts },
    // navigate to product has id...
    { path: `/product/:id`, component: ProductDetail, layout: UserLayouts },
    { path: '/shopping-cart', component: ShoppingCart, layout: UserLayouts },
    { path: '/checkout', component: Checkout, layout: UserLayouts },
];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
