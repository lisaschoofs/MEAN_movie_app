var myApp = angular.module('myApp', []);

myApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('OneController loaded');
  // MovieService.getOMDB();
  $scope.movieAPI = MovieService.movieAPI;
  $scope.getOMDB = MovieService.getOMDB;
  $scope.favoritesArray = MovieService.favoritesArray;
  $scope.addFavorite = MovieService.addFavorite;
}]);




myApp.controller('TwoController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('TwoController loaded');

    $scope.movieAPI = MovieService.movieAPI;
    $scope.movieObject = MovieService.movieObject;
    $scope.favoritesArray = MovieService.favoritesArray;
    $scope.addFavorite = MovieService.addFavorite;
}]);





myApp.factory('MovieService', ['$http', function($http){

// var infoFromServer = {};
var favoritesArray = [];
var movieObject = {};

  return {
    favoritesArray: favoritesArray,
    movieObject : movieObject,
    getOMDB : function(newMovie) {
      var movie = newMovie;
      $http.get('http://www.omdbapi.com/?t=' + movie.title + '&y=&plot=short&r=json').then(function(response){
        console.log('here is repsonse from API ', response);
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
      console.log('logging movie', movie);
      favoritesArray.push(movie.data);
      console.log('logging favoritesArray', favoritesArray);
    }
  };//end return
}]);


// infoFromServer : infoFromServer,

// getRequest : function(){
//   $http.get('/movie').then(function(respsonse){
//       infoFromServer.response = response;
//       console.log(response);
//   });
// },
