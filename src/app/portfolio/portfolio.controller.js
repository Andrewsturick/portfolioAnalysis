'use strict'

angular.module('inspinia')
      .controller('PortfolioCtrl', function($scope, Auth, $timeout, $rootScope, $firebaseObject){

        var ref = new Firebase("https://optionsjs.firebaseio.com/users")
        var authData = ref.getAuth()

        $timeout(function(){
          $scope.userHoldings = $firebaseObject(fireBaseRefs.userRef.child('andrew'))
        })

      })
