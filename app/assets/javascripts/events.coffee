$(document).ready ->  
  $('#calendar').fullCalendar 
   editable: true,  
   updateEvent = (the_event) ->  
  $.ajax
   url:"/events" + the_event.id,  
   event:  
    title: the_event.title,  
    starts_at: "" + the_event.start,  
    ends_at: "" + the_event.end,  
    description: the_event.description 

# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
