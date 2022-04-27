const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { ProductSchema } = require("./../models/Products");

const Cart = new Schema(
  {
 
    product_id: { type: Schema.Types.Mixed ,ref:'product'},
    quantity: { type: Number, default: 1 },
    size: { type: Number, required: true },
    color:{type:String,required:true},
    user_id: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = { CartModel: mongoose.model("cart", Cart), CartSchema: Cart };
