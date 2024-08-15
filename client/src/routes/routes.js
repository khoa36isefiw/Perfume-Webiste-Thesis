// not sign into this website
const publicRoutes = [{ path: '/', component: '', layout: '' }];

// must signed into
const privateRoutes = [{ path: '/signed-in', component: '', layout: '' }];

export { publicRoutes, privateRoutes };
