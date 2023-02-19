// grabs date
const currentDate = new Date();

// grabs week days and month in string form
const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
const month = currentDate.toLocaleString('default', { month: 'long' });

// grab day
const dayOfMonth = currentDate.getDate();

// set the text content of the h2 element
const currentDayElement = document.getElementById('currentDay');
currentDayElement.textContent = `${dayOfWeek}, ${month} ${dayOfMonth}`;

// get open and close times
const openTimeElement = document.getElementById("open-time");
const closeTimeElement = document.getElementById("close-time");

let openTime = openTimeElement.value;
let closeTime = closeTimeElement.value;

// set event listener to update schedule on form submit
document.getElementById("hours-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // get input values
    openTime = openTimeElement.value;
    closeTime = closeTimeElement.value;

    // on update hour submit, run makeSchedule function
    makeSchedule();
});

// function to generate the page elements based on start and end time
function makeSchedule() {
  const userEnteredTasks = JSON.parse(localStorage.getItem('hourlyTasks')) || [];

  $(".container").empty(); // Clear any existing page elements

// Get the current date, set it in the header, and get current hour in 24-hour format
  const currentHour = luxon.DateTime.now().hour;
  const currentDate = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_FULL);
  const dateTitle = $(".current-date").text(currentDate);
  
  // Loop through each hour in selected range and make task elements
  for(let i = openTime; i < closeTime; i++){
    const hourClass = (i < currentHour) ? 'past' : (i > currentHour ? 'future' : 'present'); // Determine if the row is in the past, present, or future
  
    // Create the HTML code for a single row with the hour, text area for input, and save button
    const row = `<div class='row time-block ${hourClass}' id='${i}'>
    <div class='hour col-1'>${luxon.DateTime.fromObject({hour: i}).toLocaleString(luxon.DateTime.TIME_SIMPLE)}</div>
    <textarea class='description col-10' id='input-${i}' data-id='${i}'>${userEnteredTasks[i] ? userEnteredTasks[i] : ''}</textarea>
    <button class='btn saveBtn col-1' data-id='${i}'>SAVE</button>
    </div>`;
  
    $(".container").append(row); // Adds row!
  }

  // Save user-entered tasks to local storage on button click
  $(".saveBtn").click(function() {
    const taskId = $(this).attr("data-id");
    const taskText = $(`#input-${taskId}`).val();
    userEnteredTasks[taskId] = taskText;
    localStorage.setItem('hourlyTasks', JSON.stringify(userEnteredTasks));
  });
}

//call current hour function
setCurrentHour();

// function to set the current hour textarea to 'present'
function setCurrentHour() {
  const currentHour = luxon.DateTime.now().hour;
  const currentHourTextArea = $(`#input-${currentHour}`);
  if(currentHourTextArea.length > 0) {
    currentHourTextArea.parent().removeClass('past').removeClass('future').addClass('present');
  }
}

makeSchedule();
