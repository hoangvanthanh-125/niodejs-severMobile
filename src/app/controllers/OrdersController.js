const OrdersModel = require("./..//../models/orders");
const { CartModel } = require("./../../models/cart");
const orders = require("./..//../models/orders");
const { json } = require("express/lib/response");
const { query } = require("express");
class OrdersController {
  getOrderByIdUser = async (req, res) => {
    const { user_id } = req.query;
    console.log(req.query);
    if (!user_id) {
      return res.status(400);
    }
    const reqQuery = req.query;
    if (reqQuery.status) {
      query.status = reqQuery.status;
    }
    try {
      const listOrder = await OrdersModel.find({ user_id }).lean().select({
        status: 1,
        orderDate: 1,
        quantity_items: 1,
        total_price: 1,
      });
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
    console.log(status);
    if (
      !["Packing", "Shipping", "Arriving", "Susscess", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ message: "status is not valid !!!" });
    }
    try {
      const newOrder = await OrdersModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      })
        .lean()
        .populate({
          path: "order_products",
          populate: {
            path: "order_product_item",
            model: "product",
            select: { sizes: 0, colors: 0 },
          },
        })
        .populate("shipping_infomation");
      if (!newOrder) {
        return res.status(400).json({ message: "update failed" });
      }
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: "server error !!!" });
    }
  };

  //orders/:id
  getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    try {
      const orderDetail = await OrdersModel.findOne({ _id: id })
        .lean()
        .populate({
          path: "order_products",
          populate: {
            path: "order_product_item",
            model: "product",
            select: { sizes: 0, colors: 0 },
          },
        })
        .populate("shipping_infomation");
      if (!orderDetail) {
        return res.status(400).json("failed");
      }
      res.status(200).json(orderDetail);
    } catch (error) {
      res.status(500).json({ message: "server error !!!" });
    }
  };

  createOrder = async (req, res) => {
    // const data = {
    //   orders_id: ["6250685c11a18144ff6e68ea"],
    //   shipping_infomation: "62694834400c9f19026ae584",
    //   quantity_items: 3,
    //   total_price: 123,
    //   user_id: "123",
    // };
    const data = req.body;
    const reqQuery = req.query;
    if (reqQuery.status) {
      query.status = reqQuery.status;
    }
    try {
      const listCart = await CartModel.find({ _id: { $in: data.orders_id } })
        .lean()
        .select({ user_id: 0, createdAt: 0, updatedAt: 0, _id: 0 });
      if (!listCart) {
        return res.status(400).json("failed");
      }
      const order = { ...data };
      delete order.orders_id;
      order.order_products = listCart.map((item) => {
        item.order_product_item = item.product_id;
        delete item.product_id;
        return { ...item };
      });
      const newOrder = await new OrdersModel(order).save();
      const deleteCart = await CartModel.deleteMany({ _id: { $in: data.orders_id } });
      res.status(200).json(newOrder);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  };
  //delete /:id
  deleteOrderById = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteProduct = await OrdersModel.findOneAndDelete({ _id: id });
      if (!deleteProduct) {
        return res.status(400).json("failed");
      }
      res.status(200).json(deleteProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "server error !!!" });
    }
  };
}

module.exports = new OrdersController();
