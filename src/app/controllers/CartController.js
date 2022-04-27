const { CartModel } = require("./../../models/cart");
const { ProductModel } = require("./../../models/Products");
class CartController {
  //GET /
  getListCartByUserId = async (req, res) => {
    try {
      const _id = req.query.user_id;
      const listCart = await CartModel.find({
        user_id: _id,
      })
        .lean()
        .sort({ createdAt: "desc" })
        .populate("product_id");
      if (!listCart) {
        return res.status(400).json({
          error: "get error !!",
        });
      }
      const listCartProduct = listCart.map((item) => {
        item.product = item.product_id;
        delete item.product_id;
        return item;
      });

      res.status(200).json(listCartProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Server error !!!",
      });
    }
  };
  //post : /cart/create
  createCart = async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const newCart = new CartModel(data);
      const cartProduct = await newCart.save();
      if (!cartProduct) {
        return res.status(400).json({
          message: "Add cart error !!!",
        });
      }
      res.status(200).json(cartProduct);
    } catch (error) {
      res.status(500).json({
        message: "Server Error !!!",
      });
    }
  };
  // put :/cart/update/id;
  updateCart = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
      const dataUpdate = await CartModel.findOneAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        }
      )
        .lean()
        .populate({
          path: "product_id",
          select: { sizes: 0, colors: 0 },
        });
      if (!dataUpdate) {
        return res.status(400).json({
          message: "Update error !!",
        });
      }
      dataUpdate.product = dataUpdate.product_id;
      delete dataUpdate.product_id;

      res.status(200).json(dataUpdate);
    } catch (error) {
      res.status(500).json({
        message: "Server error !!!",
      });
    }
  };
  //delete :/cart/:id
  deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
      const producDelete = await CartModel.findOneAndDelete({
        _id: id,
      });
      if (!producDelete) {
        return res.status(400).json({
          message: "delete error !!!",
        });
      }
      res.status(200).json(producDelete);
    } catch (error) {}
  };
}

module.exports = new CartController();
