const express = require('express');
const router = express.Router();
const siteController = require('./../app/controllers/SiteControllers')

router.get('/search',siteController.searchProductByName);

module.exports = router;