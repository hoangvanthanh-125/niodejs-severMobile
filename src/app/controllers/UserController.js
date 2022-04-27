const UserModel = require("./../../models/user");
const cloudinary = require("./../cloudinary");

class UserController {
  //put /user/id;
  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const file = req?.file;
      // update avatar
      if (file) {
        const avatarImage = await cloudinary.v2.uploader.upload(file.path);
        const avatar = avatarImage.secure_url;
        const updateUser = await UserModel.findOneAndUpdate(
          { _id: id },
          { avatar },
          {
            new: true,
          }
        );
        return res.status(200).json(updateUser);
      }
      const data = req.body;
      if (data.email) {
        const user = await UserModel.findOne({ email: data.email });
        if (user) {
          return res.status(400).json({ message: "Email đã tồn tại" });
        }
      }
      const updateUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!updateUser) {
        return res.status(400).json({ message: "update failed" });
      }
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
  // get /user/:id
  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(400).json({ message: "bad request" });
      } else return res.status(200).json(user);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
}

module.exports = new UserController();
