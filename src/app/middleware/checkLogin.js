var jwt = require("jsonwebtoken");
const UserModel = require("./../../models/user");

const checkLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const tokenDecode = jwt.verify(token, "thanh125");
    const { _id } = tokenDecode;
    const user = await UserModel.findOne({ _id });
    if (user) {
      req.userId = _id;
      next();
    } else {
      res.status(400).json({ message: "Not permission" });
    }
  } catch (error) {
    res.status(500).json({ message: "Token khong hop le" });
  }
};
module.exports = checkLogin;
