let timeBlockFormat = "h:mm A";               // Time block format style

var dayStartTime = dayjs("09:00", "HH:mm");   // Start of work day
var dayEndTime = dayjs("20:00", "HH:mm");     // End of work day
var interval = 60;                            // For calculating intervals, default is 60 minutes


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

function displayDate(){
  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
}

function setCurrentTime(){
  currentDay = dayjs();
}

function setRows(textAreaEl){
  if(interval === 60){
    textAreaEl.attr('rows', '3');
  } else if(interval >= 30 && interval < 60) {
    textAreaEl.attr('rows', '2');
  } else {
    textAreaEl.attr('rows', '1');
  }

}

function setPastPresentFuture(intervalStart, pastPresentFutureEl){
  if( dayjs().isBefore(intervalStart) ){
    pastPresentFutureEl.addClass("future");

  } else if (dayjs().isSameOrAfter(dayjs(intervalStart.add(interval, 'm')))) {
    pastPresentFutureEl.addClass("past");

  } else {
    pastPresentFutureEl.addClass("present");
  }
}

function getSchedulerTimeBlock(intervalStart){
  var timeBlockEl = $('<div>').addClass("row time-block");
  var timeDivEl = $('<div>').addClass("col-2 col-md-1 hour text-center py-3").text(intervalStart.format(timeBlockFormat));
  var textareaEl = $('<textarea>').addClass("col-8 col-md-10 description");
  var buttonDiv = $('<button>').addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  var saveIcon = $('<i>').addClass("fas fa-save").attr("aria-hidden", "true");

  setPastPresentFuture(intervalStart, timeBlockEl);
  setRows(textareaEl);
  
  // create data reference to textarea ID
  textareaEl.attr('id', 'hour-' + intervalStart.format('hhmm'));
  buttonDiv.attr('data-hour', intervalStart.format('hhmm'));

  buttonDiv.append(saveIcon);
  timeBlockEl.append(timeDivEl);
  timeBlockEl.append(textareaEl);
  timeBlockEl.append(buttonDiv);

  return timeBlockEl;
}

function setScheduleView(){
  var intervalStart = dayjs(dayStartTime);
  
  setCurrentTime();
  while(!(intervalStart.diff(dayEndTime, 'm') === 0)){
    var timeBlockEl = getSchedulerTimeBlock(intervalStart);

    $('#scheduler-view').append(timeBlockEl);
    intervalStart = dayjs(intervalStart.add(interval, 'm'));
  }
  
}

displayDate();
