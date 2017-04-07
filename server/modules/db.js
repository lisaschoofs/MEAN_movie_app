var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/movies';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ', + err);
});

MongoDB.on('open', function(err){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
