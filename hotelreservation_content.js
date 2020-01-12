function generateReservationTemplate(reservation) {
    return `
        <div class="hotel--reservation_room">
            <img src="${reservation.imageURL}" alt="Hotel_room">
            <p class="milano_queen_room">${reservation.name}</p>
            <p class="room_description">${reservation.description}</p>
            <p class="hotel--reserve_room">Reserve now</p>
        </div>
    `;
};

let resarvations = [{
    imageURL: "Images/reservation%20page/reservarion_room1.jpg",
    name: "Milano Queen",
    description: "In these Guest Rooms, no detail is overlooked — bronze rods, brass door handles and finials were forged by the Hotel's creative genius, Julian Schnabel."

}];

let currentReservations = reservations.slice(0, 12);

document.querySelector('#rooms').innerHTML = resarvations.map(generateReservationTemplate).join("");