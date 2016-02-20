angular.module('inspinia')
        .directive('sliderComponent', function(d3Service, THREEService, vizfiveData, $interval ,$rootScope, $compile){
          return {
            scope: {
              spy: "@",
              maxLength: "="
            },
            link: function(scope, elem, attrs){
              // scope.slider = {
              //   min: 0,
              //   max: 0,
              //   options: {
              //     floor: 0,
              //     ceil: scope.maxLength,
              //     translate: function(value){
              //       return scope.sp
              //     },
              //     noSwitching: true
              //   },
              //   value: 0,
              //   showTicks: true,
              //   showTicksValues: true
              //
              // }

              scope.mountSlider = function(spy){
                scope.sliderMounted = true;
                scope.slider = {
                  min: 0,
                  max: 0,
                  options: {
                    floor: 0,
                    ceil: spy.length-1,
                    translate: function(value){
                      return spy[value].LastTradeTime
                    },
                    onChange: function(id, low, high){
                      vizfiveData.isShowing = [low, high]
                    },
                    noSwitching: true
                  },
                  value: 0,
                  showTicks: true,
                  showTicksValues: true

                }
                angular.element(elem).append($compile("<div id='slider-component-holder' ng-show='sliderMounted'><rzslider rz-slider-model='slider.value' rz-slider-high='slider.max' rz-slider-options='slider.options'></rzslider></div>")(scope));
                angular.element(document.getElementById('slider-component-holder')).css('margin-top', '400px')
              }







              scope.$watch(function(){return scope.spy}, function(n,o){
                 if(n && o && n.length > 3 && !scope.isDrawn){
                  scope.spy = angular.fromJson(n);
                  var spy = vizfiveData.makeDataArrayOfObjects(scope.spy)
                  if(vizfiveData.isComplete(scope.spy)){
                  }
                  if(!scope.sliderMounted){
                    scope.mountSlider(spy)
                  }
                 }
              })
            }
          }
        })
