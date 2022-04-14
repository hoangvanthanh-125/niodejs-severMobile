const { PAGE_SIZE } = require("../../constants");
const CommentsModel = require("../../models/commnets");
const updateRating = require("../middleware/updateRating");
class CommentController {
  //post /comments/:idProduct
  getCommentsByIdProduct = async (req, res) => {
    let { sort_by, page } = req.query;
    if (!page || !Number.isInteger(Number(page))) {
      page = 1;
    }
    const skip = PAGE_SIZE * (page - 1);
    const sort = {};
    if (["createdAt_asc", "createdAt_desc"].includes(sort_by)) {
      const sortArr = sort_by.split("_");
      sort[sortArr[0]] = sortArr[1];
    }
    const { idProduct } = req.params;
    try {
      const listComment = await CommentsModel.find({ idProduct })
        .sort(sort)
        .skip(skip)
        .limit(PAGE_SIZE);
      if (!listComment) {
        return res.status(400).json({ message: "failed" });
      }
      const total_comments = await CommentsModel.countDocuments({ idProduct });
      res.status(200).json({
        page: Number(page),
        total_page: Math.ceil(total_comments / PAGE_SIZE),
        total_comments,
        data: listComment,
      });
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };

  // posst :/comments
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
