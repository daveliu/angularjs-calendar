'use strict';
var Ginkgo = angular.module('Ginkgo', ['ginkgo.services', 'ginkgo.directives']);

var CalendarCtrl = function ($scope, events) {
  $scope.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
       
  $scope.getNumberOfDaysInMonth = function (dateObject) {
      var month = dateObject.getMonth();
      if (month == 1) {
          var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29;
          if (leapYear)
              return 29
          else
              return 28;
      } else {
          return $scope.daysPerMonth[month];          
      }
  }
  
  $scope.getDadysInMonth = function(dateObject) {
    var result = [];
    var numberOfDays = $scope.getNumberOfDaysInMonth(dateObject);
    for (var i = 0; i < numberOfDays; i++) {
         result.push({
             month: dateObject.getMonth(),              
             day: (i + 1 < 10) ? "0" + (i + 1) : (i + 1)
         });
    }
    return result;     
  }    
  
  $scope.days = $scope.getDadysInMonth(new Date(2013, 6, 1));
  
  $scope.rows = [0,1,2];  
  
  $scope.events = events.events;
    
  var totalDates = $scope.getNumberOfDaysInMonth(new Date(2013, 6, 1));
  var dateWidth = (1 / totalDates) * 100;
  
  $scope.getEventStyle = function(event){        
    var startDay = parseInt(event.startTime.split("-").pop()) - 1;
    var endDay = parseInt(event.endTime.split("-").pop()) - 1;        
    return {left: dateWidth * startDay + "%", width: (endDay - startDay) * dateWidth + "%"};
  }  
  
  var totalWidth =  parseInt($('#calendar').css('width'));  
  var gridWidth = totalWidth / totalDates;

  $scope.calculateHoverIndex =  function(ui){
    var startHoverIndex  =  Math.round((ui.offset.left - $('#calendar').offset().left) / gridWidth) + 1 ;
    var ownerWidth =  parseInt($(ui.helper).css('width'));  

    var widthCount =  Math.round(ownerWidth /  gridWidth) + 1 ;    
    var endHoverIndex = startHoverIndex + widthCount - 1;
  
    return {start: startHoverIndex, end: endHoverIndex};
  }
    
    
  $scope.getEventLength = function(){
    
    for (var i = 0; i < $scope.events.length; i++) {
        event = $scope.events[i];
      
        var eventStyle = $scope.getEventStyle($scope.events[i]);
        $scope.events[i].left = eventStyle.left;
        $scope.events[i].width = eventStyle.width;     
        
        if(event.members != undefined){
          for (var j = 0; j < event.members.length; j++) {
              var membertyle = $scope.getEventStyle(event.members[j]);  
              $scope.events[i].members[j].left = membertyle.left;
              $scope.events[i].members[j].width = membertyle.width;                     
          }             
        }
        
    }
  }     
  
  $scope.getEventLength();  
  
  $scope.addEvent = function (event) {
    var id = events.save({text: event.text, startTime: event.startTime, endTime: event.endTime});
  }
  

}


var TagCtrl = function ($scope, tags) {
  $scope.tags = tags.tags;
    
  $scope.addTag = function () {
    var id = tags.save({text: $scope.tagText, done: false});
    $scope.tagText = '';    
  }
}



