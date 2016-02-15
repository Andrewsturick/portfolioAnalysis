angular.module('inspinia')
.directive('threeVizthree', function(d3Service, THREEService, dataPrepChainService, $rootScope){
  return {
    restrict: "EA",
    scope: {
      data:"@"
    },
    link: function(scope, el, attr){
      var camera, scene, renderer, controls, spotLight;

      //must be done since firebase arrays have weird properties when passed into scope?
      scope.data = attr.data
      scope.params = {
        size : "open_interest",
        color : "iv",
        y : "delta",
        distanceBetween: 3000
      }

      scope.scales = {}

      function init(){
        var dimensions = {
          height: window.innerHeight*.7,
          width: window.innerWidth*.7
        }

        //scene init
        scene = new THREE.Scene();
        //camera init
        camera = new THREE.PerspectiveCamera(45, dimensions.width/dimensions.height, 1, 100000)
        console.log(camera);
        camera.position.z = -5000;
        camera.position.y = 0;
        camera.lookAt
        scene.add(camera)
        //renderer init
        renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(0xffffff, 1.0)
        renderer.setSize(dimensions.width,dimensions.height)
        //controls init
        controls = new THREE.OrbitControls(camera);
        controls.addEventListener( 'change', renderer.render );
        //append to DOM
        var container = document.getElementById('threejsd3').appendChild(renderer.domElement)

        spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.castShadow= true;
        spotLight.position.set( 0, 10000,0);
        scene.add( spotLight );

        var mouseVector = new THREE.Vector3();
        var raycaster = new THREE.Raycaster();

        container.addEventListener( 'mousemove', mouseMove, false );

        function mouseMove(e){
          mouseVector.x = 2 * (e.offsetX / dimensions.width) - 1;
          mouseVector.y = 1 - 2 * ( e.offsetY / dimensions.height );
          mouseVector.z = .5
          mouseVector.unproject( camera );
          raycaster.set( camera.position, mouseVector.sub( camera.position ).normalize() )
          var intersects = raycaster.intersectObjects( scene.children );
          if(intersects[0]){
            scope.showingOption = intersects[0]

             document.getElementById('threejsd3Shower').appendChild('p').innerHTML=scope.showingOption.object.strike.strike
             document.getElementById('threejsd3Shower').appendChild('p').innerHTML=scope.showingOption.object.optionType.type

             console.log(scope.showingOption.object.strike.strike || scope.showingOption.object.params.strike.strike)
          }
        }
      }


      function addObjectsToScene(data){
        scope.cardinals =  dataPrepChainService.cardinals(data, scope.params)
        for(var stock in scope.cardinals){
          for(var param in scope.cardinals[stock]){
            var  paramObject = scope.cardinals[stock][param]
            var array = []
            for (var optionType in paramObject){
              for(var minMax in paramObject[optionType]){
                array.push(paramObject[optionType][minMax])
              }
            }
            scope.cardinals[stock][param].combination = array
          }
        }



        data.map(function(stock, index){
          var calls = 0
          var puts = 0
          scope.scales[stock] = {}
          // scope.scales[stock].radius;
          // scope.scales[stock].color;
          // scope.scales[stock].scaleY;
          // scope.scales[stock].scale
          scope.scales[stock].radius = d3.scale.linear()
          .domain([d3.min(scope.cardinals[index].sizeParams.combination, function(d){
            return d
          }),d3.max(scope.cardinals[index].sizeParams.combination, function(d){
            return d
          })])
          .range([0, 400 ])


          scope.scales[stock].color = d3.scale.linear()
          .domain([d3.min(scope.cardinals[index].colorParams.combination, function(d){
            return d
          }),d3.max(scope.cardinals[index].colorParams.combination, function(d){
            return d
          })])
          .interpolate(d3.interpolateRgb)
          .range(['#ddc00c','#00ff00'])


          scope.scales[stock].scaleY = d3.scale.linear()
          .domain([0,.5])
          .range([0,3000])

          scope.scales[stock].scaleZ = d3.scale.linear()
          .domain([d3.min(stock.chain, function(d){
            return d.numberStrike
          }), d3.max(stock.chain, function(d){
            return d.numberStrike
          })])
          .range([-8000,8000])

          //initialize object for each stock
          var spheres = {}
          var boxes = {}
          var chain = stock.chain
          spheres[stock]= {};

          boxes[stock]= {}
          spheres[stock].callSpheres = {}
          boxes[stock].putBoxes = {}
          //iterate through each strike
          for(var strikePrice in stock.chain){
            var obj = {
              call: {},
              put: {}
            }
            for(var optionType in obj){
              if(optionType ==="call"){
                calls++
                obj[optionType].geometry = new THREE.SphereGeometry(scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]), 16, 32)
                obj[optionType].material = new THREE.MeshBasicMaterial({color: scope.scales[stock].color(stock.chain[strikePrice][optionType][scope.params.color])})
                obj[optionType].sphere   = new THREE.Mesh(obj[optionType].geometry, obj[optionType].material )
                obj[optionType].sphere.position.x = -5000 + index*scope.params.distanceBetween + 800
                obj[optionType].sphere.position.y = scope.scales[stock].scaleY(0.5-Math.abs(0.5-Math.abs(stock.chain[strikePrice][optionType][scope.params.y])))
                obj[optionType].sphere.position.z = scope.scales[stock].scaleZ(stock.chain[strikePrice].numberStrike)
                obj[optionType].sphere.stock = stock.symbol
                obj[optionType].sphere.colorRef = {param: scope.params.color, value:stock.chain[strikePrice][optionType][scope.params.color]}
                obj[optionType].sphere.sizeRef = {param: scope.params.size, value: stock.chain[strikePrice][optionType][scope.params.size] }
                obj[optionType].sphere.yRef = {param: scope.params.y , value: stock.chain[strikePrice][optionType][scope.params.y]}
                obj[optionType].sphere.strike = {strike: stock.chain[strikePrice].numberStrike}
                obj[optionType].sphere.optionType = {type: optionType}

                spheres[stock].callSpheres[strikePrice] = obj[optionType]
                scene.add( spheres[stock].callSpheres[strikePrice].sphere)
              }
              else{
                puts++
                obj[optionType].geometry = new THREE.BoxGeometry(scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]),scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]),scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]))
                obj[optionType].material = new THREE.MeshBasicMaterial({color: scope.scales[stock].color(stock.chain[strikePrice][optionType][scope.params.color])})
                obj[optionType].box   = new THREE.Mesh(obj[optionType].geometry, obj[optionType].material )
                obj[optionType].box.position.x = -5000 + index*scope.params.distanceBetween
                obj[optionType].box.position.y = scope.scales[stock].scaleY(0.5-Math.abs(0.5-Math.abs(stock.chain[strikePrice][optionType][scope.params.y])))
                obj[optionType].box.position.z = scope.scales[stock].scaleZ(stock.chain[strikePrice].numberStrike)
                obj[optionType].box.params = {}
                obj[optionType].box.params.stock = stock.symbol
                obj[optionType].box.params.colorRef = {param: scope.params.color, value:stock.chain[strikePrice][optionType][scope.params.color]}
                obj[optionType].box.params.sizeRef = {param: scope.params.size, value: stock.chain[strikePrice][optionType][scope.params.size] }
                obj[optionType].box.params.yRef = {param: scope.params.y , value: stock.chain[strikePrice][optionType][scope.params.y]}
                obj[optionType].box.strike = {strike: stock.chain[strikePrice].numberStrike}
                obj[optionType].box.optionType = {type: optionType}
                boxes[stock].putBoxes[strikePrice] = obj[optionType]
                scene.add(boxes[stock].putBoxes[strikePrice].box)
              }
            }
          }
          console.log('CALLS', calls, 'PUTS: ', puts);
        })
      }

      var counter = 0

      //json stringify firebase objects as they change
      scope.$watch(function(){
        return scope.data
      }, function(n,o){
        counter++
        if(n && o){
          if(counter>=3){
            scope.data = angular.fromJson(n);
            scope.data.map(function(stock, i){
              var array = [];
              for (var strike in stock.chain){
                array.push(stock.chain[strike])
              }
              scope.data[i].chain = array;
            })
            if(angular.fromJson(o)[1]){
              addObjectsToScene(scope.data)
            }

          }

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
