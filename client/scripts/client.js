var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('OneController loaded');
  MovieService.getOMDB();
  $scope.movieAPI = MovieService.movieAPI;
  // MovieService.getRequest();
}]);




myApp.controller('TwoController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('TwoController loaded');

    $scope.movieAPI = MovieService.movieAPI;
    $scope.movieObject = MovieService.movieObject;
      console.log('here is scope.movieObject in controller 2: ' + $scope.movieObject);
      console.log('here is MovieService.movieObject in controller 2: ', MovieService.movieObject);
      console.log('here is $scope.movieObject.response in controller 2: ', $scope.movieObject);
    // console.log($scope.movieAPI);
    // console.log(movieAPI.title);
    // console.log($scope.movieObject);
    // console.log(movieObject.title);
}]);





myApp.factory('MovieService', ['$http', function($http){

// var infoFromServer = {};
var movieAPI = [];
var movieObject = {
  // movieAPI : movieAPI
};

  return {
    movieAPI : movieAPI,
    movieObject : movieObject,
    getOMDB : function() {
      var movie = 'Interstellar';
      $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json').then(function(response){
        console.log('here is repsonse from API ', response);
        movieObject.response = response;
        console.log('here is movieObject.response ', movieObject.response);
        // movieObject.response = response.data;
        // console.log(response.data);
        // movieAPI.push(response);
        // movieObject = response;
        // movieObject = angular.copy(response);
      }); //end get
    } //end getOMDB
  };//end return
}]);


// infoFromServer : infoFromServer,

// getRequest : function(){
//   $http.get('/movie').then(function(respsonse){
//       infoFromServer.response = response;
//       console.log(response);
//   });
// },
