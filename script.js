let timeRanges = [];

document.getElementById('startTimeText').addEventListener('input', autoFormatTime);
document.getElementById('endTimeText').addEventListener('input', autoFormatTime);

function autoFormatTime(event) {
    const input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }
    input.value = value;
}

function addTimeRange() {
    const startTimeText = document.getElementById('startTimeText').value;
    const endTimeText = document.getElementById('endTimeText').value;

    if (!startTimeText || !endTimeText || startTimeText.length < 5 || endTimeText.length < 5) {
        alert('Please enter valid start and end times');
        return;
    }

    const start = parseTimeText(startTimeText);
    const end = parseTimeText(endTimeText);

    const diff = (end - start) / 1000 / 60; // Difference in minutes

    if (diff > 0) {
        timeRanges.push({ start: startTimeText, end: endTimeText, diff });
        displayTimeRanges();
        calculateTotalHours();
    } else {
        alert('End time must be after start time');
    }
}

function parseTimeText(timeText) {
    const [hours, minutes] = timeText.split(':').map(Number);
    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    return date;
}

function displayTimeRanges() {
    const tbody = document.getElementById('timeRanges');
    tbody.innerHTML = '';
    timeRanges.forEach(range => {
        const hours = Math.floor(range.diff / 60);
        const minutes = range.diff % 60;
        const row = `<tr>
            <td>${range.start} - ${range.end}</td>
            <td>${hours} hours ${minutes} minutes</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function calculateTotalHours() {
    const totalMinutes = timeRanges.reduce((acc, curr) => acc + curr.diff, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalRemainingMinutes = totalMinutes % 60;
    document.getElementById('totalHours').textContent = `${totalHours} hours ${totalRemainingMinutes} minutes`;
}
