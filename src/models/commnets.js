const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Comments = new Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
    user: {
      id: { type: ObjectId },
      name: { type: String, required: true },
    },
    idProduct: Schema.Types.Mixed,
    rating: { type: Number, defaultL: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comments", Comments);
