//Client pagination
"use strict";

function generateReservationTemplate(room) { //create a template for all the rooms on the page
    return '' +
        '<div class="hotel--reservation_room">' +
            '<img src="' + room.imageURL + '" alt="Hotel_room">' +
            '<p class="milano_queen_room">' + room.name + '</p>' +
            '<p class="room_description">' + room.description + '</p>' +
            '<p class="guests_number">Number of guests: ' + room.guests + '</p>' +
            '<p class="rooms_number">Number of rooms: ' + room.rooms + '</p>' +
            ((filterStartDate.value > filterEndDate.value)
                ? '<button class="hotel--reserve_room" disabled>Choose dates</button>'
                : (isReserved(room)
                ? '<button class="hotel--reserve_room" disabled>Not Available</button>'
                : '<button class="hotel--reserve_room" onclick="openReservationPopUp(' + room.id + ')">Reserve now</button>')) + //disable button if the room is reserved
        '</div>';
}

document.getElementById('start_date').valueAsDate = new Date(); //set start date to today

function isReserved(room) { //check if the room is available on the selected dates
    return (room.reservedDates || []).some(function(date) {
        var filterStartDate = Date.parse(document.querySelector('#start_date').value);
        var filterEndDate = Date.parse(document.querySelector('#end_date').value);
        var reservationStartDate = Date.parse(date.startDate);
        var reservationEndDate = Date.parse(date.endDate);

            return (
                filterStartDate >= reservationStartDate && filterStartDate <= reservationEndDate
            ) || (
                filterEndDate >= reservationStartDate && filterEndDate <= reservationEndDate
            ) || (
                filterStartDate <= reservationStartDate && filterEndDate >= reservationEndDate
            );

    });
}

// global JavaScript variables
var rooms = []; //create array for all the rooms
var matchedSearchReservations = []; //array for rooms after filter
var pageList = []; //rooms on the page
var currentPage = 1;
var numberPerPage = 12;
var numberOfPages = 0;   // calculates the total number of pages

//calculate number of pages

function updateNumberOfPages() {
    numberOfPages = Math.ceil(matchedSearchReservations.length / numberPerPage) || 1;
}

function updatePage(pageNumber) {
    currentPage = pageNumber;
    loadList();
    window.scrollTo(0, 0);
}

//load current list of rooms
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = matchedSearchReservations.slice(begin, end);
    drawList(); // draws out rooms
    updatePaginator();         // determines the states of the pagination buttons
}

function drawList() { //create template for every room and add on the page
    document.querySelector('#rooms').innerHTML = pageList.map(generateReservationTemplate).join("");
}

function updatePaginator() { //states of the pagination buttons
    document.getElementById("next").disabled = currentPage === numberOfPages;
    document.getElementById("previous").disabled = currentPage === 1;
    document.getElementById("first").disabled = currentPage === 1;
}

//filter on the page
var filtersForm = document.forms.filters; //select form from HTML

filtersForm.oninput = function () { //update list of rooms when change filter
    updateMatchedSearchReservations();
    updateNumberOfPages();
    updatePage(1);
    loadList();
};

function updateMatchedSearchReservations() { //update rooms that are matched to the filter
    matchedSearchReservations = [];

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); //filter Checkbox - by room name
    matchedSearchReservations = checkboxes.length ? [] : rooms; //return initial room array if nothing selected

    for (var i = 0; i < checkboxes.length; i++) {
        matchedSearchReservations = matchedSearchReservations.concat(rooms.filter(function (room) {
            var checkbox = checkboxes[i];
            return room.name === checkbox.value;
        }));
    }

    var selectedOption = document.querySelector('#guests_number').selectedIndex; //filter Select - by number of guests

    if (selectedOption) {
        matchedSearchReservations = matchedSearchReservations.filter(function (room) {
            return room.guests === selectedOption;
        });
    }


    var checkedRadioButton = document.querySelector('input[type=radio]:checked'); //filter Radio - by number of rooms

    if (checkedRadioButton) {
        matchedSearchReservations = matchedSearchReservations.filter(function (room) {
            return room.rooms === +checkedRadioButton.value;
        });
    }

    var filter = document.querySelector('#search').value.toUpperCase(); //filter search - by room name or description

    matchedSearchReservations = matchedSearchReservations.filter(function (room) {
        return room.name.toUpperCase().includes(filter) || room.description.toUpperCase().includes(filter);
    });
}

function updateReservationsJSON(method, body) { //get JSON file with the rooms
    var http = new XMLHttpRequest();
    http.open(method, 'https://api.myjson.com/bins/w5xj0');
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    http.onreadystatechange = function () {
        if(http.readyState === 4) {
            rooms = JSON.parse(http.responseText);
            matchedSearchReservations = rooms.slice();
            updateNumberOfPages();
            loadList();
        }
    };
    http.send(body); //отправка запроса
};
updateReservationsJSON('get');

//pop-up window
var popUpElement = document.querySelector('#pop-up');
var reservationStartDate = document.querySelector('.reservation_start_date');
var filterStartDate = document.querySelector('#start_date');
var reservationEndDate = document.querySelector('.reservation_end_date');
var filterEndDate = document.querySelector('#end_date');
var activeRoom;

function openReservationPopUp(id) {
    activeRoom = rooms.find(function(room) {
        return room.id === id;
    });
    popUpElement.style.visibility = 'visible';
    popUpElement.style.opacity = '1';
    popUpElement.style.transition = 'visibility 0s, opacity 0.5s linear';
    reservationStartDate.innerHTML = filterStartDate.value;
    reservationEndDate.innerHTML = filterEndDate.value;
}

function closePopUp() {
    popUpElement.style.visibility = 'hidden';
    popUpElement.style.opacity = '0';
    popUpElement.style.transition = 'visibility 0.5s, opacity 0.5s linear';
}

function reserveRoom() {
    if (!activeRoom) {
        return;
    }

    if (!activeRoom.reservedDates) {
        activeRoom.reservedDates = [];
    }

    var name = document.querySelector('#guest_name').value;
    var surname = document.querySelector('#guest_surname').value;
    var phone = document.querySelector('#guest_phone').value;
    var startDate = filterStartDate.value;
    var endDate = filterEndDate.value;

    var guestReservation = {
        name, surname, phone, startDate, endDate
    };

    activeRoom.reservedDates.push(guestReservation);
    updateReservationsJSON('put', JSON.stringify(rooms));
    closePopUp();
}