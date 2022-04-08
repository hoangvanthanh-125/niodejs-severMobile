const CartController = require('./../app/controllers/CartController');

const express = require("express");
const router = express.Router();
router.get("/:userId",CartController.getListCartByUserId);
router.put("/:id",CartController.updateCart);
router.delete("/:id",CartController.deleteCart);
module.exports = router;