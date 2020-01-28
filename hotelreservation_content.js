"use strict";

function generateReservationTemplate(apartment) { //create a template for all the rooms on the page
    return '' +
        '<div class="hotel--reservation_room">' +
            '<img src="' + apartment.imageURL + '" alt="Hotel_room">' +
            '<p class="milano_queen_room">' + apartment.name + '</p>' +
            '<p class="room_description">' + apartment.description + '</p>' +
            '<p class="guests_number">Number of guests: ' + apartment.guests + '</p>' +
            '<p class="rooms_number">Number of rooms: ' + apartment.rooms + '</p>' +
            (areFilterDatesInvalid()
                ? '<button class="hotel--reserve_room" disabled>Choose dates</button>'
                : (isReserved(apartment)
                    ? '<button class="hotel--reserve_room" disabled>Not Available</button>'
                    : '<button class="hotel--reserve_room" onclick="openReservationPopUp(' + apartment.id + ')">Reserve now</button>')) + //disable button if the room is reserved
        '</div>';
}

function areFilterDatesInvalid() {
    return filterStartDate.value >= filterEndDate.value;
}

document.getElementById('start_date').valueAsDate = new Date(); //set filter start reservation date to today

function isReserved(apartment) { //check if the room is available on the selected dates
    return (apartment.reservedDates || []).some(function(date) {
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

//Client pagination
var allApartments = []; //create array for all the rooms
var matchedSearchReservations = []; //array for rooms with filter applied
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
    drawList(); // draw out rooms
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
var filtersForm = document.querySelector('#filters'); //select form from HTML

filtersForm.oninput = function () { //update list of rooms when change filter
    updateMatchedSearchReservations();
    updateNumberOfPages();
    updatePage(1);
    loadList();
};

filtersForm.onsubmit = function(event) { //prevent page refresh
    event.preventDefault();
};

function updateMatchedSearchReservations() { //update rooms that are matched to the filter
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); //filter Checkbox - by room name
    matchedSearchReservations = checkboxes.length ? [] : allApartments; //return initial room array if nothing selected

    for (var i = 0; i < checkboxes.length; i++) {
        matchedSearchReservations = matchedSearchReservations.concat(allApartments.filter(function (apartment) {
            return apartment.name === checkboxes[i].value;
        }));
    }

    var selectedOption = document.querySelector('#guests_number').selectedIndex; //filter Select - by number of guests

    if (selectedOption) {
        matchedSearchReservations = matchedSearchReservations.filter(function (apartment) {
            return apartment.guests === selectedOption;
        });
    }


    var checkedRadioButton = document.querySelector('input[type=radio]:checked'); //filter Radio - by number of rooms

    if (checkedRadioButton) {
        matchedSearchReservations = matchedSearchReservations.filter(function (apartment) {
            return apartment.rooms === +checkedRadioButton.value;
        });
    }

    var search = document.querySelector('#search').value.toUpperCase(); //filter search - by room name or description

    matchedSearchReservations = matchedSearchReservations.filter(function (apartment) {
        return apartment.name.toUpperCase().indexOf(search) > -1 || apartment.description.toUpperCase().indexOf(search) > -1;
    });
}

function updateReservationsJSON(method, body) { //get JSON file with the apartments or put reservation dates to JSON
    var http = new XMLHttpRequest();
    http.open(method, 'https://api.myjson.com/bins/w5xj0');
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //добавление заголовков пользователя

    http.onreadystatechange = function () {
        if(http.readyState === 4) {
            allApartments = JSON.parse(http.responseText);
            updateMatchedSearchReservations();
            updateNumberOfPages();
            loadList();
        }
    };
    http.send(body); //отправка запроса
}
updateReservationsJSON('get');

//pop-up window
var popUpElement = document.querySelector('#pop-up');
var reservationStartDate = document.querySelector('.reservation_start_date');
var filterStartDate = document.querySelector('#start_date');
var reservationEndDate = document.querySelector('.reservation_end_date');
var filterEndDate = document.querySelector('#end_date');
var activeApartment;

function openReservationPopUp(id) {
    activeApartment = allApartments.filter(function(apartment) {
        return apartment.id === id;
    })[0];

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
    if (!activeApartment) {
        return;
    }

    if (!activeApartment.reservedDates) {
        activeApartment.reservedDates = [];
    }

    var name = document.querySelector('#guest_name').value;
    var surname = document.querySelector('#guest_surname').value;
    var phone = document.querySelector('#guest_phone').value;
    var startDate = filterStartDate.value;
    var endDate = filterEndDate.value;

    var guestReservation = {
        name: name,
        surname: surname,
        phone: phone,
        startDate: startDate,
        endDate: endDate
    };

    activeApartment.reservedDates.push(guestReservation);
    updateReservationsJSON('put', JSON.stringify(allApartments));
    closePopUp();
}