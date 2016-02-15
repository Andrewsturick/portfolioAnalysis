'use strict'

angular.module('inspinia')
      .controller('UploadCtrl', function($scope, Auth, $http, Upload, $location){

        var ref = new Firebase("https://rooftoptrading.firebaseio.com/users")
        var csvRef = new Firebase("https://rooftoptrading.firebaseio.com/csvs")
        var authData = ref.getAuth()
        var userRef = new Firebase("https://rooftoptrading.firebaseio.com/users/" + authData.uid + "/currentPortfolio")

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

        // user ref for the current portfolio to show
        userRef.on('value', function(snap){
          console.log(snap.val())
          if(snap.val()) $location.path('/index/table')
          $scope.csvReturn = true;
        })

        var onComplete = function(err) {
          console.log('done1');
          if (err) {
            console.log('Synchronization failed');
          } else {
            $scope.csvReturn = false;
            console.log('done2');
          }
        };



        $scope.uploadFile = function(file) {
          console.log(file);
          console.log('boob');
          csvRef.child(authData.uid).update({
            csv: file,
            id: authData.uid
          }, onComplete())
        };
    })
