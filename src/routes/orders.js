const express = require("express");
const checkLogin = require("../app/middleware/checkLogin");
const ordersController = require('./../app/controllers/OrdersController');
const router = express.Router();
router.use(checkLogin);
router.get("/:userId",ordersController.getOrderByIdUser);
router.put("/:id",ordersController.updateOrder);
router.post('/create',ordersController.createOrder);
module.exports = router;