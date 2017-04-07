var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('OneController loaded');
}]);

myApp.controller('TwoController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log('TwoController loaded');
}]);

myApp.factory('MovieService', ['$http', function(){

  return {

  };
}]);
