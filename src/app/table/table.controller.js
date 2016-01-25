'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseObject, $location, $timeout){

        var authData            = Auth.$getAuth()
        var equityRef           = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var equitiesTrackerRef  = new Firebase('https://optionsjs.firebaseio.com/portfolio/equities')
        var optionsTrackerRef   = new Firebase('https://optionsjs.firebaseio.com/portfolio/options')


        if(!authData){
          $location.path('/index/login')

        }

        else {
          equityRef.once('value', function(snap){
            if(!snap.val()){
              $location.path('index/upload')
            }
          })

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
