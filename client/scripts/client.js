var myApp = angular.module('myApp', []);

//SearchController handles search input, calling getOMDB (API get), display of search results
myApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('SearchController loaded');
  $scope.getOMDB = MovieService.getOMDB;
  $scope.movieObject = MovieService.movieObject;
  $scope.addFavorite = MovieService.addFavorite;
}]);

//FavoriteController handles display of favorite movies
myApp.controller('FavoriteController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('FavoriteController loaded');
  $scope.favoritesArray = MovieService.favoritesArray;
  console.log('favorites array in controller: ', $scope.favoritesArray);
}]);

//This controller isn't doing anything just yet. I set it up to manage the base
// favorites 'get' when the page loads, but that is not functional yet.
myApp.controller('GetController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('GetController loaded');
  // $scope.getFavorites = MovieService.getFavorites;
  // $scope.getFavorites();
}]);


myApp.factory('MovieService', ['$http', function($http){

// var infoFromServer = {};
var favoritesArray = [];
var movieObject = {};

//HTTP POST that sends movie object and saves it in DB
function saveFavorite(movie) {
  $http.post('/movies', movie).then(function(response){
    console.log('movie saved to DB');
  });
}

//HTTP GET that returns an array of movie objects from DB
function getFavorites() {
    $http.get('/movies').then(function(response){
      console.log('data from GET request: ', response.data);
      // favoritesArray = response.data;
      // console.log('logging favoritesArray', favoritesArray);
    });
}

  return {
    favoritesArray: favoritesArray,
    movieObject : movieObject,
    getFavorites : getFavorites,
    //getOMDB connects with the OMDB api, searches DB by movie title
    getOMDB : function(newMovie) {
      console.log('what i am sending to db: ', newMovie);
      var movie = newMovie;
      $http.get('http://www.omdbapi.com/?t=' + movie.title + '&y=&plot=short&r=json').then(function(response){
        movieObject.data = response.data;
        console.log('here is movieObject.data ', movieObject.data);
      }); //end get
    }, //end getOMDB
    addFavorite : function(movie) {
      console.log('logging movie', movie.data);
      favoritesArray.push(movie.data);
      console.log('logging favoritesArray', favoritesArray);
      saveFavorite(movie.data);
      console.log('ran addFavorite');
      getFavorites();
    }
  };//end return
}]);
