'use strict'

angular.module('inspinia')
      .controller('PortfolioCtrl', function($scope, $timeout, $rootScope, $firebaseObject, portfolioService){
        var fireBaseRefs = {
            ref           :  new Firebase('https://optionsjs.firebaseio.com'),
            userRef       :   new Firebase('https://optionsjs.firebaseio.com/users'),
            portfolioRef  :   new Firebase('https://optionsjs.firebaseio.com/portfolio')
        }


        // fireBaseRefs.userRef.on('value', function(snap){
        //     var user = snap.val();
        //
        //     $scope.userHoldings = user;
        //     console.log($scope.userHoldings)
        // })
        // //
        //
        // fireBaseRefs.portfolioRef.on('value', function(snap){
        //     var portfolio = snap.val();
        //     $rootScope.marketState = portfolio;
        //     console.log($rootScope.marketState);
        // })

        $timeout(function(){
          $scope.userHoldings = $firebaseObject(fireBaseRefs.userRef.child('andrew'))

          console.log($scope.userHoldings)
        })


        // $scope.portfolioHeaders = {};
        // setTimeout(function(){
        //
        //   $scope.keys = Object.keys($scope.userHoldings.currentPortfolio.equities[0])
        //   console.log($scope.keys);
        // }, 2000)
      })
