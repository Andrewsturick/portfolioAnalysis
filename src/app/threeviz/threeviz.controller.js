angular.module('inspinia')
      .controller('ThreeVizCtrl', function($scope, d3Service, Auth, $firebaseArray, $location, $timeout,  THREEService){

        var authData            = Auth.$getAuth()
        var userRef             = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid)
        var userPort            = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio')
        var optionsRef          = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
        var equityRef           = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/portfolio/')
        var usersRef            = new Firebase('https://rooftoptrading.firebaseio.com/users')
        //
       //  //converts to useable object
        $timeout(function() {
          $scope.userRef           = $firebaseArray(userRef)
          $scope.optionsPortfolio  = $firebaseArray(optionsRef)
          $scope.portfolio         = $firebaseArray(equityRef)
          $scope.symbolTracker     = $firebaseArray(symbolTrackerRef)
          $scope.usersRef          = $firebaseArray(usersRef)
          $scope.userPortRef       = $firebaseArray(userPort)
          usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
            // if(!snap.val()){
            //   $location.path('/index/upload')
            // }
          })
        })

        $scope.charts = {
           PriceBook    : {
             title  : 'Price Book',
             key    : 'PriceBook'
           },
           PreviousClose:  {
             title  : 'Previous Close',
             key    : 'PreviousClose'},
           Volume       :  {
             title  : 'Volume',
             key    : 'Volume',
            },
            YearHigh     :  {
              title:  'Year High',
              key   : 'YearHigh'
            },
            ShortRatio   :  {
              title: 'Short Ratio',
              key   : 'ShortRatio'
            }
         }

        $scope.currentlySelected = 'Volume';

        $scope.clickEvent = function(item){
          $scope.$apply(function(){
            if($scope.showDetailPanel){
                $scope.showDetailPanel = false;
                $scope.detailItem  = '';
            }
            else{
                $scope.showDetailPanel = true;
                $scope.detailItem = item;
            }
          })
        }
      })
