'use strict'

angular.module('inspinia')
      .controller('PortfolioCtrl', function($scope, $firebaseObject, portfolioService){
        var fireBaseRefs = {
            ref           :  new Firebase('https://optionsjs.firebaseio.com'),
            userRef       :   new Firebase('https://optionsjs.firebaseio.com/users'),
            portfolioRef  :   new Firebase('https://optionsjs.firebaseio.com/portfolio')
        }
        fireBaseRefs.userRef.on('value', function(snap){
          var user = snap.val()
          portfolioService.userRef = user;
          console.log(portfolioService.userRef)
        })


        fireBaseRefs.portfolioRef.on('value', function(snap){
          var portfolio = snap.val()
          portfolioService.portfolioRef = portfolio
          console.log(portfolioService.portfolioRef);
        })


      })
