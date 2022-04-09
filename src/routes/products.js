const express = require("express");
const path = require("path");
const productsController = require("../app/controllers/ProductsController");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const list = file.mimetype.split("/");
    const end = "." + list[list.length - 1];
    const uniqueSuffix = Date.now() + "-" + end;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.array("test", 12),
  productsController.createProduct
);
router.get("/:id", productsController.showProductById);
router.put("/:id", productsController.updateProduct);
router.get("/", productsController.showAllproduct);

module.exports = router;
