const CommentsModel = require("../../models/commnets");
const updateRating = require("../middleware/updateRating");
const { ProductModel } = require("./../../models/Products");
class CommentController {
  //post /comments/:idProduct
  getCommentsByIdProduct = async (req, res) => {
    const { idProduct } = req.params;
    console.log(idProduct);
    try {
      const listComment = await CommentsModel.find({ idProduct });
      if (!listComment) {
        return res.status(400).json({ message: "failed" });
      }
      res.status(200).json(listComment);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
  postComment = async (req, res) => {
    const data = req.body;
    const { rating, idProduct } = data;
    try {
      const newComment = new CommentsModel(data);
      const comment = await newComment.save();
      if (!comment) {
        return res.status(400).json({ message: "Post comment failed" });
      }
      updateRating(rating, res, idProduct);
      res.status(200).json(comment);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server error !!!");
    }
  };
  updateComment = async (req, res) => {
    let data = req.body;
    const { rating } = data;
    let { id } = req.params;
    try {
      const commentUpdate = await CommentsModel.findOneAndUpdate(
        { _id: id },
        data,
        {
          new: true,
        }
      );
      if (!commentUpdate) {
        return res.status(400).json({ message: "update failed" });
      }
      updateRating(rating, res, commentUpdate.idProduct);
      res.status(200).json(commentUpdate);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
  //DELETE : /comments/:id
  deteteComment = async (req, res) => {
    let { id } = req.params;
    try {
      const comment = await CommentsModel.findById(id);
      if (!comment) {
        return res.status(400).json({ message: "failed" });
      }
      const { idProduct, rating } = comment;
      const commentDelete = await CommentsModel.deleteOne({ _id: id });
      if (!commentDelete) {
        return res.status(400).json({ message: "delete failed" });
      }
      updateRating(rating, res, idProduct);
      res.status(200).json(commentDelete);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
}
module.exports = new CommentController();
