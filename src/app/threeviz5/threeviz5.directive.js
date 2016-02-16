'use strict'

angular.module('inspinia')
.directive('threeVizfive', function(d3Service, THREEService, vizfourData, $rootScope){
  return {
    restrict: "EA",
    scope: {
      data:"@",
      sortOptions: "@"
    },
    link: function(scope, el, attr){

      var camera, scene, renderer, controls, spotLight;
      var counter = 0
      scope.isShowing = "Volume"
      scope.data = attr.data
      // scope.sortOptions = attr.sortOptions
      function drawScene(data){
        var array = [];
        Object.keys(data).map(function(stock, i){
            array.push(data[stock])
        })
        data = array


      function init(){

        var dimensions = {
          height: window.innerHeight*.7,
          width: window.innerWidth*.9
        }

        //camera init
        camera = new THREE.PerspectiveCamera(45, dimensions.width/dimensions.height, 1, 100000)
        camera.position.z = 5000;
        camera.position.y = 0;
        camera.lookAt
        scene.add(camera)

        renderer = new THREE.CSS3DRenderer()
        renderer.setSize(dimensions.width,dimensions.height)

        var container = document.getElementById('threejsd3four').appendChild(renderer.domElement)
      }

      function animate(){
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      scope.$watch(function(){
        return scope.data
      }, function(n,o){
        scope.data = angular.fromJson(n);
        var keyArray = Object.keys(angular.fromJson(n))
      })
    }
  }
 }
})
