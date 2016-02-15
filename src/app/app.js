'use strict';

// need help to bang the OAuth
// where are the modules loaded?

angular.module('inspinia', ['d3','threejs','ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'firebase', 'ngFileUpload', 'ngCsvImport' ])
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
        .state('index.viz',{
          url: '/viz',
          templateUrl: 'app/viz/viz.html',
          controller: 'VizCtrl'
        })
        .state('index.threeviz', {
          url: '/threeviz',
          templateUrl: 'app/threeviz/threeviz.html',
          controller: 'ThreeVizCtrl'
        })
        .state('index.threeviz2',{
          url:'/threeviz2',
          templateUrl: 'app/threeviz2/threeviz2.html',
          controller: 'ThreeViz2Ctrl'
        })
        .state('index.threeviz3',{
          url:'/threeviz3',
          templateUrl: 'app/threeviz3/threeviz3.html',
          controller: 'ThreeViz3Ctrl'
        })
        .state('index.threeviz4', {
          url: '/threeviz4',
          templateUrl: 'app/threeviz4/threeviz4.html',
          controller: 'ThreeViz4Ctrl'
        })

    $urlRouterProvider.otherwise('/index/login');
  })

  .factory("Auth", function($firebaseAuth) {
    var ref = new Firebase("https://rooftoptrading.firebaseio.com");
    return $firebaseAuth(ref);
  })


  .filter('reverse', function(){
    return function(i){
      return i.slice().reverse();
    }
  })
