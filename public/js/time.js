const time = document.getElementById('time');

function currentTime() {
    let date = new Date();
    let day = date.toLocaleString('default', { weekday: 'long' });
    let month = date.toLocaleString('default', { month: 'long' });
    let dayOfMonth = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // Set AM or PM
    const mode = hour >= 12 ? 'PM' : 'AM';
    // Convert to 12-hour clock
    hour = hour % 12 || 12;
    // Output 
    time.innerHTML = `${day}, ${month} ${dayOfMonth} | ${hour}<span>:</span>${addZeroes(minute)}<span>:</span>${addZeroes(second)} ${mode}`;
    setTimeout(currentTime, 1000);
}

// Add zeroes for proper formatting when we have single digit seconds
function addZeroes(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

currentTime();