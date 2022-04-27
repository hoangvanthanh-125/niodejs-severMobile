const path =  require('path')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, path.join(__dirname, "../../public/images"));
    } else {
      cb(new Error("file not a image"), false);
    }
  },
  filename: function (req, file, cb) {
    const list = file.mimetype.split("/");
    const end = "." + list[list.length - 1];
    const uniqueSuffix = Date.now() + "-" + end;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

module.exports  = multer({ storage });
