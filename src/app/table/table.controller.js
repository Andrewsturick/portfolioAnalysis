'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseObject, $location, $timeout){

        var authData            = Auth.$getAuth()
        var userRef             = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid)
        var optionsRef          = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
        var equityRef           = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var equitiesTrackerRef  = new Firebase('https://optionsjs.firebaseio.com/portfolio/equities')
        var optionsTrackerRef   = new Firebase('https://optionsjs.firebaseio.com/portfolio/options')
        var usersRef             = new Firebase('https://optionsjs.firebaseio.com/users')

        if(!authData){
          $location.path('/index/login')
        }

        // check for the portfolio

        else {

          $timeout(function() {
            $scope.userRef         = $firebaseObject(userRef)
            $scope.optionsPortfolio = $firebaseObject(optionsRef)
            $scope.portfolio       = $firebaseObject(equityRef)
            $scope.equitiesTracker = $firebaseObject(equitiesTrackerRef)
            $scope.optionsTracker  = $firebaseObject(optionsTrackerRef)


            usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
              if(!snap.val()){
                $location.path('/index/upload')
              }
            })

          })
        }

        $scope.isShowing;

        $scope.isDisplaying = {
          equities: false,
          options:false
        }
        $scope.showOptions = function(){
          $scope.isDisplaying.options = true
          $scope.isDisplaying.equities = false
        }
        $scope.showEquities = function(){
          $scope.isDisplaying.equities = true
          $scope.isDisplaying.options = false
        }
        $scope.showPositionAndStock = function(index){
          $scope.isShowing = index;
        }

        $scope.changeIsPositive = function(change){
          return Number(change.replace('%', "").replace('+', ''))>=0;
        }
        $scope.changeIsNegative = function(change){
          return Number(change.replace('%',"").replace('+', ''))<=0;
        }



  })
