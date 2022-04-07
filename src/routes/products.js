const express = require('express');
const productsController = require('../app/controllers/ProductsController');
const router = express.Router();
 
router.get("/:id",productsController.showProductById);
router.put("/:id",productsController.updateProduct);
router.get("/",productsController.showAllproduct);

module.exports = router;