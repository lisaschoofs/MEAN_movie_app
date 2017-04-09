var myApp = angular.module('myApp', []);

//handles search input, calling getOMDB (API get), display of search results
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
  // $scope.getFavorites = MovieService.getFavorites;
  // getFavorites();
}]);

myApp.factory('MovieService', ['$http', function($http){

// var infoFromServer = {};
var favoritesArray = [];
var movieObject = {};

function saveFavorite(movie) {
  $http.post('/movies', movie).then(function(response){
    console.log('movie saved to DB');
  });
}

function getFavorites() {
    $http.get('/movies').then(function(response){
      console.log(response.data);
      //returns an array of movie objects from DB
    });
}

  return {
    favoritesArray: favoritesArray,
    movieObject : movieObject,
    getOMDB : function(newMovie) {
      console.log('what i am sending to db: ', newMovie);
      var movie = newMovie;
      $http.get('http://www.omdbapi.com/?t=' + movie.title + '&y=&plot=short&r=json').then(function(response){
        // movieObject.response = response;
        // console.log('here is movieObject.response ', movieObject.response);
        movieObject.data = response.data;
        console.log('here is movieObject.data ', movieObject.data);
        // movieObject.response = response.data;
        // console.log(response.data);
        // movieAPI.push(response);
        // movieObject = response;
        // movieObject = angular.copy(response);
      }); //end get
    }, //end getOMDB
    addFavorite : function(movie) {
      console.log('logging movie', movie.data);
      favoritesArray.push(movie.data);
      console.log('logging favoritesArray', favoritesArray);
      saveFavorite(movie.data);
      getFavorites();
    },
    // getFavorites : function() {
    //     $http.get('/movies').then(function(response){
    //       $scope.favoriteList = response.data;
    //       console.log(response.data);
    //     });
    // }
  };//end return
}]);


// infoFromServer : infoFromServer,

// getRequest : function(){
//   $http.get('/movie').then(function(respsonse){
//       infoFromServer.response = response;
//       console.log(response);
//   });
// },

// function getRequest(){
//   $http.get('/movie').then(function(respsonse){
//       infoFromServer.response = response;
//       console.log(response);
//   });
// }
