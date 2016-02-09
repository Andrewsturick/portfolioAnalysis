angular.module('inspinia')
    .directive('threeViztwo', function(d3Service, THREEService, dataPrepService, $rootScope){
      return {
        restrict: "EA",
        scope: {
          data:"@"
        },
        link: function(scope, el, attr){
          var camera, scene, renderer, controls, spotLight;

          //must be done since firebase arrays have weird properties when passed into scope?
          scope.data = attr.data
          scope.sizeParam = "Volume";
          scope.colorParam = "PercentChange"
          scope.yParam = "LastTradePriceOnly"
          function init(){
            var dimensions = {
              height: window.innerHeight,
              width: window.innerWidth
            }

            //scene init
            scene = new THREE.Scene();
            //camera init
            camera = new THREE.PerspectiveCamera(45, dimensions.width/dimensions.height, 1, 100000)
            camera.position.z = -5000;
            camera.position.y = 5000;
            camera.lookAt
            scene.add(camera)
            //renderer init
            renderer = new THREE.WebGLRenderer()
            renderer.setClearColor(0xffffff, 1.0)
            renderer.setSize(dimensions.width,dimensions.height)
            renderer.shadowMapEnabled = true;
            //controls init
            controls = new THREE.OrbitControls( camera );
            controls.addEventListener( 'change', renderer.render );
            //append to DOM
            document.getElementById('threejsd3').appendChild(renderer.domElement)

            spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.castShadow= true;
            spotLight.position.set( 1000, 10000,10000);
            scene.add( spotLight );

          }


          function addObjectsToScene(data){
            var index = 1
            scope.color = d3.scale.linear()
                                  .domain([-50,50])
                                  .interpolate(d3.interpolateRgb)
                                  .range(['#ff0000','#00ff00'])
            scope.scaleY = d3.scale.linear().domain([0,d3.max(data, function(d){
                                        return dataPrepService.prepData(d, scope.yParam, "Number")
                                      })]).range([0,5000])
            scope.radius = d3.scale.linear()
                                   .domain([0,d3.max(data, function(d){
                                         return dataPrepService.prepData(d, scope.sizeParam, "Number")
                                       })])
                                   .range([0, 400 ])

            for(var stock in data){
            var spheres = {}
              if(
                // &&    dataPrepService.prepData(data[stock], scope.Xparam, "Number"),
                // &&    dataPrepService.prepData(data[stock], scope.Zparam, "Number"),
                      dataPrepService.prepData(data[stock], scope.yParam, "Number")
                &&    dataPrepService.prepData(data[stock], scope.sizeParam, "Number")
                &&    dataPrepService.prepData(data[stock], scope.colorParam, "Percent")
             ){
                spheres[stock] = {}
                spheres[stock].geometry = new THREE.SphereGeometry(scope.radius(dataPrepService.prepData(data[stock], scope.sizeParam, "Number")),16,32)
                var color =  new THREE.Color(Number("0x" + scope.color(dataPrepService.prepData(data[stock], scope.colorParam, "Percent")).replace("#", "")));
                spheres[stock].material = new THREE.MeshPhongMaterial({color: color})
                spheres[stock].obj = new THREE.Mesh(spheres[stock].geometry, spheres[stock].material)
                spheres[stock].obj.position.y = scope.scaleY(dataPrepService.prepData(data[stock], scope.yParam, "Number"))
                spheres[stock].obj.position.z = -1000 + index*500
                scene.add(spheres[stock].obj)
                index++
              //  stock.position.x = scope.scaleX(dataPrepService.prepData(data[stock], scope.Xparam, "Number"))
              //  stock.position.z = scope.scaleZ(dataPrepService.prepData(data[stock], scope.Zparam, "Number"))

            }
          }
        }

















          //json stringify firebase objects as they change
          scope.$watch(function(){
            return scope.data
          }, function(n,o){
            if(n && o){
              scope.data = angular.fromJson(n);
              addObjectsToScene(scope.data)

            }
          })
          //when threejs is loaded, initialize threejs functions
          $rootScope.$on('threejsLoaded', function(event, data){
            init();
            animate();
          })

          //animation
          function animate(){
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            controls.update();

          }
        }
      }
    })
