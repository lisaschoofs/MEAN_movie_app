var myApp = angular.module('myApp', []);

myApp.controller('GetController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('GetController loaded');
  MovieService.getFavorites();
}]);

//SearchController handles search input, calling getOMDB (API get), display of search results
myApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('SearchController loaded');
  $scope.getOMDB = MovieService.getOMDB;
  $scope.searchResult = MovieService.searchResult;
  $scope.addFavorite = MovieService.addFavorite;
}]);

//FavoriteController handles display of favorite movies
myApp.controller('FavoriteController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('FavoriteController loaded');
  $scope.movieObject = MovieService.movieObject;
  console.log('movidObject', $scope.movieObject);
}]);

myApp.factory('MovieService', ['$http', function($http){

var movieObject = {};

var searchResult = {};

//HTTP POST that sends movie object and saves it in DB
function saveFavorite(movie) {
  console.log('passed into saveFavorite: ', movie);
  $http.post('/movies', movie).then(function(response){
    console.log('movie saved to DB');
  });
}

//HTTP GET that returns an array of movie objects from DB
function getFavorites() {
    $http.get('/movies').then(function(response){
      console.log('response.data from GET request: ', response.data);
      movieObject.data = response.data;
    });
}
//getOMDB connects with the OMDB api, searches DB by movie title
function getOMDB(newMovie){
  console.log('what i am sending to omdb: ', newMovie);
  var movie = newMovie;
  $http.get('http://www.omdbapi.com/?t=' + movie.title + '&y=&plot=short&r=json').then(function(response){
    searchResult.data = response.data;
    console.log('here is searchResult.data ', searchResult.data);
  }); //end get
} //end getOMDB

function addFavorite(searchResult) {
  console.log('logging movie', searchResult.data);
  saveFavorite(searchResult.data);
  console.log('ran addFavorite');
  getFavorites();
}

  return {
    searchResult: searchResult,
    movieObject : movieObject,
    getFavorites : getFavorites,
    getOMDB : getOMDB,
    addFavorite: addFavorite
  };//end return
}]);
