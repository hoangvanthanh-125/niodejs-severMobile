const { PAGE_SIZE } = require("../../constants");
const CommentsModel = require("../../models/commnets");
const updateRating = require("../middleware/updateRating");
class CommentController {
  //post /comments/:product_id
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
    const { product_id } = req.query;
    try {
      const listComment = await CommentsModel.find({ product_id })
        .lean()
        .populate("user_id")
        .sort(sort)
        .skip(skip)
        .limit(PAGE_SIZE);
      if (!listComment) {
        return res.status(400).json({ message: "failed" });
      }
      const comments = listComment.map((item) => {
        item.user = item.user_id;
        delete item.user_id;
        return item;
      });
      const total_comments = await CommentsModel.countDocuments({ product_id });
      res.status(200).json({
        page: Number(page),
        total_page: Math.ceil(total_comments / PAGE_SIZE),
        total_comments,
        data: comments,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server error !!!");
    }
  };

  // posst :/comments
  postComment = async (req, res) => {
    const data = req.body;
    const { rating, product_id } = data;
    try {
      const newComment = new CommentsModel(data);
      const comment = await newComment.save();
      const commentData = await newComment.populate("user_id");
      commentData._doc.user = commentData._doc.user_id;
      console.log(Object.keys(commentData))
      delete commentData._doc.user_id;

      if (!commentData) {
        return res.status(400).json({ message: "Post comment failed" });
      }
      updateRating(rating, res, product_id);
      res.status(200).json(commentData._doc);
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
      ).lean().populate("user_id");
      if (!commentUpdate) {
        return res.status(400).json({ message: "update failed" });
      }
      commentUpdate.user = commentUpdate.user_id;
      delete commentUpdate.user_id;
      updateRating(rating, res, commentUpdate.product_id);
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
      const { product_id, rating } = comment;
      const commentDelete = await CommentsModel.deleteOne({ _id: id });
      if (!commentDelete) {
        return res.status(400).json({ message: "delete failed" });
      }
      updateRating(rating, res, product_id);
      res.status(200).json(commentDelete);
    } catch (error) {
      res.status(500).json("Server error !!!");
    }
  };
}
module.exports = new CommentController();
