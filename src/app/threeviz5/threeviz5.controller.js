'use strict'
angular.module('inspinia')
       .controller('ThreeViz5Ctrl', function($scope, d3Service, Auth, vizfourData, $firebaseObject, $location, $timeout,  THREEService){
                 var authData            = Auth.$getAuth()
                //  var userRef             = new Firebase('https://rooftoptrading.firebaseio.com/users/' + authData.uid)
                 var symbolTrackerRef    = new Firebase('https://rooftoptrading.firebaseio.com/market/')
                 var marketArr = vizfourData.marketArray()
                 $scope.equityRefs = {}
                 $scope.equityFBArrays = {}
                 $scope.optionsRefs = {}
                 $scope.optionsFBArrays = {}
                 marketArr.map(function(stock){
                   $scope.equityRefs[stock.Symbol] = new Firebase('https://rooftoptrading.firebaseio.com/market/' + stock.Symbol + '/currentEquityInfo')
                   $scope.equityFBArrays[stock.Symbol] = $firebaseObject($scope.equityRefs[stock.Symbol])
                 })

                $scope.market = $scope.equityFBArrays
                $scope.sortParams = {
                  params: [
                    "Volume",
                    "ChangeinPercent",
                    "ShortRatio",
                    "LastTradePriceOnly"
                }
       })
