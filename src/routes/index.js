const newsRouter = require('./news')
const siteRouter = require('./site');
const productsRouter = require('./products');
const categoryRouter = require('./category');
const authRouter = require('./auth');
const cartRouter = require('./cart')

function route(app) {
  app.use('/news',newsRouter);
  app.use('/products',productsRouter);
  app.use('/category',categoryRouter);
  app.use('/auth',authRouter);
  app.use('cart',cartRouter);
  app.use('/',siteRouter)


}
module.exports = route;