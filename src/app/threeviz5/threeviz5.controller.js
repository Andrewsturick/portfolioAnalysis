var app = angular.module('inspinia')
app.controller('ThreeViz5Ctrl', function($scope, d3Service, Auth, vizfiveData, $firebaseObject, $firebaseArray, $location, $timeout,  THREEService){
  var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/market/');
  var marketArr = vizfiveData.marketArray();

  $scope.equityRefs = {};
  $scope.marketPrep = {};
  $scope.optionsRefs = {};
  $scope.optionsFBArrays = {};
  var SPYref = vizfiveData.newSPYRef
  $scope.SPY = $firebaseArray(SPYref)



})
