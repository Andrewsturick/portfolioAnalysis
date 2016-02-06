angular.module('inspinia')
   .controller('VizCtrl', function($scope, d3Service, Auth, $firebaseArray, $location, $timeout ){
    //  establishes connections\\
     var authData            = Auth.$getAuth()
     var userRef             = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid)
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
       usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
         if(!snap.val()){
           $location.path('/index/upload')
         }
       })
     })
     //


       //hard-coded test data


       $scope.chartOptions = [
         {title: 'Year Range', key:'YearRange'},
         {title: 'Percent Change', key: 'PercentChange'},
         {title: 'Volume', key: 'Volume'}
       ]


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
