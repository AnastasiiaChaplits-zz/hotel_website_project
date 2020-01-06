//for Dining page - show working hours

(function() {
    function workingHours() {
        let workingHours = document.querySelector('.hotel--dining_working_hours');
        workingHours.style.display = 'flex';
    }

    let showWorkingHours = document.querySelector('.hotel--dining_schedule_hours');
    showWorkingHours.onclick = workingHours;
}());


