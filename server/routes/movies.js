var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  title: String,
  director: String,
  year: Number,
  plot: String
});

var Movie = mongoose.model('movie', MovieSchema);

//get favorite movies from database
router.get('/', function(req,res){
    Movie.find({}, function(err, allMovies){
      if(err){
        console.log('Mongo Error: ', err);
      }

      res.send(allMovies);
    });
});

//post adds a favorite movie to mongoDB
router.post('/', function(req,res){
  console.log('logging req: ', req);
  var favorite = new Movie({
    title: req.body.Title,
    director: req.body.Director,
    year: req.body.Year,
    plot: req.body.Plot
  }); //end new movie
    console.log(favorite.title);

  favorite.save(function(err, savedMovie){
    if(err){
      console.log('Mongo Error in post: ', err);
      res.sendStatus(500);
    }//end if
    res.send(savedMovie);
  }); //end save
});







module.exports = router;
