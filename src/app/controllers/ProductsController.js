const {ProductModel} = require("./../../models/Products");
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
  showProductById = async  (req, res) =>  {
    try {
      const _id = req.params.id;
      const product = await ProductModel.findById(_id);
      res.status(200).json(product);
      
    } catch (error) {
      res.status(500).json({error})
    }

  }
  //get product by category 
  //product/category/:id
   
  //put : /products/:id
  updateProduct(req, res) {}

  createProduct = async(req, res) => {
    try {
      const data = req.body;
      const newProduct = new ProductModel(data);
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}


module.exports = new ProductsController();
