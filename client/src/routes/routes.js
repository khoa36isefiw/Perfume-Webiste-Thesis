import AddUsers from '../components/AddUsers/AddUsers';
import Dashboard from '../components/Dashboard/Dashboard';
import SearchTerm from '../components/Header/SearchTerm';
import ChangePassword from '../components/ProfileSettings/ChangePassword';

import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import ProfileSettingsLayout from '../layouts/ProfileSettingsLayout';
import UserLayouts from '../layouts/UserLayout/UserLayouts';
import AboutUs from '../pages/AboutUs';
import AccountInfoPage from '../pages/AccountInfoPage';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import Checkout from '../pages/Checkout';
import CreateAccount from '../pages/CreateAccount';
import HomePage from '../pages/HomePage';
import ListUsers from '../pages/ListUsers';
import EditUser from '../pages/EditUser';
import ProductDetail from '../pages/ProductDetail';
import PurchasePage from '../pages/PurchasePage';
import Services from '../pages/Services';
import Shop from '../pages/Shop';
import ShoppingCart from '../pages/ShoppingCart';
import SignInPage from '../pages/SignInPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminEditProduct from '../components/AdminProducts/AdminEditProduct';
import AdminAddProduct from '../components/AdminProducts/AdminAddProduct';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import AdminViewOrderDetails from '../components/AdminOrders/AdminViewOrderDetails';
import AdminCoupon from '../pages/AdminCoupon';
import AdminCreateCoupon from '../components/AdminCoupons/AdminCreateCoupon';
import AdminEditCoupon from '../components/AdminCoupons/AdminEditCoupon';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import AddCategory from '../components/AdminCategories/AddCategory';
import AdminEditCategory from '../components/AdminCategories/AdminEditCategory';
import PaymentSuccess from '../components/PaymentSuccess/PaymentSuccess';

import PaymentFailed from '../components/PaymentSuccess/PaymentFailed';
import { OrderInvoicePDF } from '../components/PDFTemplate/OrderInvoicePDF';

// not sign into this website
const publicRoutes = [
    { path: '/', component: HomePage, layout: UserLayouts },
    { path: '/about-us', component: AboutUs, layout: UserLayouts },
    { path: '/our-services', component: Services, layout: UserLayouts },
    { path: '/shop', component: Shop, layout: UserLayouts },
    { path: '/search', component: SearchTerm, layout: UserLayouts },
    // navigate to product has id...
    { path: `/product/:id`, component: ProductDetail, layout: UserLayouts },
    { path: '/shopping-cart', component: ShoppingCart, layout: UserLayouts },
    { path: '/checkout', component: Checkout, layout: UserLayouts },
    { path: '/sign-in', component: SignInPage, layout: UserLayouts },
    { path: '/create-account', component: CreateAccount, layout: UserLayouts },

    { path: '/blog', component: Blog, layout: UserLayouts },
    { path: '/blog-detail/:id', component: BlogDetail, layout: UserLayouts },
    { path: '/recover-password', component: RecoverPassword, layout: UserLayouts },
    // profile  settings
    { path: '/profile-settings', component: AccountInfoPage, layout: ProfileSettingsLayout },
    { path: '/change-password', component: ChangePassword, layout: ProfileSettingsLayout },
    { path: '/my-purchase', component: PurchasePage, layout: ProfileSettingsLayout },
    { path: '/success', component: PaymentSuccess, layout: UserLayouts },
    { path: '/cancel', component: PaymentFailed, layout: UserLayouts },
    { path: '/order-invoice', component: OrderInvoicePDF, layout: UserLayouts },
];

// must signed into
// admin layout
const privateRoutes = [
    { path: '/admin/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/admin/manage-users', component: ListUsers, layout: AdminLayout },
    { path: '/admin/manage-users/:id', component: EditUser, layout: AdminLayout },
    { path: '/admin/manage-users/add-user', component: AddUsers, layout: AdminLayout },
    { path: '/admin/manage-users', component: ListUsers, layout: AdminLayout },
    { path: '/admin/manage-products', component: AdminProductsPage, layout: AdminLayout },
    // /admin/manage-products/edit?productId=${productId}&size=${size}
    // { path: '/admin/manage-products/:id', component: AdminEditProduct, layout: AdminLayout },
    {
        path: '/admin/manage-products/edit',
        component: AdminEditProduct,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-products/add-product',
        component: AdminAddProduct,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-orders',
        component: AdminOrdersPage,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-orders/view-order/:id',
        component: AdminViewOrderDetails,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-coupons',
        component: AdminCoupon,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-coupons/create-new-coupon',
        component: AdminCreateCoupon,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-coupons/edit-coupon/:id',
        component: AdminEditCoupon,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-categories',
        component: AdminCategoriesPage,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-categories/add',
        component: AddCategory,
        layout: AdminLayout,
    },
    {
        path: '/admin/manage-categories/edit/:id',
        component: AdminEditCategory,
        layout: AdminLayout,
    },
];

export { publicRoutes, privateRoutes };
