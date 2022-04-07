const mongoose = require('mongoose');
const URI = "mongodb+srv://thanh125:yeulol21@mobile.uuom0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
async function connect (){
  try {
    await mongoose.connect(URI);
    console.log('connect succsessfully!!');
    
  } catch (error) {
    console.log('connect failure')
  }


}
module.exports = {connect}