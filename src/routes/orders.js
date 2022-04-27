const express = require("express");
const checkLogin = require("../app/middleware/checkLogin");
const ordersController = require('./../app/controllers/OrdersController');
const router = express.Router();
router.use(checkLogin);
router.get("/",ordersController.getOrderByIdUser);
router.get('/:id',ordersController.getOrderDetailById)
router.put("/:id",ordersController.updateOrder);
router.delete("/:id",ordersController.deleteOrderById);

router.post('/create',ordersController.createOrder);
module.exports = router;