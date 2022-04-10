const CategoryModel = require("./../../models/category");
const { ProductModel } = require("./../../models/Products");
const ProductsController = require("./ProductsController");
class CategoryControler {
  //GET /category
  getCategory = async (req, res) => {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };
  //Get by id : /category/:id
  showProductByCategory = async (req, res) => {
    const filter = req.filter;
    const { sort_by } = req.query;
    const sort = {};
    if (
      ["price_asc", "price_desc", "createdAt_asc", "createdAt_desc"].includes(
        sort_by
      )
    ) {
      const sortArr = sort_by.split("_");
      sort[sortArr[0]] = sortArr[1];
    }
    try {
      const _id = req.params.id;
      if (_id) {
        const products = await ProductModel.find({
          category_id: _id,
          ...filter,
        })
          .select({
            name: 1,
            price: 1,
            discount: 1,
            vote_average: 1,
            images: 1,
          })
          .sort(sort);

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
module.exports = new CategoryControler();
