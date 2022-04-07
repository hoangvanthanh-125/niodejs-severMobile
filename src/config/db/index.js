const mongoose = require('mongoose');
const URI = "mongodb+srv://thanh125:yeulol21@mobile.uuom0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//  await mongoose.connect('mongodb://localhost:27017/education');
async function connect (){
  try {
    await mongoose.connect(URI);
    console.log('connect succsessfully!!');
    
  } catch (error) {
    console.log('connect loi cmnr')
  }


}
module.exports = {connect}