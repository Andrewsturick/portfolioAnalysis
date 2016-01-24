'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseArray, $firebaseObject, $location, $timeout){


        var authRef            = new Firebase("https://optionsjs.firebaseio.com")
        var authData           = authRef.getAuth()
        var equitiesTrackerRef = new Firebase('https://optionsjs.firebaseio.com/portfolio/equities')
        var optionsTrackerRef  = new Firebase('https://optionsjs.firebaseio.com/portfolio/options')
        if(!authData){
          $location.path('/index/login')
        } else{
          console.log(authData)
          var equityRef        = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        }
        if(!equityRef){
          $location.path('/index/upload')
        }

        $scope.isShowing;

        $timeout(function() {
          $scope.portfolio       = $firebaseObject(equityRef)
          $scope.equitiesTracker = $firebaseObject(equitiesTrackerRef)
          $scope.optionsTracker  = $firebaseObject(optionsTrackerRef)
        })





        $scope.showPositionAndStock = function(index){
          $scope.isShowing = index;
          console.log(index)
          console.log('//////////',$scope.equitiesTracker[$scope.isShowing].currentQuote.Bid);
        }

        $scope.changeIsPositive = function(change){
          return Number(change.replace('%', "").replace('+', ''))>=0;
        }
        $scope.changeIsNegative = function(change){
          return Number(change.replace('%',"").replace('+', ''))<=0;
        }



  })
