'use strict';

/* Directives */

angular.module('ginkgo.directives', []).
  directive('ginkgoDraggable', function () {
    return function(scope, element, attrs) {
        element.draggable({
          revert: 'invalid',
          helper: 'clone',
          drag: function( event, ui ) {
            var range = scope.calculateHoverIndex(ui.helper);
            var allDays = $(this).parents('.month-row').find('.days .day') ;        
            var hoverColumns = $(allDays).slice(range.start, range.end);
            $('.ui-state-highlight').removeClass('ui-state-highlight');          
            $(hoverColumns).addClass('ui-state-highlight');         
          }
        });
      };              
  }).
  directive('ginkgoDroppable', function () {
    return function(scope, element, attrs) {
          
      element.droppable({
        drop: function(event, ui ){
          var text = $(ui.draggable).text();
          var allDays = $(this).find('.day') ;                            
          var range = scope.calculateHoverIndex(ui.helper);
          var hoverColumns = $(allDays).slice(range.start, range.end + 5);          
                
          scope.$apply(function(){
            scope.addEvent({text: text, startTime: $(hoverColumns).first().data('date'), 
              endTime: $(hoverColumns).last().data('date')})
            scope.getEventLength();                
          });          
        }
      });       
    };
}).directive('ginkgoResizeable', function () {
    return function(scope, element, attrs) {
      element.resizable({
        handles: "e",
        grid: scope.gridWidth ,
        resize: function(event, ui) {
          $(this).css('height', 'auto');
        },
        stop: function(event, ui) {
          var range = scope.calculateHoverIndex(ui.helper);
          console.log(range)
          var allDays = $(this).parents('.month-row').find('.days .day') ;        
          var hoverColumns = $(allDays).slice(range.start, range.end);
          
          scope.$apply(function(){
            scope.updateEvent({id: $(ui.helper).data('event-id'), text: $(ui.helper).text(), startTime: $(hoverColumns).first().data('date'), 
              endTime: $(hoverColumns).last().data('date')})
            scope.getEventLength();                
          });   
        }
      });        
    }
});      



