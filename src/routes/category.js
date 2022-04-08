const express = require('express');
const categoryController = require('../app/controllers/CategoryControler');
const category = require('../models/category');
const router = express.Router();
 
router.get("/:id",categoryController.showProductByCategory);
router.get("/",categoryController.getCategory);

module.exports = router;