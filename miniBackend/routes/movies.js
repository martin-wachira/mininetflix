var express = require('express');
var router = express.Router();
var Movie = require('../models/movies')

router.get('/movies', function(req, res){
//   // var resultArray = [];
//   // mongo.connect(url, function(err, db) {
//   //   assert.equal(null, err);
//   //   var cursor = db.collection('movies').find();
//   //   cursor.forEach(function(doc, err) {
//   //     assert.equal(null, err);
//   //     resultArray.push(doc);
//   //   }, function(){
//   //     db.close();
//   //     res.render('register', {items: resultArray});
//   //   });
//   // });

  console.log("Getting all Movies");
  Movie.find({}, function(err, data){
    if(err){
      console.log("Error retrieving movies")
    }else{
      res.json(data)
    }
  });
});


module.exports = router;
