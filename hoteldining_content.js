//for Dining page - show working hours
"use strict";

(function() {
    var showWorkingHours = document.querySelector('.hotel--dining_schedule');

    showWorkingHours.addEventListener('click', function (event) {
        var scheduleHoursElement = event.target.closest('.hotel--dining_schedule_hours');
        if (!scheduleHoursElement) {
            return;
        }
        if (scheduleHoursElement.nextElementSibling.style.display === 'flex') {
            scheduleHoursElement.nextElementSibling.style.display = 'none';
        } else {
            scheduleHoursElement.nextElementSibling.style.display = 'flex';

        }


    });
})();

