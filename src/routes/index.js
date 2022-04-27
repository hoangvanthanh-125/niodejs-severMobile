const siteRouter = require('./site');
const productsRouter = require('./products');
const categoryRouter = require('./category');
const authRouter = require('./auth');
const cartRouter = require('./cart')
const userrouter = require("./user")
const ordersRouter  = require('./orders');
const commentsRouter = require('./comments');
const shippingRouter = require('./shippingInfomation');
function route(app) {
  app.use('/products',productsRouter);
  app.use('/category',categoryRouter);
  app.use('/auth',authRouter);
  app.use('/cart',cartRouter);
  app.use('/user',userrouter)
  app.use('/comments',commentsRouter);
  app.use('/orders',ordersRouter)
  app.use('/shipping-infomation',shippingRouter)
  app.use('/',siteRouter)



}
module.exports = route;