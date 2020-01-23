//Client pagination
"use strict";

function generateReservationTemplate(reservation) {
    return '' +
        '<div class="hotel--reservation_room">' +
            '<img src="' + reservation.imageURL + '" alt="Hotel_room">' +
            '<p class="milano_queen_room">' + reservation.name + '</p>' +
            '<p class="room_description">' + reservation.description + '</p>' +
            (isReserved(reservation) ? '<button class="hotel--reserve_room" disabled>Not Available</button>' : '<button class="hotel--reserve_room">Reserve now</button>') +
        '</div>';
}

function isReserved(reservation) {
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
var reservations = [];
var matchedSearchReservations = [];
var pageList = [];
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

//load current list
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = matchedSearchReservations.slice(begin, end);
    drawList(); // draws out our data
    updatePaginator();         // determines the states of the pagination buttons
}

function drawList() {
    document.querySelector('#rooms').innerHTML = pageList.map(generateReservationTemplate).join("");
}

function updatePaginator() {
    document.getElementById("next").disabled = currentPage === numberOfPages;
    document.getElementById("previous").disabled = currentPage === 1;
    document.getElementById("first").disabled = currentPage === 1;
}

//filter on the page
var filtersForm = document.forms.filters; //selected forms from HTML

filtersForm.oninput = function () {
    updateMatchedSearchReservations();
    updateNumberOfPages();
    updatePage(1);
    loadList();
};

function updateMatchedSearchReservations() {
    matchedSearchReservations = [];

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); //filter Checkbox
    matchedSearchReservations = checkboxes.length ? [] : reservations;

    for (var i = 0; i < checkboxes.length; i++) {
        matchedSearchReservations = matchedSearchReservations.concat(reservations.filter(function (reservation) {
            var checkbox = checkboxes[i];
            return reservation.name === checkbox.value;
        }));
    }

    var selectedOption = document.querySelector('#guests_number').selectedIndex; //filter Select

    if (selectedOption) {
        matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
            return reservation.guests === selectedOption;
        });
    }


    var checkedRadioButton = document.querySelector('input[type=radio]:checked'); //filter Radio

    if (checkedRadioButton) {
        matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
            return reservation.rooms === +checkedRadioButton.value;
        });
    }

    var filter = document.querySelector('#search').value.toUpperCase();

    matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
        return reservation.name.toUpperCase().includes(filter) || reservation.description.toUpperCase().includes(filter);
    });
}

(function () {
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
