var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req,res){
  res.send('connected to movies.js');
});

// var MovieSchema = mongoose.Schema({
//     name: String,
//     message: String
// });
//
// var Movie = mongoose.model('movie', MovieSchema, 'movies');
//
// router.get('/', function(req,res){
//     Movie.find({}, function(err, allMovies){
//       if(err){
//         console.log('Mongo Error: ', err);
//       }
//
//       res.send(allMovies);
//     });
// });




module.exports = router;
