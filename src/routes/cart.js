const CartController = require('./../app/controllers/CartController');
const checkLogin = require("./../app/middleware/checkLogin");

const express = require("express");
const { route } = require('express/lib/application');
const router = express.Router();
router.use(checkLogin);
router.get("/:userId",CartController.getListCartByUserId);
router.post("/create",CartController.createCart);
router.put("/update/:id",CartController.updateCart);
router.delete("/delete/:id",CartController.deleteCart);
module.exports = router;