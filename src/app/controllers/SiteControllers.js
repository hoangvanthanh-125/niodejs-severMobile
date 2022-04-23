const Course = require("./../../models/Course");
const { ProductModel } = require("../../models/Products");
const { PAGE_SIZE } = require("./../../constants");
class SiteController {
  searchProductByName = async (req, res) => {
    const { name } = req.query;
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
    if (!name) {
      return res.status(400).json({ message: "Can not find a name query" });
    }
    try {
      const listProductSearch = await ProductModel.find({
        ...filter,
        name: { $regex: ".*" + name + ".*", $options: "i" },
      })
        .sort(sort)
        .skip(skip)
        .limit(PAGE_SIZE);
      const total_products = await ProductModel.countDocuments({
        name: { $regex: ".*" + name + ".*", $options: "i" },...filter
      });
      if (!listProductSearch) {
        return res.status(400).json({ message: "failed!!" });
      }
      res.status(200).json({
        page: Number(page),
        total_pages: Math.ceil(total_products / PAGE_SIZE),
        total_products,
        data: listProductSearch,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "server error !!" });
    }
  };
}
module.exports = new SiteController();
