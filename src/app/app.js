'use strict';

// need help to bang the OAuth
// where are the modules loaded?

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'firebase' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html"
        })
        .state('index.login', {
            url: "/login",
            templateUrl: "app/main/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg'  }
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Dashboard' }
        })
        .state('index.portfolio', {
          url: "/portfolio",
          templateUrl: "app/portfolio/portfolio.html",
          controller: "PortfolioCtrl",
          data: {pateTitle: 'My Portfolio'}
        });

    $urlRouterProvider.otherwise('/index/login');
  })

  .factory("Auth", function($firebaseAuth) {
    var ref = new Firebase("https://optionsjs.firebaseio.com");
    return $firebaseAuth(ref);
  })

  .controller("homeCtrl", function($scope, $rootScope, Auth, $http, $firebaseArray) {
    $scope.auth = Auth;

    $scope.logout = function(){
      $scope.auth.$unauth()
    }

    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log();
      if(authData){
        console.log(authData)

        // send user data to fb for streaming
        // var userRef = new Firebase("https://optionsjs.firebaseio.com/users");
        // userRef.child(handle).set(twitter);

        // $scope.profileImg = authData.twitter.profileImageURL;
      }
    });
  });
