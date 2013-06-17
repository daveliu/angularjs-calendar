

$(document).ready(function () {

  // var totalDates = $('.month-row:first').find('.days .day').length;
  // var dateWidth = (1 / totalDates) * 100;
  // var totalWidth =  parseInt($('#calendar').css('width'));  
  // var gridWidth = totalWidth / totalDates;
  //          
  //          
  // $('.external-event').live('mouseover',function(){
  //   $(this).draggable({
  //     cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  //     revert: "invalid", // when not dropped, the item will revert back to its initial position
  //     containment: "document",
  //     helper: "clone",
  //     cursor: "move"
  //   });    
  // })             
  // 
  // 
  // $( ".member" ).draggable({
  //   cancel: "a.ui-icon", // clicking an icon won't initiate dragging
  //   revert: "invalid", // when not dropped, the item will revert back to its initial position
  //   containment: "document",
  //   helper: "clone",
  //   cursor: "move",
  //   start: function( event, ui ) {
  //   }
  // });
  // 
  // 
  // function calculateHoverIndex(ui){
  //   var startHoverIndex  =  Math.round(ui.position.left / gridWidth) + 1 ;
  //   var ownerWidth =  parseInt($(ui.helper).css('width'));    
  //   var widthCount =  Math.round(ownerWidth /  gridWidth) + 1 ;    
  //   var endHoverIndex = startHoverIndex + widthCount - 1;
  //   
  //   return {start: startHoverIndex, end: endHoverIndex};
  // }
  // 
  // $('.events div.event').live('mouseover',function(){
  //   $(this).draggable({      
  //     axis: "x",
  //     revert: "invalid",    
  //     cursor: "move"  ,
  //      drag: function( event, ui ) {
  //        var range = calculateHoverIndex(ui);
  //        
  //        var allDays = $(this).parents('.month-row').find('.days .day') ;        
  //        $(allDays).removeClass('ui-state-highlight');
  //        var hoverColumns = $(allDays).slice(range.start, range.end);
  //        $(hoverColumns).addClass('ui-state-highlight');         
  //      } 
  //   });
  //   
  //   $(this).resizable({
  //     handles: "e",
  //     grid: gridWidth ,
  //     resize: function(event, ui) {
  //         $(this).css('height', 'auto');
  //     },
  //     stop: function(event, ui) {
  //       var range = calculateHoverIndex(ui);
  //       var allDays = $(this).parents('.month-row').find('.days .day') ;        
  //       var hoverColumns = $(allDays).slice(range.start, range.end);
  //       var str = $(hoverColumns).first().data('date') + "--" + $(hoverColumns).last().data('date') 
  // 
  //       alert(str)
  //     }
  //   });
  // });
  
  
  $( ".days" ).droppable({
    drop: function( event, ui ) {  
      
      $('.ui-state-highlight').removeClass('ui-state-highlight');
      
      var monthRow = $(this).parents(".month-row")
      var noTag = $(monthRow).find('.events .event-row.tag').length == 0 ;      
      var text = $(ui.draggable).text();
      var dateIndex = $(monthRow).find('.days .day').index(this);
      var left = dateWidth * dateIndex;
            
      if($(ui.draggable).hasClass('member')){
        var hasThisMember = $(monthRow).find('.events').text().indexOf(text) >= 0  ;
        
        if( noTag || hasThisMember ){
          return false;          
        }         
                        
        var clone  = $('#member-clone').clone();        
        $(clone).find('.event .title').text(text);
        $(clone).find('div.event').css('left', left + "%");        
        $(clone).attr('id', '').appendTo($(monthRow).find('.events')).show();    
        $("<div class='spacer'></div>").appendTo($(monthRow).find('.events'));
                
      }else{
        
        if(!noTag){
          // drag from left tags
          if(ui.draggable.hasClass('external-event')) return false;

          // drag from inner tags          
          var range = calculateHoverIndex(ui);
//          var allDays = $(this).find('.day') ;                  
//          var hoverColumns = $(allDays).slice(range.start, range.end);
//          var str = $(hoverColumns).first().data('date') + "--" + $(hoverColumns).last().data('date') 
          
          $(ui.draggable).css('left', gridWidth * range.start);
                            
          return false;
        }
                
        var clone  = $('#tag-clone').clone();        
        $(clone).find('.event .title').text(text);
        $(clone).find('div.event').css('left', left + "%");
        $(clone).attr('id', '').appendTo($(monthRow).find('.events')).show();    
        $("<div class='spacer'></div>").appendTo($(monthRow).find('.events'));
        $(ui.draggable).draggable('disable');
        $(monthRow).removeClass('no-events').addClass('has-events');
              
      }
  
    }
  });
})  