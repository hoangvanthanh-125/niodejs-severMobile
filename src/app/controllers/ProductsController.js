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
}
module.exports = new ProductsController();
