const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  gender:{type:String,required:true},
  phoneNumber:{
    type:String,
    required:true
  }
}, {
  timestamps: true
})
module.exports = mongoose.model('user', User);