'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseObject, $location, $timeout){

        var authData            = Auth.$getAuth()
        var userRef             = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid)
        var optionsRef          = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
        var equityRef           = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/portfolio/')
        var usersRef            = new Firebase('https://rooftoptrading.firebaseio.com/users')

        if(!authData){
          $location.path('/index/login')
        }
        else {

          $timeout(function() {
            $scope.userRef         = $firebaseObject(userRef)
            $scope.optionsPortfolio = $firebaseObject(optionsRef)
            $scope.portfolio       = $firebaseObject(equityRef)
            $scope.symbolTracker = $firebaseObject(symbolTrackerRef)
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
