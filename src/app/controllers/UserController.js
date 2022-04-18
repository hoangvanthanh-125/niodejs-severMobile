const UserModel = require("./../../models/user");
class UserController {
  //put /user/id;
  updateUser = async (req, res) => {
    try {
      const data = req.body;
      if (data.email) {
        const user = await UserModel.findOne({ email: data.email });
        if (user) {
          return res.status(400).json({ message: "Email đã tồn tại" });
        }
      }
      const { id } = req.params;
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
  getUserById = async(req,res) => {
     const {id} = req.params;
     try {
       const user = await UserModel.findById(id);
       if(!user){
         return res.status(400).json({message:"bad request"});
       }
       else return res.status(200).json(user);
     } catch (error) {
      res.status(500).json("Server error !!!");
     }
  }
}
 
module.exports = new UserController();
