const express = require('express');
const router = express.Router();
const siteController = require('./../app/controllers/SiteControllers')
const filterProduct = require('./../app/middleware/filterProduct')

router.get('/search',siteController.searchProductByName);

module.exports = router;