angular.module('inspinia')
      .controller('ThreeViz3Ctrl', function($scope, d3Service, Auth, $firebaseArray, $location, $timeout,  THREEService){
        var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/portfolio/')
        var usersRef            = new Firebase('https://rooftoptrading.firebaseio.com/users')

       //  //converts to useable object
        $timeout(function() {
          $scope.symbolTracker     = $firebaseArray(symbolTrackerRef)
        })
      })
