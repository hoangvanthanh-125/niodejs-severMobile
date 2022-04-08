const mongoose = require('mongoose');
const URI = "mongodb://thanh125:yeulol21@mobile-shard-00-00.uuom0.mongodb.net:27017,mobile-shard-00-01.uuom0.mongodb.net:27017,mobile-shard-00-02.uuom0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-w6jv4v-shard-0&authSource=admin&retryWrites=true&w=majority"
//  await mongoose.connect('mongodb://localhost:27017/education');
async function connect (){
  try {
    await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connect succsessfully!!');
    
  } catch (error) {
    console.log('connect loi cmnr')
  }


}
module.exports = {connect}