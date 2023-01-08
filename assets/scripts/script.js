let timeBlockFormat = "h:mm A";               // Time block format style

var dayStartTime = dayjs("09:00", "HH:mm");   // Start of work day
var dayEndTime = dayjs("18:00", "HH:mm");     // End of work day
var interval = 60;                            // For calculating intervals, default is 60 minutes


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

function setScheduleView(){
  var intervalStart = dayjs(dayStartTime);
  
  setCurrentTime();
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


function displayDate(){
  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
}

$(function () {
  displayDate();
  setScheduleView();
});
