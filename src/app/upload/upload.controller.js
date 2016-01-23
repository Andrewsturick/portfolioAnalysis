'use strict'

angular.module('inspinia')
      .controller('UploadCtrl', function($scope, Auth, $http, Upload){

        var ref = new Firebase("https://optionsjs.firebaseio.com/users")
        var csvRef = new Firebase("https://optionsjs.firebaseio.com/csvs")
        var authData = ref.getAuth()

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

        $scope.uploadFile = function(file) {
          console.log(file);
          csvRef.child(authData.uid).update({
            csv: file,
            id: authData.uid  
          })
        };
    })
