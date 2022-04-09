const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {CartSchema} = require('./../models/cart')

const Orders = new Schema({
  product:{type:CartSchema,required:true},
  userId:{type:Schema.Types.Mixed,required:true},
  status:{
    type:String,
    enum : ['delivering','cancelled','received'],
    default:'delivering'
    }
},{
  timestamps:true
})
module.exports = mongoose.model("order",Orders);