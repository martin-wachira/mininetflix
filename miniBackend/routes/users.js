var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Movie = require('../models/movies')
var jwt = require('jsonwebtoken');

// var url = 'mongodb://localhost/netflixMini'

router.post('/register',  function(req,res,next){
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    // creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
})

router.post('/login', function(req,res,next){
   let promise = User.findOne({email:req.body.email}).exec();

   promise.then(function(doc){
    if(doc) {
      if(doc.isValid(req.body.password)){
          // generate token
          let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});

          return res.status(200).json(token);

      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'User email is not registered.'})
    }
   });

   promise.catch(function(err){
     return res.status(501).json({message:'Some internal error'});
   })
})

router.get('/username', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.username);
})

// router.get('/movies', function(req,res,next){
//   return res.json();
// })

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
  Movie.find(function(err, movies){
    if(err){
      console.log("Error retrieving movies")
    }else{
      res.json(movies)
    }
  });
});

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
