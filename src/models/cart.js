const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {ProductSchema} from './../models/Products'
const Cart = new Schema({
  product:{type:ProductSchema},
  quantity:{type:Number,default:1},
  size:{type:Number,required:true}
},{
  timestamps:true
})