// Get the current date
const currentDate = new Date();

// Get the day of the week and month as strings
const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
const month = currentDate.toLocaleString('default', { month: 'long' });

// Get the day of the month as a number
const dayOfMonth = currentDate.getDate();

// Set the text content of the h2 element
const currentDayElement = document.getElementById('currentDay');
currentDayElement.textContent = `${dayOfWeek}, ${month} ${dayOfMonth}`;

// Below function will update start and end times based on user input
document.getElementById("hours-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    openTime = document.getElementById("open-time").value; 
    closeTime = document.getElementById("close-time").value; 

    // On update submit, run makeSchedule function
    makeSchedule();
  });

  // Function to generate the page elements based on start and end time
function makeSchedule() {
    var userEnteredTasks = []; // Create an array to store the saved data for each hour
    for(var i = 0; i < 24; i++){ // Loops through all hours!
      userEnteredTasks.push(""); // Initialize the saved data for each hour to an empty string
    }
  
    var storageData = JSON.parse(localStorage.getItem("hourlyTasks")); // Get saved data from local storage
  
    if(storageData){ // If saved data exists
      userEnteredTasks = storageData; // Use the saved data instead of initializing to empty strings
    }
  
    $(".container").empty(); // Clear any existing page elements
  
    // Get the current hour in 24-hour format
    const currentHour = luxon.DateTime.now().hour;
  
    // Loop through each hour in slected range and make task elements
    for(var i = openTime; i < closeTime; i++){
      const currentDate = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_FULL); // Get the current date
      const dateTitle = $(".current-date").text(currentDate); // Set the date in the header
      const hourClass = (i < currentHour) ? 'past' : (i > currentHour ? 'future' : 'present'); // Determine if the row is in the past, present, or future
  
      // Create the HTML code for a single row with the hour, text area for input, and save button
      const row = `<div class='row time-block ${hourClass}' id='${i}'>
                    <div class='hour col-1'>${luxon.DateTime.fromObject({hour: i}).toLocaleString(luxon.DateTime.TIME_SIMPLE)}</div>
                    <textarea class='description col-10' id='input' data-id='${i}'>${userEnteredTasks[i]}</textarea>
                    <button class='btn saveBtn col-1' data-id='${i}'>Save</button>
                  </div>`;
  
      $(".container").append(row); // Adds row!
    }
  
    setCurrentHour(); // Changes text area color based on time
  }

makeSchedule();