//Client pagination
"use strict";

function generateReservationTemplate(reservation) {
    return '' +
        '<div class="hotel--reservation_room">' +
        '<img src="' + reservation.imageURL + '" alt="Hotel_room">' +
        '<p class="milano_queen_room">' + reservation.name + '</p>' +
        '<p class="room_description">' + reservation.description + '</p>' +
        '<p class="hotel--reserve_room">Reserve now</p>' +
        '</div>';
}

var reservations = [{
    imageURL: "Images/reservation%20page/reservation_room1.jpg",
    name: "Milano Queen",
    description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
    guests: "one"
},
    {
        imageURL: "Images/reservation%20page/reservation_room2.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "five"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room3.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "three"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room4.jpg",
        name: "Lexington Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "two"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room5.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "six"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room6.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "three"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room7.jpg",
        name: "Park View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "four"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room8.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "two"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room9.jpg",
        name: "Lexington Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "one"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room10.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "six"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room11.jpg",
        name: "Milano Queen",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "three"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room12.jpg",
        name: "MPark View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "four"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room1.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "two"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room1.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "six"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room12.jpg",
        name: "MPark View Premier King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "two"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room3.jpg",
        name: "Milano Double",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "five"
    },
    {
        imageURL: "Images/reservation%20page/reservation_room2.jpg",
        name: "Lexington King",
        description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel.",
        guests: "three"
    }];

var matchedSearchReservations = reservations.slice();
// global JavaScript variables

var pageList = new Array();
var currentPage = 1;
var numberPerPage = 12;
var numberOfPages = 0;   // calculates the total number of pages

//calculate number of pages

function getNumberOfPages() {
    return Math.ceil(matchedSearchReservations.length / numberPerPage);
}

numberOfPages = getNumberOfPages();

//next page button
function nextPage() {
    currentPage += 1;
    loadList();
}

//previous page button
function previousPage() {
    currentPage -= 1;
    loadList();
}

//first page button
function firstPage() {
    currentPage = 1;
    loadList();
}


//load current list
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = matchedSearchReservations.slice(begin, end);
    drawList(); // draws out our data
    window.scrollTo(0, 0);
    check();         // determines the states of the pagination buttons
}

function drawList() {
    document.querySelector('#rooms').innerHTML = " ";
    for (var r = 0; r < pageList.length; r++) {
        document.querySelector('#rooms').innerHTML = pageList.map(generateReservationTemplate).join("");
    }
}

function check() {
    document.getElementById("next").disabled = currentPage === numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage === 1 ? true : false;
    document.getElementById("first").disabled = currentPage === 1 ? true : false;
}

    loadList();


//filter on the page

var filtersForm = document.forms.filters; //selected forms from HTML

filtersForm.onchange = function() {
    matchedSearchReservations = [];

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); //checkbox
    matchedSearchReservations = checkboxes.length ? [] : reservations;

    for (var i = 0; i < checkboxes.length; i++) {
        matchedSearchReservations = matchedSearchReservations.concat(reservations.filter(function (reservation) {
            var checkbox = checkboxes[i];
            return reservation[checkbox.name] === checkbox.value;
        }))
    }

    var selectedOption = document.querySelector('#guests_number').selectedIndex;
    var guests = document.querySelector('#guests_number').options;

    matchedSearchReservations = matchedSearchReservations.filter(function (reservation) {
        return reservation.guests === guests[selectedOption].value;
    });
    console.log(matchedSearchReservations);

    numberOfPages = getNumberOfPages();
    loadList();

};




//filter on the page - date
/*
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

document.getElementById('start_date').value = new Date().toDateInputValue();*/