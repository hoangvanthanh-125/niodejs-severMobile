const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { ProductSchema } = require("./../models/Products");

const Cart = new Schema(
  {
    product: { type: ProductSchema },
    quantity: { type: Number, default: 1 },
    size: { type: Number, required: true },
    userId: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = { CartModel: mongoose.model("cart", Cart), CartSchema: Cart };
