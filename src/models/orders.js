const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const {CartSchema} = require('./../models/cart')

const Orders = new Schema({
  product:{type:CartSchema,required:true},
  userId:{type:Schema.Types.Mixed,required:true},
  userName:{type:String,required:true},
  address:{type:String,required:true},
  phoneNumber:{type:String,required:true},
  orderDate:{type:Date,default:+new Date()},
  shippedDate:{type:Date,default:+new Date() + 3*24*60*60*1000},
  status:{
    type:String,
    enum : ['delivering','cancelled','received'],
    default:'delivering'
    }
},{
  timestamps:true
})
module.exports = mongoose.model("order",Orders);