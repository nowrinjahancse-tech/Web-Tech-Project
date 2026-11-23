// Event information
var events = [
    {
        id: 1,
        name: "Programming Contest",
        category: "Competition",
        date: "2026-12-05",
        location: "Computer Lab",
        description: "Join a programming competition and show your coding skills."
    },
    {
        id: 2,
        name: "Cultural Festival",
        category: "Cultural",
        date: "2026-12-10",
        location: "University Auditorium",
        description: "Enjoy music, dance and different cultural activities."
    },
    {
        id: 3,
        name: "Career Seminar",
        category: "Seminar",
        date: "2026-12-15",
        location: "Room 501",
        description: "Learn about career planning and interview preparation."
    },
    {
        id: 4,
        name: "Project Exhibition",
        category: "Exhibition",
        date: "2026-12-20",
        location: "Main Campus Hall",
        description: "Explore creative projects made by university students."
    }
];

var eventContainer = document.getElementById("eventContainer");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var message = document.getElementById("message");
var registeredEventsList = document.getElementById("registeredEvents");

var registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

// Display events
function showEvents(eventArray) {
    eventContainer.innerHTML = "";

    if (eventArray.length == 0) {
        eventContainer.innerHTML = "<p>No event found.</p>";
    }

    for (var i = 0; i < eventArray.length; i++) {
        var event = eventArray[i];

        var card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML =
            "<h3>" + event.name + "</h3>" +
            "<p><b>Category:</b> " + event.category + "</p>" +
            "<p><b>Date:</b> " + event.date + "</p>" +
            "<p><b>Location:</b> " + event.location + "</p>" +
            "<p>" + event.description + "</p>" +
            "<button onclick='registerEvent(" + event.id + ")'>Register</button>";

        eventContainer.appendChild(card);
    }
}

// Search events
function searchEvents() {
    var searchText = searchInput.value.toLowerCase();
    var result = [];

    for (var i = 0; i < events.length; i++) {
        if (events[i].name.toLowerCase().includes(searchText)) {
            result.push(events[i]);
        }
    }

    showEvents(result);
}

// Register for an event
function registerEvent(eventId) {
    var alreadyRegistered = false;

    for (var i = 0; i < registeredEvents.length; i++) {
        if (registeredEvents[i].id == eventId) {
            alreadyRegistered = true;
        }
    }

    if (alreadyRegistered) {
        message.innerText = "You already registered for this event.";
    } else {
        for (var i = 0; i < events.length; i++) {
            if (events[i].id == eventId) {
                registeredEvents.push(events[i]);
            }
        }

        localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
        message.innerText = "Registration successful!";
    }

    showRegisteredEvents();
}

// Display registered events
function showRegisteredEvents() {
    registeredEventsList.innerHTML = "";

    if (registeredEvents.length == 0) {
        registeredEventsList.innerHTML = "<li>No registered event yet.</li>";
    } else {
        for (var i = 0; i < registeredEvents.length; i++) {
            var item = document.createElement("li");
            item.innerText = registeredEvents[i].name + " - " + registeredEvents[i].date;
            registeredEventsList.appendChild(item);
        }
    }
}

searchBtn.addEventListener("click", searchEvents);

searchInput.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        searchEvents();
    }
});

// Show data when page loads
showEvents(events);
showRegisteredEvents();
