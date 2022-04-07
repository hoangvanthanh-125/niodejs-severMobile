const  Course = require('./../../models/Course')
class SiteController {
  //GET - home
  index(req,res){
    Course.find({},function(err,docs){
      if(!err){
         res.json(docs);
         return ;
      }
      res.status(400).json({err:'ERROR'})
    })
    // res.render('home')
  }
  //GET = /search
  search(req,res){
    res.render('search');
  }
}
module.exports = new SiteController;