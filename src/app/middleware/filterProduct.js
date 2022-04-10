const filterProduct = (req, res, next) => {
  const { min, max } = req.query;
  if ((min && !max) || (!min && max)) {
    return res.status(400).json({ message: "Thiếu min or max" });
  }
  const query = {};
  if (min && max) {
    if (typeof Number(min) !== "number" || typeof Number(max) !== "number") {
      return res.status(400).json({ message: "min and max phai la 1 so" });
    }
    query.price = { $gte: min, $lte: max };
  }
  req.filter = query;
  next();
};
module.exports = filterProduct;
