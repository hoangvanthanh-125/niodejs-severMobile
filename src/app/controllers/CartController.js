class CartController {
  //GET /
  getListCartByUserId = async (req, res) => {
    res.render("cart")
  };
  //Get by id : /products/:id
  showProductById = async  (req, res) =>  {
    try {
      const _id = req.params.id;
      const product = await ProductModel.findById(_id);
      res.status(200).json(product);
      
    } catch (error) {
      res.status(500).json({error})
    }

  }
  // put :/cart/id;
  updateCart = async (req,res) => {

  }
  //delete :/cart/id
  deleteCart = async (req,res) => {
    
  }
  
}


module.exports = new CartController;
