const express = require("express");
const path = require("path");
const productsController = require("../app/controllers/ProductsController");
const router = express.Router();
const multer = require("multer");
const filterProduct = require("../app/middleware/filterProduct");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, path.join(__dirname, "../public/images"));
    } else {
      cb(new Error("file not a image"), false);
    }
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
router.get("/trending",productsController.getListTrending)
router.get("/:id", productsController.showProductById);
router.put("/:id", productsController.updateProduct);
router.get("/category/:id",filterProduct,productsController.showProductByCategory)
router.get("/",filterProduct, productsController.showAllproduct);

module.exports = router;
