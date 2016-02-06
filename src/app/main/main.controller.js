'use strict';

// this is the login controller, only wraps login functionality
angular.module('inspinia')
  .controller('MainCtrl', function ($scope, Auth, $location) {
    $scope.auth = Auth

    Auth.$onAuth(function(authData) {
      if(authData){
        $scope.authData = authData;

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        $scope.userName = capitalizeFirstLetter(authData.google.cachedUserProfile.given_name)

        $scope.userImage = authData.google.cachedUserProfile.picture
        // $location.path('/index/table')

        var uid = authData.uid

        var google = {
          name: authData.google.displayName,
          img: authData.google.profileImageURL
        }

        // send user data to firebase
        var userRef = new Firebase("https://rooftoptrading.firebaseio.com/users")
        userRef.child(uid).update(google)

      }
    });

    $scope.logout = function(){
      Auth.$unauth()
      $scope.authData = null;
      $location.path('/index/login')
    }

  });
