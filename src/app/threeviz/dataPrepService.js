angular.module('inspinia')
    .service('dataPrepService', function(d3Service){
      this.prepData = function(d, chart, type){
        switch(type){
          case "Number":
              return Number(d.currentQuote[chart]);
              break;

          case "Percent":
              return Number(d.currentQuote[chart].replace(/\+/g,"").replace(/\%/g,""));
              break;

        //   case "YearRange":
        //       var prices =  d.currentQuote[chart].split('-');
        //       return prices[1]-prices[0];
        //       break;
         }
      }

      this.chooseType = function(d, chart){
        if(d.currentQuote[chart]){
          return (typeof Number(d.currentQuote[chart])=="number"? 'Number': 'PercentChange')
        }
      }
      var thisService = this;
      this.d3Max = function(data, chart, type){
        d3.max(data, function(d){
          return thisService.prepData(d, chart, type)
        })
      }

      this.XFraction = function(data, chart, type){
        return  d3.max(data, function(d){
            return thisService.prepData(d, chart, type) * 0.3
          })
        }
      this.marginRight = function(d, chart){
        return (d.currentQuote[chart] + "(" + d.currentQuote[chart] + ")").split('').length * 7;
      }
      this.yCoord = function(i, chartAttrs){
      return  i*(chartAttrs.barHeight + chartAttrs.barPadding) + chartAttrs.barHeight/2
      }
      })
