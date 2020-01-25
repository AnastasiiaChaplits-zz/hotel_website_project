//Client pagination
"use strict";

function generateReservationTemplate(reservation) { //create a template for all the rooms on the page
    return '' +
        '<div class="hotel--reservation_room">' +
            '<img src="' + reservation.imageURL + '" alt="Hotel_room">' +
            '<p class="milano_queen_room">' + reservation.name + '</p>' +
            '<p class="room_description">' + reservation.description + '</p>' +
            '<p class="guests_number">Number of guests: ' + reservation.guests + '</p>' +
            '<p class="rooms_number">Number of rooms: ' + reservation.rooms + '</p>' +
            (isReserved(reservation) ? '<button class="hotel--reserve_room" disabled>Not Available</button>' : '<button class="hotel--reserve_room" onclick="reserveRoom()">Reserve now</button>') + //disable button if the room is reserved
        '</div>';
}

function isReserved(reservation) { //check if the room is available on the selected dates
    return (reservation.reservedDates || []).some(function(date) {
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
var reservations = []; //create array for all the reservations
var matchedSearchReservations = []; //array for reservations after filter
var pageList = []; //reservations on the page
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
    matchedSearchReservations = checkboxes.length ? [] : reservations; //return initial reservation array if nothing selected

    for (var i = 0; i < checkboxes.length; i++) {
        matchedSearchReservations = matchedSearchReservations.concat(reservations.filter(function (reservation) {
            var checkbox = checkboxes[i];
            return reservation.name === checkbox.value;
        }));
    }

    var selectedOption = document.querySelector('#guests_number').selectedIndex; //filter Select - by number of guests

    if (selectedOption) {
        matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
            return reservation.guests === selectedOption;
        });
    }


    var checkedRadioButton = document.querySelector('input[type=radio]:checked'); //filter Radio - by number of rooms

    if (checkedRadioButton) {
        matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
            return reservation.rooms === +checkedRadioButton.value;
        });
    }

    var filter = document.querySelector('#search').value.toUpperCase(); //filter search - by room name or description

    matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
        return reservation.name.toUpperCase().includes(filter) || reservation.description.toUpperCase().includes(filter);
    });
}

(function () { //get JSON file with the reservations
    var http = new XMLHttpRequest();
    http.open('get', 'https://api.myjson.com/bins/w5xj0');

    http.onreadystatechange = function () {
        if(http.readyState === 4) {
            reservations = JSON.parse(http.responseText);
            matchedSearchReservations = reservations.slice();
            updateNumberOfPages();
            loadList();
        }
    };
    http.send(); //отправка запроса
})();

//pop-up window
var popUp = document.querySelector('#pop-up');
function reserveRoom() {
    popUp.style.visibility = 'visible';
    popUp.style.opacity = '1';
    popUp.style.transition = 'visibility 0s, opacity 0.5s linear';
    document.querySelector('.reservation_start_date').innerHTML = document.querySelector('#start_date').value;
    document.querySelector('.reservation_end_date').innerHTML = document.querySelector('#end_date').value;
}

function closePopUp() {
    popUp.style.visibility = 'hidden';
    popUp.style.opacity = '0';
    popUp.style.transition = 'visibility 0.5s, opacity 0.5s linear';
}