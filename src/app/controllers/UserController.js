const UserModel = require("./../../models/user");
class UserController {
  //put /user/id;
  updateUser = async(req,res) => {
    try {
      const data = req.body;
      const {id }= req.params;
      const updateUser = await UserModel.findOneAndUpdate({_id:id},data,{new:true});
      if(!updateUser){
        return res.status(400).json({message:"update failed"})
      }
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json("Server error !!!")
    }
  }
}
module.exports = new UserController;