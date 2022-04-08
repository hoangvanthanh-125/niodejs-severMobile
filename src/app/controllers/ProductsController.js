const ProductModel = require("./../../models/Products");
class ProductsController {
  //GET /
  showAllproduct = async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //Get by id : /products/:id
  showProductById(req, res) {}
  //put : /products/:id
  updateProduct(req, res) {}
  createProduct = (req, res) => {
    try {
      const data = req.body;
      const product = new ProductModel(data);
      const respons = product.save();
      res.status(200).json(respons);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}


module.exports = new ProductsController();
