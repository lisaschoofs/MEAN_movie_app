var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('OneController loaded');
  MovieService.getOMDB();
  MovieService.getRequest();
}]);

myApp.controller('TwoController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('TwoController loaded');
}]);

myApp.factory('MovieService', ['$http', function($http){

var infoFromServer = {};

  return {
    infoFromServer : infoFromServer,

    getRequest : function(){
      $http.get('/movie').then(function(respsonse){
          infoFromServer.response = response;
          console.log(response);
      });
    },
    getOMDB : function() {
      var movie = 'Interstellar';
      $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&r=json').then(function(response){
        console.log(response);
      }); //end get
    } //end getOMDB
  };//end return
}]);
