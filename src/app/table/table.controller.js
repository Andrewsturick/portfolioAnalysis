'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseObject, $location, $timeout){

        var authData            = Auth.$getAuth()
        var equityRef           = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var equitiesTrackerRef  = new Firebase('https://optionsjs.firebaseio.com/portfolio/equities')
        var optionsTrackerRef   = new Firebase('https://optionsjs.firebaseio.com/portfolio/options')
        var usersRef             = new Firebase('https://optionsjs.firebaseio.com/users')

        if(!authData){
          $location.path('/index/login')
        }

        else {

          $timeout(function() {
            $scope.portfolio       = $firebaseObject(equityRef)
            $scope.equitiesTracker = $firebaseObject(equitiesTrackerRef)
            $scope.optionsTracker  = $firebaseObject(optionsTrackerRef)

            usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
              if(!snap.val()){
                $location.path('/index/upload')
              }
            })

            // if(!$scope.portfolio.$value){
            //   $location.path('/index/upload')
            // }
          })
        }

        $scope.isShowing;

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
