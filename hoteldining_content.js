//for Dining page - working hours

function workingHours() {
    let workingHours = document.querySelector('.hotel--dining_working_hours');
    workingHours.style.display = 'block';
}

let showWorkingHours = document.querySelector('.hotel--dining_schedule_hours');
showWorkingHours.onclick = workingHours;
