angular.module('inspinia')
    .service('dataPrepService', function(d3Service){
      this.prepData = function(d, chart){
        switch(chart){
          case "Volume":
              return Number(d.currentQuote[chart]);
              break;

          case "PercentChange":
              return Number(d.currentQuote[chart].replace(/\+/g,"").replace(/\%/g,"").replace(/\-/g,""));
              break;

          case "YearRange":
              var prices =  d.currentQuote[chart].split('-');
              return prices[1]-prices[0];
              break;
        }
      }
      var thisService = this;
      this.d3Max = function(data, chart){
        d3.max(data, function(d){
          return thisService.prepData(d, chart)
        })
      }

      this.XFraction = function(data, chart){
        return  d3.max(data, function(d){
            return thisService.prepData(d, chart) * 0.3
          })
        }
      this.marginRight = function(d, chart){
        return (d.currentQuote[chart] + "(" + d.currentQuote[chart] + ")").split('').length * 7;
      }
      this.yCoord = function(i, chartAttrs){
      return  i*(chartAttrs.barHeight + chartAttrs.barPadding) + chartAttrs.barHeight/2
      }
      })
