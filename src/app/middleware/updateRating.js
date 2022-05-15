const CommentsModel = require("./../../models/commnets");
const {ProductModel} = require("./../../models/Products.js");
const updateRating = async (rating,res,idProduct) => {
  if (rating && rating > 0) {
    const listComment = await CommentsModel.find({ product_id:idProduct });
    if (!listComment) {
      return res.status(400).json({ message: "failed" });
    } else {
      const vote_count = listComment.filter(
        (vote) => vote.rating > 0
      ).length;
      const vote_average = (
        listComment.reduce((total, vote) => {
          if (vote.rating !== "undefined" && vote.rating > 0)
            return total + vote.rating;
          else return total;
        }, 0) / vote_count
      ).toFixed(1);
      const productUpdate = await ProductModel.findOneAndUpdate(
        { _id: idProduct },
        { vote_count, vote_average }
      );
      if (!productUpdate)
        return res.status(400).json({ message: "rating failed" });
    }
  }
}
module.exports = updateRating;