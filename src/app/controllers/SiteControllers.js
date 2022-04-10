const Course = require("./../../models/Course");
const { ProductModel } = require("../../models/Products");
class SiteController {
  searchProductByName = async (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Can not find a name query" });
    }
    try {
      const listProductSearch = await ProductModel.find({
        name: { $regex: ".*" + name + ".*", $options: "i" },
      });
      if (!listProductSearch) {
        return res.status(400).json({ message: "failed!!" });
      }
      res.status(200).json(listProductSearch);
    } catch (error) {
      res.status(500).json({ message: "server error !!" });
    }
  };
}
module.exports = new SiteController();
