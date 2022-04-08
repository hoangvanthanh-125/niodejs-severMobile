const CategoryModel = require("./../../models/category");
const ProductModel = require("./../../models/Products");
const ProductsController = require("./ProductsController");
class CategoryModel {
  //GET /category
  getCategory = async (req, res) => {
    try {
      const categorys = await CategoryModel.find();
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //Get by id : /category/:id
  showProductByCategory = async (req, res) => {
    try {
      const _id = req.params.id;
      if (_id) {
        const products = ProductsController.find({ _id });
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //put : /products/:id
}
module.exports = new CategoryModel();
