const productRouter = require('./product.route');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const brandRouter = require('./brand.route');
const orderRouter = require('./order.route');
const paymentRouter = require('./payment.route');
const promotionRouter = require('./promotion.route');
const reviewRouter = require('./productReview.route');
const adminRouter = require('./admin.route');

function route(app) {
    app.use(`/products`, productRouter);
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/categories', categoryRouter);
    app.use('/brands', brandRouter);
    app.use('/orders', orderRouter);
    app.use('/payments', paymentRouter);
    app.use('/promotions', promotionRouter);
    app.use('/reviews', reviewRouter);
    app.use('/admin', adminRouter);

    app.use('/', (req, res) => {
        res.send('Hello World!');
    });
}

module.exports = route;
