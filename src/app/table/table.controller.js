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
          var equityRef        = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
          var optionsRef       = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
          var userRef          = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid)
        }
        if(!equityRef){
          $location.path('/index/upload')
        }
        $scope.isDisplaying = {
          options: false,
          equities: false
        }
        $scope.isShowing;
        $scope.showEquities = function(){
          console.log('showequticies');
          $scope.isDisplaying.options = false;
          $scope.isDisplaying.equities= true;
        }
        $scope.showOptions = function(){
        $scope.isDisplaying.equities = false;
        $scope.isDisplaying.options = true;
        }
        $timeout(function() {

          $scope.portfolio       = $firebaseObject(equityRef)
          $scope.optionsPortfolio= $firebaseObject(optionsRef)
          $scope.equitiesTracker = $firebaseObject(equitiesTrackerRef)
          $scope.optionsTracker  = $firebaseObject(optionsTrackerRef)
          $scope.userRef         = $firebaseObject(userRef)
        })





        $scope.showPositionAndStock = function(index){
          console.log(index);
          $scope.isShowing = index;
        }

        $scope.changeIsPositive = function(change){
          return Number(change.replace('%', "").replace('+', ''))>=0;
        }
        $scope.changeIsNegative = function(change){
          return Number(change.replace('%',"").replace('+', ''))<=0;
        }



  })
