const OrdersModel = require("./..//../models/orders");
class OrdersController {
  getOrderByIdUser = async (req, res) => {
    const query = {};
    const {userId} = req.params;
    const reqQuery = req.query;
    if (reqQuery.status) {
      query.status = reqQuery.status;
    }
    try {
      const listOrder = await OrdersModel.find({...query,userId});
      if (!listOrder) {
        return res.status(400).json({ message: "failed!!!" });
      }
      res.status(200).json(listOrder);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "server error !!!" });
    }
  };

  updateOrder = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const { status } = data;
    if (!["delivering", "cancelled", "received"].includes(status)) {
      return res.status(400).json({ message: "status is not valid !!!" });
    }
    try {
      const newOrder = await OrdersModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!newOrder) {
        return res.status(400).json({ message: "update failed" });
      }
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: "server error !!!" });
    }
  };

  createOrder = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const newOrder = new OrdersModel(data);
      const order = await newOrder.save();
      if (!order) {
        return res.status(400).json({ message: "failed" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "server error !!" });
    }
  };
}
module.exports = new OrdersController();
