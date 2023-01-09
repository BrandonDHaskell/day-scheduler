# Daily Scheduler!

Welcome to Daily Scheduler!  Feel free to try it out at the deployed site below.  You can enter in your daily schedule for the current day and track your progress.  

Track your schedule with Daily Scheduler!

See the [Deployed Site](https://bhaskell7901.github.io/day-scheduler/)


## Table of Contents

1. [Technology Used](#technology-used)
2. [Overview and Strategies](#overview-and-strategies)
3. [Unique IDs for HTML Elements](#unique-ids-for-html-elements)
4. [Time Block Storage IDs](#time-block-storage-ids)
5. [Additional Features](#additional-features)
6. [Usage](#usage)
7. [Learning Points](#learning-points)
8. [Author Info](#author-info)
9. [License](#license)


## Technology Used 

| Technology | Resource URL | 
| ------------- | ------------- | 
| HTML | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
| CSS | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| Git | [https://git-scm.com/](https://git-scm.com/) |  
| JQuery | [https://jquery.com/](https://jquery.com/) |
| Day.js | [https://day.js.org/](https://day.js.org/) |


## Overview and Strategies

A general overview of the Daily Scheduler flow is:
1. Load the page
1. Update the page date with the current day
1. Generate time blocks to the page (time blocks contain a time interval, text input, and a save button)
1. An event can be entered into the text box
1. The event can be save by clicking the save button
1. When the page loads again, recored schedule events are populated in the appropriate time blocks

The Daily Scheduler is a static web page that uses ```localstorage``` to persist data on the page.  To save the 

The Quiz Time project uses a static webpage that is updated using JavaScript and JQuery executions.  The ```viewscreen``` element is updated with new HTML to change between the Welcome view, the Quiz view, the Score Entry view, and the High Score view based on user input.  *See the wireframe image below*.


## Unique IDs for HTML Elements

Each time block has an ```id``` attribute that uniquely identifies it.  The ID is generated from the interval of the time block using ```Day.js```.  For the element ```id``` attribute, I used the format ```HHmm``` and pre-pended ```hour-``` to it to make a unique ```id``` attribute for each time block. The unique IDs are used to determine the interval to record the schedule event in ```localStorage```.


## Time Block Storage IDs

For storing recorded scheduled events, I chose to handle each record individually.  Alterenatively, a schedule object could be used that contains every schedule record, but data could potentially be lost on a page refresh.  Additionally, if the object got too large from weeks or months of calendar use, pushing and pulling a large object in and out of ```localStorage``` could become a large overhead for the page.  For these reasons, I opted to record each record individually using a unique record ID for the day and the interval being recorded.  The unique ID follows the format below:

```text
ID format:  "YYYYMMDDHHmm-t"
Example ID: "202301071300-60"

where
"YYYYMMDD"  represents the schedule date
"HHmm"      represents a 24hr time interval
"t"         represents a time interval in time in minutes

```
Using this naming convention for IDs ensures that each storage location in ```localStorage``` is unique and will not be overriden by another record.  It also makes it easy to generate an ID on the fly to pull data for loading on the page.

Appending the interval is a future proof measure for now.  I'm looking to add a feature that will allow a user to change the interval from 1 hour to some fraction of an hour if they would like to.  Appending the interval ensures their are no collisions if a user swithces between intervals within the same day.


## Bonus Features

* Update Intervals to some fraction of an hour - (Complete: [Issue#6](https://github.com/bhaskell7901/day-scheduler/issues/6) )
* Manually set Workday Start/Stop Times - (Complete: [Issue#14](https://github.com/bhaskell7901/day-scheduler/issues/13) )
* Allow manual date changes - (Pending: [Issue#7](https://github.com/bhaskell7901/day-scheduler/issues/7) )
* Add a Light/Dark Theme Changer for the page - (Pending: [Issue#13](https://github.com/bhaskell7901/day-scheduler/issues/13) )


## Usage

To use Quiz Time, just navigate to the [Live Site](https://bhaskell7901.github.io/quiz-time/).  Once the page loads, click on a schedule block to enter an event.  Click the save button to save the event.

You can use the console to update the schedule interval to some even fraction of and hour represented in minutes.  Run the code below in console to test it out.

```javascript
setInterval(30)
```

You can also use the console to update the start and end for the workday.  Use the ```setStartTime()``` or ```setEndTime()``` functions to update the schdeule.  The use the ```loadScheduleStartStop()``` function to push the udates to the page.

For example, executing the following, will update the page to start at 5:00 AM and end at 8:00 PM.

```javascript
setStartTime("05:00");
setStartTime("20:00");
loadScheduleStartStop();
```


## Learning Points 

I also learned about the ```Day.js``` library and how to load plugins from the web page.  This is a very flexible library that can grow and shrink to meet project needs.  I love it and it's definitiley going into my list of libraries to use.

For this project, I wanted to try out the Project feature in GitHub for tracking this project and future ones.  I'm still getting used to it, but it has helped me to better breakdown the projects and track progress/updates.

**Proejct View Snapshot**

![image of project view in GitHub](https://github.com/bhaskell7901/day-scheduler/blob/main/assets/images/day-scheduler-github-project.png))



## Author Info

### Brandon Haskell

* [LinkedIn](https://www.linkedin.com/in/BrandonDHaskell)
* [Github](https://github.com/bhaskell7901)

## License

MIT License