const express = require('express');
const categoryController = require('../app/controllers/CategoryControler');
const  filterProduct = require( '../app/middleware/filterProduct');
const router = express.Router();
 
router.get("/:id",filterProduct,categoryController.showProductByCategory);
router.get("/",categoryController.getCategory);

module.exports = router;