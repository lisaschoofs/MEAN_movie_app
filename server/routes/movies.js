var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  Title: String,
  Director: String,
  Year: Number,
  Plot: String
});

var Movie = mongoose.model('Movie', MovieSchema);

// router.get('/', function(req,res){
//   res.send('connected to movies.js');
// });

router.post('/', function(req,res){
  var favorite = new Movie();
  favorite.Title = req.body.Title;
  favorite.Director = req.body.Director;
  favorite.Year = req.body.Year;
  favorite.Plot = req.body.Plot;
  favorite.save(function(err, savedMovie){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }//end if
    res.send(savedMovie);
  }); //end save
});


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
