const newsRouter = require('./news')
const siteRouter = require('./site');
const productsRouter = require('./products')
function route(app) {
  app.use('/news',newsRouter);
  app.use('/products',productsRouter);
  app.use('/',siteRouter)

}
module.exports = route;