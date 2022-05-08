const ShippingInfomationModel = require("./../../models/shippingInfomation");
var mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();
class ShippingInfomation {
  getListShippingByUserId = async (req, res) => {
    const { user_id } = req.query;
    const query = {};
    if (user_id) {
      query.user_id = user_id;
    }
    try {
      const listShipping = await ShippingInfomationModel.find({ user_id });
      if (!listShipping) {
        return res.status(400).json("failed");
      }
      res.status(200).json(listShipping);
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };
  updateShippingById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updateShipping = await ShippingInfomationModel.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
      );
      if (!updateShipping) {
        return res.status(400).json("failed");
      }
      res.status(200).json(updateShipping);
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };
  deteteShippingById = async (req, res) => {
    const { id } = req.params;

    try {
      const deleteShipping = await ShippingInfomationModel.deleteOne({
        _id: id,
      });
      if (!deleteShipping) {
        return res.status(400).json("failed");
      }
      res.json(deleteShipping);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  };
  postShippingInfo = async (req, res) => {
    const data = req.body;
    try {
      const newShipping = await new ShippingInfomationModel(data).save();
      if (!newShipping) {
        return res.status(400).json("failed");
      }
      res.status(200).json(newShipping);
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };
}

module.exports = new ShippingInfomation();
