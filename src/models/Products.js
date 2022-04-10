const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // 
    
    images: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    category_id: {
      type: ObjectId,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    vote_average: { type: Number,default:0 },
    vote_count: { type: Number,default:0},
  },
  {
    timestamps: true,
  }
);
module.exports = {
  ProductModel: mongoose.model("product", Product),
  ProductSchema: Product,
};
