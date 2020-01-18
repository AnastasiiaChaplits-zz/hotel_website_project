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

var reservations = [
    {
        imageURL: "Images/reservation%20page/reservation_room1.jpg",
        name: "Milano Queen",
        description: "123In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 1,
        rooms: 1
    },
    {
        imageURL: "Images/reservation%20page/reservation_room2.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 5,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room3.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 3,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room4.jpg",
        name: "Lexington Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 2,
        rooms: 2
    },
    {
        imageURL: "Images/reservation%20page/reservation_room5.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 6,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room6.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 3,
        rooms: 1
    },
    {
        imageURL: "Images/reservation%20page/reservation_room7.jpg",
        name: "Park View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 4,
        rooms: 2
    },
    {
        imageURL: "Images/reservation%20page/reservation_room8.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 2,
        rooms: 1
    },
    {
        imageURL: "Images/reservation%20page/reservation_room9.jpg",
        name: "Lexington Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 1,
        rooms: 1
    },
    {
        imageURL: "Images/reservation%20page/reservation_room10.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 6,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room11.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 3,
        rooms: 1,
        reservedDates: [
            {
                startDate: '2020-01-08',
                endDate: '2020-01-28'
            }
        ]
    },
    {
        imageURL: "Images/reservation%20page/reservation_room12.jpg",
        name: "Park View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 4,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room1.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 2,
        rooms: 2
    },
    {
        imageURL: "Images/reservation%20page/reservation_room1.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 6,
        rooms: 2
    },
    {
        imageURL: "Images/reservation%20page/reservation_room12.jpg",
        name: "Park View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 2,
        rooms: 1
    },
    {
        imageURL: "Images/reservation%20page/reservation_room3.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 5,
        rooms: 3
    },
    {
        imageURL: "Images/reservation%20page/reservation_room2.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: 3,
        rooms: 2
    }
    ];

var matchedSearchReservations = reservations.slice();
// global JavaScript variables

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

updateNumberOfPages();
loadList();
