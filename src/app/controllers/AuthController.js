const { use } = require("express/lib/router");
const UserModel = require("./../../models/user");
const jwt = require("jsonwebtoken");

class AuthController {
  //register /auth/register
  register = async (req, res) => {
    try {
      const data = req.body;
      console.log(data)
      const { email } = data;
      const userData = await UserModel.findOne({ email });
      if (userData) {
        return res
          .status(409)
          .json({ error: { message: "Account already axists" } });
      }
      const newUser = new UserModel(data);
      const user = await newUser.save();
      res.status(200).json({
        user,
        message: "Register succsessfully <3",
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "server error !!!" });
    }
  };

  //post :auth/login
  login = async (req, res) => {
    let data = req.body;
    let { email, password } = data;
    try {
      const user = await UserModel.findOne({ email, password });
      if (!user) {
        res.status(400).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
      } else {
        const { _id } = user;
        const token = jwt.sign({ _id }, "thanh125");
        res.status(200).json({
          user,
          token,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Loi server !!!" });
    }
  };
}
module.exports = new AuthController();
