'use strict'

angular.module('inspinia')
      .controller('tableCtrl', function($scope, Auth, $firebaseArray, $timeout){


        var authRef     = new Firebase("https://optionsjs.firebaseio.com")
        var authData    = authRef.getAuth()
        var equityRef   = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')

        $timeout(function() {

          $scope.portfolio = $firebaseArray(equityRef)

        })

    })
