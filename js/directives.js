'use strict';

/* Directives */

angular.module('ginkgo.directives', []).
  directive('ginkgoDraggable', function () {
    return function(scope, element, attrs) {
        $(element[0]).draggable({
          revert: 'invalid',
          helper: 'clone'
        });
      };              
  }).
  directive('ginkgoDroppable', function () {
    return function(scope, element, attrs) {
      
      // watch, use 'true' to also receive updates when values
       // change, instead of just the reference
  //     scope.$watch($('#calendar')[0], function(value) {
         // scope.rows.push(7);       
         // scope.events = value;
         // scope.getEventLength();       
  
//       },true);
      
      element.droppable({
        drop: function(event, ui ){
          var text = $(ui.draggable).text();
          var allDays = $(this).find('.day') ;                            
          var range = scope.calculateHoverIndex(ui);
          var hoverColumns = $(allDays).slice(range.start, range.end + 5);          
              
  
          scope.$apply(function(){
            scope.addEvent({text: text, startTime: $(hoverColumns).first().data('date'), 
              endTime: $(hoverColumns).last().data('date')})
            scope.getEventLength();                
          });          
        }
      });       
    };
});

