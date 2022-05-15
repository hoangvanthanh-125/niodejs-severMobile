const { ProductModel } = require("./../../models/Products");
const CategoryModel = require("./../../models/category");
const { PAGE_SIZE, renderListColorProducts } = require("./../../constants");
const cloudinary = require("./../cloudinary");
class ProductsController {
  //GET /
  showAllproduct = async (req, res) => {
    let { sort_by, page } = req.query;
    if (!page || !Number.isInteger(Number(page))) {
      page = 1;
    }
    const skip = PAGE_SIZE * (page - 1);
    const sort = {};
    if (
      ["price_asc", "price_desc", "createdAt_asc", "createdAt_desc"].includes(
        sort_by
      )
    ) {
      const sortArr = sort_by.split("_");
      sort[sortArr[0]] = sortArr[1];
    }
    const filter = req.filter;
    try {
      const products = await ProductModel.find(filter)
        .select({
          name: 1,
          price: 1,
          discount: 1,
          vote_average: 1,
          vote_count:1,
          images: 1,
          category_id: 1,
        })
        .sort(sort)
        .skip(skip)
        .limit(PAGE_SIZE);
      const total_products = await ProductModel.countDocuments(filter);
      res.status(200).json({
        page: Number(page),
        total_pages: Math.ceil(total_products / PAGE_SIZE),
        total_products,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  };

  //get :/product/category/:id
  showProductByCategory = async (req, res) => {
    const filter = req.filter;
    let { sort_by, page } = req.query;
    if (!page || !Number.isInteger(Number(page))) {
      page = 1;
    }
    const skip = PAGE_SIZE * (page - 1);
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
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);
        const total_products = await ProductModel.countDocuments({
          category_id: _id,
          ...filter,
        });
        res.status(200).json({
          page: Number(page),
          total_pages: Math.ceil(total_products / PAGE_SIZE),
          total_products,
          data: products,
        });
      }
    } catch (error) {
      console.log(error.message);
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

  //poss: /products/create
  createProduct = async (req, res) => {
    var images = [];
    const files = req?.files;
    if (!files) {
      return res.status(400).json({ message: "Upload file failed" });
    }

    try {
      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        images.push(result?.secure_url);
      }

      const data = req.body;
      const colors = renderListColorProducts()
      const newProduct = new ProductModel({ ...data, images,colors });
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error });
    }
  };

  // get : /product/trending
  getListTrending = async (req, res, next) => {
    const listTrending = [];
    try {
      const listCategory = await CategoryModel.find({});
      for (let category of listCategory) {
        const listProduct = await ProductModel.find({
          category_id:category._id.toString(),
        }).limit(5);
        const dataProductTrending = {};
        dataProductTrending.data = listProduct;
        dataProductTrending._id = category._id.toString();
        dataProductTrending.name = category.name;
        listTrending.push(dataProductTrending);
      }
      res.json(listTrending)
    } catch (error) {
      res.status(500).json("err server")
     }
  };
}

module.exports = new ProductsController();
