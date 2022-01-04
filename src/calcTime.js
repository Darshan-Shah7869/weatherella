function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 1000 * offset);

    // return time as a string
    // return `${nd.toLocaleString()} ${nd.getDay()} ${nd.getDate()} ${nd.getMonth()} ${nd.getFullYear()}}`;
    const day = nd.getDay();
    let weekday = '';
    if (day === 0) {
        weekday = 'Sunday';
    } else if (day === 1) {
        weekday = 'Monday';
    } else if (day === 2) {
        weekday = 'Tuesday';
    } else if (day === 3) {
        weekday = 'Wednesday';
    } else if (day === 4) {
        weekday = 'Thursday';
    } else if (day === 5) {
        weekday = 'Friday';
    } else if (day === 6) {
        weekday = 'Saturday';
    }

    const currentYear = nd.getFullYear().toString().substr(-2);
    const timeArray = nd.toTimeString().split(':');

    timeArray.pop();
    const finalTime = timeArray.join(':');
    console.log(finalTime);

    const output = {
        day: weekday,
        date: nd.getDate(),
        month: nd.getMonth(),
        year: currentYear,
        time: finalTime,
    };

    return output;
}

export default calcTime;
