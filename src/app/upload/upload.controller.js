'use strict'

angular.module('inspinia')
      .controller('UploadCtrl', function($scope, Auth, $http, Upload, $location){

        var ref = new Firebase("https://optionsjs.firebaseio.com/users")
        var csvRef = new Firebase("https://optionsjs.firebaseio.com/csvs")
        var authData = ref.getAuth()

        if(!authData){
          $location.path('/index/login')
        }

        $scope.csv = {
        	content: null,
        	header: true,
        	headerVisible: true,
        	separator: ',',
        	separatorVisible: true,
        	result: null,
        	encoding: 'ISO-8859-1',
        	encodingVisible: true,
        };

        var onComplete = function(err) {
          if (err) {
            console.log('Synchronization failed');
          } else {
            console.log("Upload good")
            $location.path('/index/table')
          }
        };

        $scope.uploadFile = function(file) {
          csvRef.child(authData.uid).update({
            csv: file,
            id: authData.uid
          }, onComplete())
        };
    })
