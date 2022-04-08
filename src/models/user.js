const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('user', User);