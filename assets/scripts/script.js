let timeBlockFormat = "h:mm A";               // Time block format style

// Default values
var dayStartTime = dayjs("09:00", "HH:mm");   // Start of work day
var dayEndTime = dayjs("18:00", "HH:mm");     // End of work day
var interval = 60;                            // For calculating intervals, default is 60 minutes


/*********************************************************************************
 * 
 * Function for manually setting start and stop times for the schedule feauture
 * 
 *********************************************************************************/

function loadScheduleStartStop(){
  // set default start if local storage not set
  if( !(localStorage.getItem("startTime")) ){
    setStartTime(dayStartTime.format("HH:mm"));
  
  // else load custom start time
  } else {
    setStartTime(localStorage.getItem("startTime"));
  }
   
  // set default end if local storage not set
  if( !(localStorage.getItem("endTime")) ){
    setEndTime(dayEndTime.format("HH:mm"));
  
  // else load custom end time
  } else {
    setEndTime(localStorage.getItem("endTime"));
  }
  clearSchedule();
  setScheduleView();
}

function setStartTime(timeStr){
  if( isValidTimeFormat(timeStr) ){
    var endTime = localStorage.getItem("endTime");
    
    // Validate start is before end
    if( endTime ){
      if( dayjs(timeStr, "HH:mm").isBefore(dayjs(endTime, "HH:mm")) ){
        localStorage.setItem("startTime", timeStr);
        dayStartTime = dayjs(timeStr, "HH:mm");
        return true;

      } else {
        console.log("Start time must be before end time");
        return false;
      }

    } else {
      // assume localstorage not set and set it
      localStorage.setItem("startTime", timeStr);
      dayStartTime = dayjs(timeStr, "HH:mm");
      return true;
    }
  }
  // Invalid time format, return false
  console.log("Times must be in 24 hour format with midnight starting at 00:00");
  return false;
}

function setEndTime(timeStr){
  if( isValidTimeFormat(timeStr) ){
    var startTime = localStorage.getItem("startTime");
    
    // Validate end is after start
    if( startTime ){
      if( dayjs(timeStr, "HH:mm").isAfter(dayjs(startTime, "HH:mm")) ){
        localStorage.setItem("endTime", timeStr);
        dayEndTime = dayjs(timeStr, "HH:mm");
        return true;

      } else {
        console.log("End time must be after start time");
        return false;
      }

    } else {
      // assume localstorage not set and set it
      localStorage.setItem("endTime", timeStr);
      dayEndTime = dayjs(timeStr, "HH:mm");
      return true;
    }
  }
  // Invalid time format, return false
  console.log("Times must be in 24 hour format with midnight starting at 00:00");
  return false;
}

function isValidTimeFormat(timeStr){
  let timePattern = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  return timePattern.test(timeStr);
}


/*********************************************************************************
 * 
 * Function for manually setting time block intervals
 * 
 *********************************************************************************/

function loadInterval(){
  // if interval is not set in local storage, set default
  if( !(localStorage.getItem("interval")) ){
    setInterval(interval);
  } else {
  // set localStorage value
    setInterval(localStorage.getItem("interval"));
  }
}

function setInterval(inter){
  if( !isNaN(parseInt(inter)) && isValidInterval(parseInt(inter)) ){
    interval = parseInt(inter);
    localStorage.setItem("interval", interval);
    clearSchedule();
    setScheduleView();

    return true;
  } else {

    console.log("Your interval must be less than or equal to, and evenly divide 60");
    return false;
  }
}

function isValidInterval(inter){
  if( inter > 60 ){
    return false;
  }
  if( (60 % inter) > 0 ){
    return false;
  }
  return true;
}


/*********************************************************************************
 * 
 * Core functions for web app features
 * 
 *********************************************************************************/

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

function setScheduleView(){
  var intervalStart = dayjs(dayStartTime);
  
  while(!(intervalStart.diff(dayEndTime, 'm') === 0)){
    var timeBlockEl = getSchedulerTimeBlock(intervalStart);

    $('#scheduler-view').append(timeBlockEl);
    intervalStart = dayjs(intervalStart.add(interval, 'm'));
  }
  
}

// Adds an event listener to the button
function setBtnEventListener(btn){
  btn.on('click', function(event){
    var storeId = getStoreId(dayjs(dayjs().format("YYYY-MM-DD") + " " + $(event.currentTarget).siblings('textarea').parent().attr('id').slice(-4), "YYYY-MM-DD HHmm"));
    var textStr = $(event.currentTarget).siblings('textarea').val().trim();
  
    if( textStr.length > 0 ) {
      localStorage.setItem(storeId, textStr);
    } else {
      localStorage.removeItem(storeId);
    }
  });
}

// unique ID for storing records.
// Equals interval timestamp + interval length [ 'YYYYMMDDHHmmss-60' ]
// ex. 202301071200-60
function getStoreId(intervalTimeStamp){
  return intervalTimeStamp.format("YYYYMMDDHHmm") + '-' + interval
}

function getSchedulerTimeBlock(intervalStart){
  var timeBlockEl = $('<div>').addClass("row time-block");
  var timeDivEl = $('<div>').addClass("col-2 col-md-1 hour text-center py-3").text(intervalStart.format(timeBlockFormat));
  var textareaEl = $('<textarea>').addClass("col-8 col-md-10 description");
  var buttonDiv = $('<button>').addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  var saveIcon = $('<i>').addClass("fas fa-save").attr("aria-hidden", "true");
  var str = getStoreId(intervalStart);

  setPastPresentFuture(intervalStart, timeBlockEl);
  setRows(textareaEl);
  
  // create data reference to textarea ID
  timeBlockEl.attr('id', 'hour-' + intervalStart.format('HHmm'));
  buttonDiv.attr('data-hour', intervalStart.format('HHmm'));

  if( localStorage.getItem(str) ){
    textareaEl.val(localStorage.getItem(str));
  }

  setBtnEventListener(buttonDiv);
  buttonDiv.append(saveIcon);
  timeBlockEl.append(timeDivEl);
  timeBlockEl.append(textareaEl);
  timeBlockEl.append(buttonDiv);

  return timeBlockEl;
}

function clearSchedule(){
  $('#scheduler-view').html("");
}

function displayDate(){
  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
}

$(function () {
  displayDate();
  loadScheduleStartStop();
  loadInterval();
  clearSchedule();
  setScheduleView();
});
