const express = require('express');
const router = express.Router();
const shippingController = require('./../app/controllers/Shippinginfomation');
router.get('/',shippingController.getListShippingByUserId);
router.put('/:id',shippingController.updateShippingById)
router.delete('/:id',shippingController.deteteShippingById)
router.post('/',shippingController.postShippingInfo)




module.exports = router;