const { API_VERSION } = require('../configs/routes.config');
const productRouter = require('./product.route');

function route(app) {
    app.use(`${API_VERSION}/products`, productRouter);
    app.use('/', () => {
        return 'Hello World!';
    });
}

module.exports = route;
