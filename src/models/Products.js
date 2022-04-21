const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var listSize = [];
for (let i = 30; i <= 46; i++) {
  listSize.push(i);
}

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    category_id: {
      type: Schema.Types.Mixed,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    vote_average: { type: Number, default: 0 },
    vote_count: { type: Number, default: 0 },
    sizes: { type: [Number], default: listSize },
    colors: { type: [String] },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  ProductModel: mongoose.model("product", Product),
  ProductSchema: Product,
};
