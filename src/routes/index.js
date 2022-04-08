const newsRouter = require('./news')
const siteRouter = require('./site');
const productsRouter = require('./products');
const categoryRouter = require('./category');

function route(app) {
  app.use('/news',newsRouter);
  app.use('/products',productsRouter);
  app.use('/category',categoryRouter)
  app.use('/',siteRouter)


}
module.exports = route;