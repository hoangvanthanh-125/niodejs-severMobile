const UserModel = require("./../../models/user");
const jwt = require("jsonwebtoken");
const ShippingInfomationModel = require("./../../models/shippingInfomation");

class AuthController {
  //register /auth/register
  register = async (req, res) => {
    try {
      const data = req.body;
      const { email, gender, password, ...shippingInfo } = data;
      console.log(shippingInfo);
      const userData = await UserModel.findOne({ email });
      if (userData) {
        return res
          .status(409)
          .json({ error: { message: "Account already axists" } });
      }
      const newUser = new UserModel(data);
      const user = await newUser.save();
      if (!user) {
        return res.status(400).json("failed");
      }
      const newShipping = await new ShippingInfomationModel({
        ...shippingInfo,
        default: true,
        user_id: user._id.toString(),
      }).save();
      if (!newShipping) {
        return res.status(400).json("failed");
      }

      res.status(200).json({
        user,
        message: "Register succsessfully <3",
      });
    } catch (error) {
      console.log(error.message);
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
