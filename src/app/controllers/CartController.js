const CartModel = require("./../../models/cart");
class CartController {
  //GET /
  getListCartByUserId = async (req, res) => {
    try {
      const _id = req.userId;
      const listCart = await CartModel.find({
        userId: _id,
      });
      res.status(200).json(listCart);
    } catch (error) {
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
        return res.status(400).json({ message: "Add cart error !!!" });
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
      );
      if (!dataUpdate) {
        return res.status(400).json({ message: "Update error !!" });
      }
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
      const producDelete = await CartModel.deleteOne({ _id: id });
      if (!producDelete) {
        return res.status(400).json({ message: "delete error !!!" });
      }
      res.status(200).json(producDelete);
    } catch (error) {}
  };
}

module.exports = new CartController();
