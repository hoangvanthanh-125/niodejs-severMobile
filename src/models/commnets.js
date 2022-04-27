const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Comments = new Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
    user_id: { type: Schema.Types.Mixed ,required:true,ref:'user'},

    product_id:{type: Schema.Types.Mixed,required:true},
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comments", Comments);
