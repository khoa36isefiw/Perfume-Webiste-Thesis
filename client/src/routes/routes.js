import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import Checkout from '../pages/Checkout';
import CreateAccount from '../pages/CreateAccount';
import HomePage from '../pages/HomePage';
import ProductDetail from '../pages/ProductDetail';
import Services from '../pages/Services';
import Shop from '../pages/Shop';
import ShoppingCart from '../pages/ShoppingCart';
import SignInPage from '../pages/SignInPage';

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
    { path: '/sign-in', component: SignInPage, layout: UserLayouts },
    { path: '/create-account', component: CreateAccount, layout: UserLayouts },
    { path: '/profile-settings', component: ProfileSettings, layout: UserLayouts },
    { path: '/blog', component: Blog, layout: UserLayouts },
    { path: '/blog-detail/:id', component: BlogDetail, layout: UserLayouts },
];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
