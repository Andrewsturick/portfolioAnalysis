angular.module('inspinia')
      .directive('threeViz', function(d3Service, THREEService, dataPrepService){
        return {
          restrict: "EA",
          scope:{
            data:"@",
            chartTypes: "@"
          },
          link: function(scope, elem, attrs){

            scope.data = attrs.data;
            scope.chartTypes = attrs.chartTypes
            scope.$watch(function(){return scope.data}, function(n,o){
              if(n && o){
                scope.renderCharts(angular.fromJson(scope.data), angular.fromJson(scope.chartTypes))
              }
            })

            scope.renderCharts = function(data, chartTypes){
              d3.select('three-viz').selectAll('*').remove()
              for(var chart in chartTypes){
                scope.makeChart(data, chart)
              }
            }

            scope.makeChart = function(data, chart){
              var chartAttrs = {
                width: 300,
                barPadding: 10,
                barHeight: 25,
                height : function(){return data.length* (this.barHeight+this.barPadding)},
              }
              var xScale= d3.scale.linear()
                                   .domain([0, d3.max(data, function(d){
                                     return dataPrepService.prepData(d,chart)
                                   })])
                                   .range([0,chartAttrs.width*.9]);
              var  color= d3.scale.category10()
              var svg = d3.select('three-viz').append('svg')
                          .style('width', chartAttrs.width)
                          .style('height', chartAttrs.height())
                          .style('background', 'steelblue')
                          .style('border', '2px solid blue')
                          .style('border-radius','5%')
                          .style('opacity', ".6")

                       svg.selectAll('rect')
                          .data(data)
                          .enter()
                          .append('rect')
                          .attr('height', chartAttrs.barHeight)
                          .attr('width', function(d){
                            return xScale(dataPrepService.prepData(d, chart))
                          })
                          .attr('y', function(d, i){
                            return i* (chartAttrs.barHeight + chartAttrs.barPadding)
                          })
                          .attr('x', 0)
                          .attr('fill',function(d){
                            return color(dataPrepService.prepData(d, chart))
                          })
                      svg.selectAll('text')
                         .data(data)
                         .enter()
                         .append('text')
                         .attr('fill',(function(d){
                           return dataPrepService.prepData(d,chart) < 0.3 * dataPrepService.d3Max(data, chart) ?
                            '#ffffff' : '#000000'
                         }))
                         .text(function(d){
                           return d.currentQuote.Symbol + "(" + d.currentQuote[chart] + ")"
                         })
                         .attr('x',function(d){
                           return dataPrepService.prepData(d,chart) < dataPrepService.XFraction(data, chart) ?
                               (function(){
                                 return xScale(dataPrepService.prepData(d, chart))
                               })()
                            :  (function(){
                                 var marginRight =   dataPrepService.marginRight(d, chart);
                                 return (xScale(dataPrepService.prepData(d, chart))- marginRight)
                               })()
                         })
                         .attr('y', function(d,i){return dataPrepService.yCoord(i, chartAttrs)})
                         svg.append('br')


                  }
               }
            }
        })
