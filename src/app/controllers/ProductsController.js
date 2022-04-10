const { ProductModel } = require("./../../models/Products");
class ProductsController {
  //GET /
  showAllproduct = async (req, res) => {
    const { min, max } = req.query;
    if ((min && !max) || (!min && max)) {
      return res.status(400).json({ message: "Thiếu min or max" });
    }
    const query = {};
    if (min && max) {
      if (typeof Number(min) !== "number" || typeof Number(max) !== "number") {
        return res.status(400).json({ message: "min and max phai la 1 so" });
      }
      query.price = { $gt: min, $lt: max };
    }
    try {
      const products = await ProductModel.find(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //Get by id : /products/:id
  showProductById = async (req, res) => {
    try {
      const _id = req.params.id;
      const product = await ProductModel.findById(_id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  //get product by category
  //product/category/:id

  //put : /products/:id
  updateProduct(req, res) {}

  createProduct = async (req, res) => {
    let listImages = req.files.map((file) => {
      const index = file.path.indexOf("public");
      return file.path.slice(index + 6);
    });
    if (!req.files) {
      return res.status(400).json({ message: "Upload file failed" });
    }
    try {
      const data = req.body;
      const newProduct = new ProductModel({ ...data, images: listImages });
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = new ProductsController();
