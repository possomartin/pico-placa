const DateInput = document.getElementById('date');
const PlateInput = document.getElementById('plate');
const Result = document.getElementById('result');

var PicoDays = {'Monday': [1, 2], 'Tuesday': [3, 4],
'Wednesday': [5, 6], 'Thursday': [7, 8],'Friday': [9, 0]}

var PicoHours = ["6:00", "9:30", "16:00", "21:00"];

// Variables for input
var plate;
var datetime;

var lastDigit;

// Variables for working with datetime
var date;

var times = [];

var hours;
var minutes;

DateInput.addEventListener('change', (evt) => {
    times = [];
    datetime = evt.target.value;

    date = new Date(datetime);

    PicoHours.forEach(element => {
        let timeDate = new Date(datetime);

        let splitTime = element.split(':');

        timeDate.setHours(Number(splitTime[0]));
        timeDate.setMinutes(Number(splitTime[1]));

        times.push(timeDate);
    });

});

PlateInput.addEventListener('change', (evt) => {
    plate = evt.target.value
});

predictDate = () =>
{
    Result.innerText = "";

    // Get last digit of plate
    lastDigit = Number(plate.slice(-1));

    let day = Object.keys(PicoDays)[date.getDay() - 1];
    let isPicoDay = false;
    let isPicoHours = false;

    console.log(day);

    for(let i = 0; i < PicoDays[day].length; i++)
    {
        if(PicoDays[day][i] === lastDigit)
        {

            isPicoDay = true;

            if(date.getTime() > times[0].getTime() && date.getTime() < times[1].getTime())
            {
                isPicoHours = true;
            }
            else if(date.getTime() > times[2].getTime() && date.getTime() < times[3].getTime())
            {
                isPicoHours = true;
            }
        }
    }

    Result.innerText += `It's a ${day}\n`;
    if(isPicoDay && isPicoHours)
    {
        Result.innerText += "Your car has Pico & Placa that date and Time";
        Result.style = 'color: #C69074;';
    }
    else if(isPicoDay && !isPicoHours)
    {
        Result.innerText += "Your car has Pico & Placa, but you're not in Pico Hours";
        Result.style = 'color: #B1A05E;';
    }    
    else
    {
        Result.innerText += "Your car has not Pico & Placa that date and time";
        Result.style = 'color: #7899C5;';
    }

    console.log(lastDigit);
    console.log(date);
    console.log(times);
    console.log(PicoDays[day]);
    console.log(date.toString());
}