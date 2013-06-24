angular.module('ginkgo.filters', []).
  filter('filterByMonth', function() {
      return function(events, date) {        
        var out = _.filter(events, function(event){
          var year = parseInt(event.startTime.split("-")[0]);
          var month = parseInt(event.startTime.split("-")[1]);

          return (date.getFullYear() == year) && (date.getMonth() == month);         
        })        
        return out;
      }  
  })  
