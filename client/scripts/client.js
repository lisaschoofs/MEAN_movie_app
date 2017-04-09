var myApp = angular.module('myApp', []);

//handles search input, calling getOMDB (API get), display of search results
myApp.controller('GetController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('GetController loaded');
  // $scope.getFavorites = MovieService.getFavorites;
  // $scope.getFavorites();
}]);

myApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('OneController loaded');
  $scope.getOMDB = MovieService.getOMDB;
  $scope.movieObject = MovieService.movieObject;
  $scope.addFavorite = MovieService.addFavorite;
}]);

//handles display of favorite movies
myApp.controller('FavoriteController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('TwoController loaded');
  $scope.favoritesArray = MovieService.favoritesArray;
  console.log('favorites array in controller: ', $scope.favoritesArray);
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
      console.log(response.data);
      // favoritesArray = response.data;
      console.log('logging favoritesArray', favoritesArray);
    });
}

  return {
    favoritesArray: favoritesArray,
    movieObject : movieObject,
    // getFavorites : function() {
    //     $http.get('/movies').then(function(response){
    //     favoritesArray = response.data;
    //     console.log('logging favoritesArray', favoritesArray);
    //     // console.log(response.data);
    //     });
    // },
    getFavorites : getFavorites,
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
