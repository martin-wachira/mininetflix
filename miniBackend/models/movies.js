var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var schema = new Schema({
    title: {type:String, require:true},
    author : {type:String, require:true},
    plot:{type:String, require:true},
    description:{type:String, require:true},
    director:{type:String, require:true},
    realeaseDate:{type:String, require:true},
    genre:{type:String, require:true},
    language:{type:String, require:true},
    // creation_dt:{type:Date, require:true}
},{
    collection: 'movies'
});

module.exports = mongoose.model('Movie',schema);


// router.get('/movies', function(req,res){
//   Movie.find(function())
//   // var movie = new Movie({
//   //   title: req.body.title,
//   //   author: req.body.author,
//   //   plot: req.body.plot,
//   //   description: req.body.description,
//   //   director: req.body.director,
//   //   releaseDate: req.body.releaseDate,
//   //   genre: req.body.genre,
//   //   language: req.body.language
//   // })
// })