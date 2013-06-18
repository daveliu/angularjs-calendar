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
          $('.ui-state-highlight').removeClass('ui-state-highlight');          
                      
          var text = $(ui.draggable).text();
          var allDays = $(this).find('.day') ;                            
          var range = scope.calculateHoverIndex(ui.helper);
          
          if($(ui.draggable).hasClass('event')){
            // drag from inner calendar
            var hoverColumns = $(allDays).slice(range.start, range.end);          
            if($(ui.draggable).parents('.timeFrames')[0] == undefined){
              //drag event
              scope.$apply(function(){
                scope.updateEvent({id: $(ui.helper).data('event-id'), text: $(ui.helper).text(), startTime: $(hoverColumns).first().data('date'), 
                  endTime: $(hoverColumns).last().data('date')})
                scope.getEventLength();                
              });  
            }else{
              //drag timeFrame
              scope.$apply(function(){
                scope.updateTimeFrame({id: $(ui.helper).data('timeframe-id'), name: $(ui.helper).text(), 
                    eventId: $(ui.helper).data('event-id'),
                    startTime: $(hoverColumns).first().data('date'), 
                    endTime: $(hoverColumns).last().data('date')})
                scope.getEventLength();                
              });  
            }
          }else{
            // drag from outer calendar
            var hoverColumns = $(allDays).slice(range.start, range.end + 5);// + 5 is for make the length longer          
                        
            if($(ui.draggable).data('tag-id') != undefined){
              //drag tag
              scope.$apply(function(){
                scope.addEvent({text: text, startTime: $(hoverColumns).first().data('date'), 
                  endTime: $(hoverColumns).last().data('date')})
                scope.getEventLength();                
              });          
            }else{
              //drag memeber
              var rowIndex = $('.month-row').index($(this).parents(".month-row"));
              if(scope.events[rowIndex] != undefined){
                //this row has event       
                if(scope.hasTimeFrame(scope.events[rowIndex], $(ui.draggable).data('member-id'))){
                  alert('this member already in');
                  return false;
                }         
                scope.$apply(function(){
                  scope.addTimeFrame({name: text, 
                                    startTime: $(hoverColumns).first().data('date'), 
                                    endTime: $(hoverColumns).last().data('date'),
                                    eventId: scope.events[rowIndex].id,
                                    memberId: $(ui.draggable).data('member-id')
                                  })
                  scope.getEventLength();                
                });                 
              }else{
                alert('please add tag first');
                return false;
              }                       
            }            
          }
                
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



