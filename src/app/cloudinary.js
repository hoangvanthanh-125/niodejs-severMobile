const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.v2.config({
  cloud_name:"thhh" ,
  api_key: "498767983828625",
  api_secret: "Y1u5LyO5OfFefZAZpRKokFxRmSo"
});
const storage = new CloudinaryStorage({
  cloudinary,
  // allowedFormats: ['jpg', 'png','jpeg'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
const uploadCloud = multer({ storage });
module.exports = cloudinary;

