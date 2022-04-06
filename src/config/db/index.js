const mongoose = require('mongoose');

async function connect (){
  try {
    await mongoose.connect('mongodb://localhost:27017/education');
    console.log('connect succsessfully!!');
    
  } catch (error) {
    console.log('connect failure')
  }


}
module.exports = {connect}