const CartController = require('./../app/controllers/CartController');
const checkLogin = require("./../app/middleware/checkLogin");

const express = require("express");
const { route } = require('express/lib/application');
const router = express.Router();
router.use(checkLogin);
router.get("/:userId",CartController.getListCartByUserId);
router.post("/",CartController.createCart);
router.put("/:id",CartController.updateCart);
router.delete("/:id",CartController.deleteCart);
module.exports = router;