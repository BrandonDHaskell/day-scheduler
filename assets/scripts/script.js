let currentDay = dayjs();
var intervalId = 0;



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function setDate(){
  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
}

setDate();

function getSchedulerTimeBlock(interval){
  var timeBlockEl = $('<div>');
  var timeDivEl = $('<div>');
  var textareaEl = $('<textarea>');
  var buttonDiv = $('<button>');
  var saveIcon = $('<i>');

  saveIcon.addClass("fas fa-save").attr("aria-hidden", "true");
  buttonDiv.addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  textareaEl.addClass("col-8 col-md-10 description").attr("rows", "3");
  timeDivEl.addClass("col-2 col-md-1 hour text-center py-3").text(interval);
  timeBlockEl.addClass("row time-block past");
  
  buttonDiv.append(saveIcon);

  timeBlockEl.append(timeDivEl);
  timeBlockEl.append(textareaEl);
  timeBlockEl.append(buttonDiv);

  return timeBlockEl;
}

function setScheduleView(){
  for(var i = 0; i < 6; i++){
    var timeBlockEl = getSchedulerTimeBlock(i + "AM");
    $('#scheduler-view').append(timeBlockEl);
  }
  
}

// console.log(dayjs.format());