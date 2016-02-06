angular.module('inspinia')
.directive('d3Bars', function(d3Service, $window){
  return{
    restrict : "EA",
    scope: {
      data:"@",
      clickEvent : "&",
      lookingAt : "@"
    },
    link: function(scope, element, attrs){




      scope.lookingAt = attrs.lookingAt

      //mount svg
      var svg = d3.select('.test-hold').append('svg')
                  .style('width', '100%');
      //any time the window resizes, digest the scope
        window.onresize = function(){
          scope.$apply()
        }

        //(i think) that bc of asynch props, need to wait for data to load
        attrs.$observe('data', function(value){
          scope.data = value
        })

        // attrs.$observe('lookingAt', function(value){
        //   scope.lookingAt = attrs.v
        // })
        //watch the window size from the angular pov, and if it changes, re-render the data
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          try{
            scope.render(angular.fromJson(scope.data), scope.lookingAt);
          }catch(e){}
        });

        scope.$watch(function(){return scope.lookingAt}, function(n,o){
          try{
            scope.render(angular.fromJson(scope.data), scope.lookingAt)
          } catch(e){}
        })

        //watch for scope data to come in asynchronously
        scope.$watch(function(){return scope.data}, function(n,o){
          try{
            scope.render(angular.fromJson(scope.data), scope.lookingAt)
          } catch(e){}
        })




        //allow user to put in custom attributes to the directive, if not use defaults
        var margin = parseInt(attrs.margin) || 20,
        barHeight = parseInt(attrs.barHeight) || 20,
        barPadding = parseInt(attrs.barPadding) || 5;




        scope.render = function(data, displayItem){
          //first clear out the svg if it already exists
          if(!data)  return
          svg.selectAll('*').remove()
          var width      = d3.select(element[0]).node().offsetWidth - margin,
              height     = d3.select(data.length*(barHeight + barPadding)),
              color      = d3.scale.category20b(),
              xScale     = d3.scale.linear()
                             .domain([0,d3.max(data, function(d){
                               if(displayItem == "PercentChange"){
                                 return Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,""))
                               }
                               if(displayItem == "Volume"){
                                 return Number(d.currentQuote[displayItem])
                               }
                             })])
                             .range([0, width])
              var xScaleFraction = d3.max(data, function(d){
                if(displayItem == 'Volume'){
                  return Number(d.currentQuote[displayItem]) *.3
                }
                if(displayItem == "PercentChange"){
                  return Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,"")) * 0.3
                }
              })
                //change svg height to appropriate height
          svg.attr('height', height)
          svg.selectAll('rect')
             .data(data).enter()
             .append('rect')
             .attr('height', barHeight)
             .attr('width', function(d){
               if(displayItem == "PercentChange"){
                 return xScale(Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,"")))
               }
               if(displayItem == "Volume"){
                 return xScale(Number(d.currentQuote[displayItem]))
              }

             })
             .attr('y', function(d, i){return i * (barHeight + barPadding)})
             .attr('fill', function(d){
               return color(d.currentQuote[displayItem])
             })
             .on('click', function(d,i){
               scope.clickEvent({item: d})
             })
         svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('y', function(d, i){
              return (barHeight + barPadding)* i + barHeight/2
            })
            .attr('x', function(d){
              if(displayItem == "PercentChange"){
                if(Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,"")) < xScaleFraction){
                  return xScale(Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,"")))
                }
                else{
                  var marginRight =   (d.currentQuote[displayItem] + "(" + d.currentQuote[displayItem] + ")").split('').length * 7
                  return (xScale(Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,""))) - marginRight)
                }
              }
              if(displayItem == "Volume"){
                if(d.currentQuote[displayItem] < xScaleFraction){
                  return xScale(Number(d.currentQuote[displayItem]))
                }
                else{
                  var marginRight =   (d.currentQuote[displayItem] + "(" + d.currentQuote[displayItem] + ")").split('').length * 7
                  return (xScale(Number(d.currentQuote[displayItem])) - marginRight)
                }
              }
              if(displayItem =="YearRange"){

              }
            })
            .attr('fill', function(d){
              if(displayItem =="Volume"){
                if(d.currentQuote[displayItem] < xScaleFraction){
                  return 'black'
                }
                else{
                  return 'white'
                }
              }
              else{
                if(Number(d.currentQuote[displayItem].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,"")) < xScaleFraction){
                  return 'black'
                }
                else{
                  return 'white'
                }
              }
            })
            .text(function(d){
                return d.currentQuote.Symbol + "(" + d.currentQuote[displayItem] + ")"
            })
        }
     }
  }})
