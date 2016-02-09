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
        y : "delta"
      }
      scope.scales = {}



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
        camera.position.y = 0;
        camera.lookAt
        scene.add(camera)
        //renderer init
        renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(0xffffff, 1.0)
        renderer.setSize(dimensions.width,dimensions.height)
        //controls init
        controls = new THREE.OrbitControls( camera );
        controls.addEventListener( 'change', renderer.render );
        //append to DOM
        document.getElementById('threejsd3').appendChild(renderer.domElement)

        spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.castShadow= true;
        spotLight.position.set( 0, 10000,0);
        scene.add( spotLight );


        function onDocumentMouseDown( event ) {
          var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
          -( event.clientY / window.innerHeight ) * 2 + 1,  //y
          0.5 );                                            //z
          projector.unprojectVector( mouse3D, camera );
          mouse3D.sub( camera.position );
          mouse3D.normalize();
          var raycaster = new THREE.Raycaster( camera.position, mouse3D );
          var intersects = raycaster.intersectObjects( objects );
          // Change color if hit block
          if ( intersects.length > 0 ) {
            console.log(intersects[ 0 ].object)
          }
        }
      }


      function addObjectsToScene(data){

        console.log('////////////////////');

        scope.cardinals =  dataPrepChainService.cardinals(data, scope.params)

        // console.log(cardinals);
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
          .range([0,5000])

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
                obj[optionType].sphere.position.x = -5000 + index*1700 + 800
                obj[optionType].sphere.position.y = scope.scales[stock].scaleY(0.5-Math.abs(0.5-Math.abs(stock.chain[strikePrice][optionType][scope.params.y])))
                obj[optionType].sphere.position.z = scope.scales[stock].scaleZ(stock.chain[strikePrice].numberStrike)
                obj[optionType].sphere.stock = stock.symbol
                // obj[optionType].sphere.
                // obj[optionType].sphere.
                // obj[optionType].sphere.
                // obj[optionType].sphere.
                spheres[stock].callSpheres[strikePrice] = obj[optionType]
                scene.add( spheres[stock].callSpheres[strikePrice].sphere)
              }
              else{
                puts++
                obj[optionType].geometry = new THREE.BoxGeometry(scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]),scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]),scope.scales[stock].radius(stock.chain[strikePrice][optionType][scope.params.size]))
                obj[optionType].material = new THREE.MeshBasicMaterial({color: scope.scales[stock].color(stock.chain[strikePrice][optionType][scope.params.color])})
                obj[optionType].box   = new THREE.Mesh(obj[optionType].geometry, obj[optionType].material )
                obj[optionType].box.position.x = -5000 + index*1700
                obj[optionType].box.position.y = scope.scales[stock].scaleY(0.5-Math.abs(0.5-Math.abs(stock.chain[strikePrice][optionType][scope.params.y])))
                obj[optionType].box.position.z = scope.scales[stock].scaleZ(stock.chain[strikePrice].numberStrike)
                console.log(obj[optionType].box)
                obj[optionType].box.stock = stock.symbol

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
