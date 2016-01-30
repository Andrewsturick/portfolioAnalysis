'use strict';

// need help to bang the OAuth
// where are the modules loaded?

angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'firebase', 'ngFileUpload', 'ngCsvImport' ])
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
        .state('index.upload', {
            url: "/upload",
            templateUrl: "app/upload/upload.html",
            controller: "UploadCtrl",
            data: { pageTitle: 'Upload' }
        })
        .state('index.table', {
            url: "/table",
            templateUrl: "app/table/table.html",
            controller: "tableCtrl",
            data: { pageTitle: 'Table' }
        })
        .state('index.chain', {
          url: '/chain/{symbol}',
          templateUrl: 'app/chain/chain.html',
          controller: 'ChainCtrl'
        })

    $urlRouterProvider.otherwise('/index/login');
  })

  .factory("Auth", function($firebaseAuth) {
    var ref = new Firebase("https://optionsjs.firebaseio.com");
    return $firebaseAuth(ref);
  })
  

  .filter('reverse', function(){
    return function(i){
      return i.slice().reverse();
    }
  })
