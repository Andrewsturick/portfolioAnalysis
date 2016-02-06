angular.module('inspinia')
      .controller('ChainCtrl', function($scope, Auth, $firebaseObject, $firebaseArray, $location, $timeout, $state){
        $scope.symbol = $state.params.symbol;
        var authData            = Auth.$getAuth()
        var userRef             = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid)
        var optionsRef          = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
        var equityRef           = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/portfolio/')
        var usersRef            = new Firebase('https://rooftoptrading.firebaseio.com/users')
        var currentRef          = new Firebase('https://rooftoptrading.firebaseio.com/portfolio/' + $scope.symbol + '/chain' )

        if(!authData){
          $location.path('/index/login')
        }
        else {

          $timeout(function() {
            $scope.userRef          = $firebaseObject(userRef)
            $scope.optionsPortfolio = $firebaseObject(optionsRef)
            $scope.portfolio        = $firebaseObject(equityRef)
            $scope.chainArray      = $firebaseArray(currentRef)
            // $scope.symbolTracker    = $firebaseObject(symbolTrackerRef)
            usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
              if(!snap.val()){
                $location.path('/index/upload')
              }
            })
          })
        }

          $scope.Math = window.Math
          $scope.dataShown = [{title:"Open Interest", key:"open_interest"}, {title:"High", key: "high"}]




          $scope.testArr= [
            {valueTest : '2', word: 'hi'}
            ,{valueTest: '5', word: 'boob'}
            ,{valueTest: '3', word: 'howdy'}
          ]




          $scope.addToDataShown = function(index, data, type){

            type=="call" ? insertRegular() : insertReverse()

            function insertRegular(){
                $scope.dataShown.splice(index, 1, {title: data, key: $scope.Objectify(data)})
            }
            function insertReverse(){
                $scope.dataShown.splice($scope.dataShown.length -1 -index, 1, {title: data, key: $scope.Objectify(data)});
            }
          }

          $scope.headers = {
            greeks: ["Delta", "Theta", "Vega", "Gamma"],
            price: ["High", "Low", "Last Close", "Last Open" ],
            volatility: ["IV", "IV Rank"],
            expiration: "Expiration"
          }

          $scope.optionsToShowInChain = [
              "Delta",
              "Theta",
              "Gamma",
              "Vega",
              "IV",
              "Probability ITM",
              "Percent Change"
          ]

          $scope.Objectify = function(title){
            return title.toLowerCase().replace(' ',"_")
          }
       })
