angular.module('inspinia')
      .service('portfolioService', function($firebaseObject, $rootScope){
        var fireBaseRefs = {
            ref           :  new Firebase('https://optionsjs.firebaseio.com'),
            userRef       :   new Firebase('https://optionsjs.firebaseio.com/users'),
            portfolioRef  :   new Firebase('https://optionsjs.firebaseio.com/portfolio')
        }
        this.returnFBRefs = function(){
          return fireBaseRefs
        }
        this.userRef = {};
        this.portfolioRef= {};
    })
