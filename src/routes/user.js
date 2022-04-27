const express = require("express");
const upload = require('./../app/middleware/uploadImage')
const UserController = require("../app/controllers/UserController");
const checkLogin = require("../app/middleware/checkLogin");
const router = express.Router();
// router.use(checkLogin);
router.put("/:id",upload.single('avatar'),UserController.updateUser);
router.get("/:id",UserController.getUserById)
module.exports = router;
