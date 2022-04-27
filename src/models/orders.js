const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { CartSchema } = require("./../models/cart");
const Orders = new Schema(
  {
    user_id: { type: Schema.Types.Mixed, required: true },
    order_products: {
      type: [
        {
          order_product_item: { type: Schema.Types.Mixed, },
          quantity: { type: Number, default: 1 },
          size: { type: Number, required: true },
          color: { type: String, required: true },
        },
      ],
    },
    shipping_infomation: {
      type: Schema.Types.Mixed,
      required: true,
      ref: "Shipping_Infomation",
    },
    orderDate: { type: Date, default: +new Date() },
    shippedDate: { type: Date, default: +new Date() + 3 * 24 * 60 * 60 * 1000 },
    status: {
      type: String,
      enum: ["Packing", "Shipping", "Arriving", "Susscess", "cancelled"],
      default: "Packing",
    },
    quantity_items: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", Orders);
