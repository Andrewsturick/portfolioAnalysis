angular.module('inspinia')
      .controller('ChainCtrl', function($scope, Auth, $firebaseObject, $location, $timeout, $state){
        var authData            = Auth.$getAuth()
        var userRef             = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid)
        var optionsRef          = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/options')
        var equityRef           = new Firebase('https://optionsjs.firebaseio.com/users/' + authData.uid + '/currentPortfolio/equities')
        var symbolTrackerRef    = new Firebase('https://optionsjs.firebaseio.com/portfolio/')
        var usersRef            = new Firebase('https://optionsjs.firebaseio.com/users')

        if(!authData){
          $location.path('/index/login')
        }
        else {

          $timeout(function() {
            $scope.userRef          = $firebaseObject(userRef)
            $scope.optionsPortfolio = $firebaseObject(optionsRef)
            $scope.portfolio        = $firebaseObject(equityRef)
            $scope.symbolTracker  = $firebaseObject(symbolTrackerRef)
            usersRef.child(authData.uid + '/currentPortfolio').on('value', function(snap){
              if(!snap.val()){
                $location.path('/index/upload')
              }
            })
          })
        }

          $scope.symbol = $state.params.symbol;
          $scope.Math = window.Math

          $scope.dataShown = [{title:"Open Interest", key:"open_interest"}, {title:"High", key: "high"}]


          $scope.addToDataShown = function(index, data, type){
            type=="call" ? insertRegular() : insertReverse()

            function insertRegular(){
                // var test = $scope.dataShown
                // console.log(test.splice(index, 1, {title: data, key: $scope.Objectify(data)}))
                // console.log(test)
                $scope.dataShown.splice(index, 1, {title: data, key: $scope.Objectify(data)})
                console.log($scope.dataShown)
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
