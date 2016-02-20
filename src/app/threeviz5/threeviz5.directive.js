'use strict'

angular.module('inspinia')
.directive('threeVizfive', function(d3Service, THREEService, vizfiveData, $interval ,$rootScope){
  return {
    restrict: "EA",
    scope: {
      data:"@",
      sortOptions: "@",
      spy: "@"
    },
    link: function(scope, el, attr){
      scope.data = attr.data
      scope.spy = attr.spy
      scope.spyRangeY = [0,10000]
      scope.spyDomainY = [-100,100]
      scope.dimensions = {
        height: window.innerHeight*.7,
        width: window.innerWidth*.9
      }

      var camera, scene, renderer, CSSCamera, CSSScene, CSSRenderer, controls, spotLight, container;
      var line;
      scope.lineDrawCount;
      var MAX_POINTS = 30;


      scope.drawScene = function(){
        scope.isDrawn = true;
        	// geometry
        	var geometry = new THREE.BufferGeometry();
        	// attributes
        	var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
        	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        	// drawcalls
        	scope.lineDrawCount = 1; // draw the first 1 points, only
        	geometry.setDrawRange( 0, scope.lineDrawCount  );
        	// material
        	var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 5 } );
        	// line
        	line = new THREE.Line( geometry,  material );
        	scene.add( line );
        	// update positions
          var geometry = new THREE.SphereGeometry(100, 16, 32)
          var material = new THREE.MeshBasicMaterial({color: 0x157E70})
          var openingMarkSphere = new THREE.Mesh(geometry ,material)
          openingMarkSphere.position.x = 0
          openingMarkSphere.position.y = vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[0].ChangeinPercent.replace("%",""))
          openingMarkSphere.position.z = 0
          scene.add(openingMarkSphere)
          scope.sphereDrawCount = 0

          //SPY OPENING LABEL
          var element = document.createElement( 'h1' );
          element.innerText = "Today the SPY opened at: " + scope.spy[0].LastTradePriceOnly
          // create the object3d for this element
          var cssObject = new THREE.CSS3DObject( element );
          // we reference the same position and rotation
          cssObject.position.z = -100;
          cssObject.position.x = 50;
          cssObject.position.y = 50
          cssObject.rotation.y = Math.PI
          // add it to the css scene
          CSSScene.add(cssObject);


          var planeMaterial = new THREE.MeshBasicMaterial({
             color: 0x000000,
             opacity: 0.0,
            //  transparent: true,
             side: THREE.DoubleSide
         });
          var planeGeometry = new THREE.PlaneGeometry(1000, 50);
          var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
          planeMesh.position.copy(cssObject.position);
          planeMesh.position.y  += 20
          planeMesh.scale.copy(cssObject.scale);

          scene.add(planeMesh);
        	updatePositions();
        }


  // update positions
      function updatePositions() {
      	var positions = line.geometry.attributes.position.array;
      	var x = 0
        var y = vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[0].ChangeinPercent.replace("%",""))
        var z = 0
        var index = 0;
      	for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {
      		positions[ index ++ ] = x;
      		positions[ index ++ ] = y;
      		positions[ index ++ ] = z;
            if(scope.spy[i+1]){
              x = 0;
              y = vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[i+1].ChangeinPercent.replace("%",""));
              z = 0 +((i+1)*1000)


              var geometry = new THREE.SphereGeometry(100, 16, 32)
              var material = new THREE.MeshBasicMaterial({color: 0x157E70})
              var sphere = new THREE.Mesh(geometry ,material)
              sphere.position.x = 0
              console.log( vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[i+1].ChangeinPercent.replace("%","")));
              console.log(+scope.spy[i+1].ChangeinPercent.replace("%",""));

              sphere.position.y = vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[i+1].ChangeinPercent.replace("%",""))
              sphere.position.z = 0 +((i+1)*1000)
              sphere.name = 's' + (i+1)
              scene.add(sphere)
              var labelSprite = vizfiveData.labelSprite(" " + (+scope.spy[i+1].LastTradePriceOnly).toFixed(2) + " ")
            	labelSprite.position.set(0,vizfiveData.yScale(scope.spyDomainY, scope.spyRangeY, +scope.spy[i+1].ChangeinPercent.replace("%",""))+140,0 +((i+1)*1000));
              labelSprite
              console.log(labelSprite);
            	scene.add( labelSprite );
            }
        	}
      }

      scope.$watch(function(){return scope.sphereDrawCount}, function(n,o){
        if(n & o){

        }
      })

      function init(){
        camera = new THREE.PerspectiveCamera(45, scope.dimensions.width/scope.dimensions.height, 1, 100000)
        camera.position.z = -4000;
        camera.position.y = 1590;
        camera.position.x = 2000;
        camera.lookAt({x:5000,y:1990, z:0})
        scene.add(camera)
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(scope.dimensions.width,scope.dimensions.height)
        renderer.setClearColor(0xffffff, 1.0)



        CSSRenderer = new THREE.CSS3DRenderer();
        CSSRenderer.setSize( window.innerWidth, window.innerHeight );
        CSSRenderer.domElement.style.position = 'absolute';
        CSSRenderer.domElement.style.top = 0;

        renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setClearColor( 0xf0f0f0, 0.3 );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position    = 'absolute';
        renderer.domElement.style.top = 0;
        renderer.domElement.style.zIndex = 1;

        CSSRenderer.domElement.appendChild( renderer.domElement );
        document.getElementById('threejsd3five').appendChild( CSSRenderer.domElement );

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.5;
        controls.minDistance = -100000;
        controls.maxDistance = 100000;
        controls.addEventListener('change', renderer.render);

      }

      function animate(){
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        CSSRenderer.render(CSSScene, camera)
        controls.update();
      }





      scope.watching = vizfiveData.isShowing
      scope.$watch(function(){return vizfiveData.isShowing}, function(n,o){
        try{
          line.geometry.setDrawRange(n[0],n[1]-n[0])
        }catch(e){}
      })

      scope.$watch(function(){return scope.spy}, function(n,o){
         if(n && o && n.length > 3 && !scope.isDrawn){
          scope.spy = angular.fromJson(n);
          var spy = vizfiveData.makeDataArrayOfObjects(scope.spy)
          if(!scope.isDrawn){
            scope.drawScene(spy)
          }
         }
      })


      $rootScope.$on('threejsLoaded', function(event, data){
        var counter = 0
        scene = new THREE.Scene()
        CSSScene = new THREE.Scene()
        while(scene && counter<2){
          counter++
          if (counter < 2){
            init();
            animate();
          }
        }
      })

















     var lastTime = 0
     ///any time the data changes
     scope.$watch(function(){
       return scope.data
     }, function(n,o){
       //comes through as string, needs to be JSON...
       scope.data = angular.fromJson(n);
       //array of keys in scope.data for references (keys are the stock symbols)
       var keyArray = Object.keys(angular.fromJson(n))
       //if every object within scope.data is loaded fully from firebase and THREEjs is loaded,
       try{
         if(THREE && vizfiveData.isComplete(keyArray, scope.data)){
           //if scene needs to be drawn, draw it
           if(!scope.isDrawn){
             scope.drawScene(scope.data)
           }
           ////if it hasnt updated in 40 seconds
           Date.now() - lastTime > 40000 ? scope.updateScene(scope.data)  : ''
         }
         lastTime = Date.now()
       }catch(e){}
     })
    }
  }
})
