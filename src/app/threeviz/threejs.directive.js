angular.module('inspinia')
      .directive('threeJs', function(d3Service, THREEService, $timeout, dataPrepService){
        return {
          restrict : "EA",
          scope : {
            portfolio:"@",
            data:"@",
            chartTypes: "@"
          },
          link: function(scope, element, attrs){
            var counter = 0
              scope.data = attrs.data
              scope.chartTypes = attrs.chartTypes
              scope.$watch(function(){return scope.data},function(n,o){
                if(n && o){
                  scope.data = angular.fromJson(n)
                  scope.chartTypes =  angular.fromJson(scope.chartTypes)
                  for(var chart in scope.chartTypes){
                    scope.updateChart(scope.data, chart)
                  }
                }
              })

              scope.renderCharts = function(data, chartTypes){
                d3.select('three-viz').selectAll('*').remove()
                for(var chart in chartTypes){
                  scope.makeChart(data, chart)
                }
              }

              var verticalCounter = 0
              scope.makeChart = function(data, chart){
                    counter = counter+300
                    var chartAttrs = {
                      width: 300,
                      barPadding: 10,
                      barHeight: 25,
                      height : function(){return data.length* (this.barHeight+this.barPadding)},
                    }
                    var xScale= d3.scale.linear()
                                         .domain([0, d3.max(data, function(d){
                                           return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart))
                                         })])
                                         .range([0,chartAttrs.width*.9]);
                    var color = d3.scale.category10()

                    var div = document.createElement('div')
                    var header =  d3.select('div').append('text')
                                    .attr('id', chart+"header")
                                    .text(chart)
                                    .style('font-size', '2em')


                              div.appendChild(document.getElementById(chart+"header"))
                              div.appendChild(document.createElement('br'))
                            console.log('header: ', header)
                    var svg2 = d3.select('div').append('svg')
                                .attr('id', chart)
                                .style('width', chartAttrs.width)
                                .style('height', chartAttrs.height())
                                .style('background', 'steelblue')
                                .style('border', '2px solid blue')
                                .style('border-radius','5%')
                                .style('opacity', ".6")
                                .on('click', function(){console.log(this.id)})
                                svg2.selectAll('rect')
                                   .data(data)
                                   .enter()
                                   .append('rect')
                                   .attr('height', chartAttrs.barHeight)
                                   .attr('width', function(d){
                                     return xScale(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))
                                   })
                                   .attr('y', function(d, i){
                                     return i* (chartAttrs.barHeight + chartAttrs.barPadding)
                                   })
                                   .attr('x', 0)
                                   .attr('fill',function(d){
                                     return color(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))
                                   })
                               svg2.selectAll('text')
                                  .data(data)
                                  .enter()
                                  .append('text')
                                  .attr('fill',(function(d){
                                    return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart)) < 0.3 * dataPrepService.d3Max(data, chart, dataPrepService.chooseType(d, chart)) ?
                                     '#ffffff' : '#000000'
                                  }))
                                  .text(function(d){
                                    return d.currentQuote.Symbol + "(" + d.currentQuote[chart] + ")"
                                  })
                                  .attr('x',function(d){
                                    return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart)) < dataPrepService.XFraction(data, chart, dataPrepService.chooseType(d, chart)) ?
                                        (function(){
                                          return xScale(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))
                                        })()
                                     :  (function(){
                                          var marginRight =   dataPrepService.marginRight(d, chart);
                                          return (xScale(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))- marginRight)
                                        })()
                                  })
                                  .attr('y', function(d,i){return dataPrepService.yCoord(i, chartAttrs)})
                        div.appendChild(document.getElementById(chart))

                        var object = new THREE.CSS3DObject(div)
                        object.__data__ = {}
                        object.__data__.vertical = {
                          z:-400+verticalCounter*300,
                          x:100,
                          y:0
                        }
                        verticalCounter++
                        if(counter!=300){
                          object.position.y =700;
                          object.position.x =-900 +counter;
                          object.position.z = 0;
                        }
                        else{
                          object.position.y = -100;
                          object.position.x = 500;
                          object.position.z = 3000;
                        }
                          scene.add(object)
                    }


          scope.updateChart = function(data, chart){
                var chartAttrs = {
                  width: 300,
                  barPadding: 10,
                  barHeight: 25,
                }

         var xScale              = d3.scale.linear()
                                     .domain([0, d3.max(data, function(d){
                                       return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart))
                                     })])
                                     .range([0,chartAttrs.width*.9]);

         var thisChart          = d3.select("#"+ chart)

                           thisChart.selectAll('rect')
                                    .data(data)
                                    .transition()
                                    .duration(500)
                                    .attr('width', function(d){
                                      return xScale(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))
                                    })

          var text =   thisChart.selectAll('text')
                                .data(data)
                                .transition()
                                .duration(500)
                                .attr('fill',(function(d){
                                  return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart)) < 0.3 * dataPrepService.d3Max(data, chart, dataPrepService.chooseType(d, chart)) ?
                                   '#ffffff' : '#000000'
                                }))
                                .text(function(d){
                                  return d.currentQuote.Symbol + "(" + d.currentQuote[chart] + ")"
                                })
                                .attr('x',function(d){
                                  return dataPrepService.prepData(d,chart,dataPrepService.chooseType(d, chart)) < dataPrepService.XFraction(data, chart, dataPrepService.chooseType(d, chart)) ?
                                      (function(){
                                        return xScale(dataPrepService.prepData(d, chart,dataPrepService.chooseType(d, chart)))
                                      })()
                                   :  (function(){
                                        var marginRight =   dataPrepService.marginRight(d, chart);
                                        return (xScale(dataPrepService.prepData(d, chart, dataPrepService.chooseType(d, chart)))- marginRight)
                                      })()
                                })
                                .attr('y', function(d,i){return dataPrepService.yCoord(i, chartAttrs)})
              }








              $timeout(function(){
                var camera, scene, renderer, geometry, material, mesh, rendererCSS;
                var dimensions = {
                  height :window.innerHeight,
                  width  :window.innerWidth
                }
                init(dimensions);
                animate();
              }, 4000)

              function init(dimensions) {
                scope.displaying = 1
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(50, dimensions.width/dimensions.height, 1, 10000);
                camera.position.z = 4000;
                camera.position.x = 500;
                camera.lookAt.x = 0
                scene.add(camera);
                scope.renderCharts(angular.fromJson(scope.data), angular.fromJson(scope.chartTypes))
                renderer = new THREE.CSS3DRenderer();
                renderer.setSize(dimensions.width, dimensions.height);
                document.getElementById('threejs').appendChild(renderer.domElement)
              }

              function animate() {
                requestAnimationFrame(animate);
                TWEEN.update();
                render();
              }


              function render() {
                renderer.render(scene, camera);
              }

              scope.lastShownIndex = 1
              document.addEventListener('keyup', changeLayout)
              function changeLayout(e){
                switch(e.keyCode){
                  case 37 :
                  scope.displaying=scope.displaying -1
                  break;
                  case 39 :
                  scope.displaying=scope.displaying + 1
                  break;
                }
                duration = 600;


                scene.children.forEach(function(object, i){
                     if (object.__data__){
                       console.log(i, scope.displaying)
                      if(i==scope.displaying){
                        console.log(object.position, 'else');
                        var coords = new TWEEN.Tween(object.position)
                        .to({y :-100, x: 500, z :3000})
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                        if(!scope.lastShownIndex){
                          scope.lastShownIndex = scope.displaying

                        }
                      }
                      else  if(i ==scope.lastShownIndex){
                        console.log(object, 'if');
                        var coords = new TWEEN.Tween(object.position)
                        .to({x:-900 +300*i , y: 700, z: 0})
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                        scope.lastShownIndex = scope.displaying

                      }
                    }
                  })

                var update = new TWEEN.Tween(this)
                .to({}, duration)
                .start();
            }



          }
        }
      })
