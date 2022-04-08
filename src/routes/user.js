const express = require("express");
const UserController = require("../app/controllers/UserController");
const checkLogin = require("../app/middleware/checkLogin");
const router = express.Router();
router.use(checkLogin);
router.put("/:id",UserController.updateUser)
module.exports = router;
