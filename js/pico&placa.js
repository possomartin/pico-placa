const DateInput = document.getElementById('date');
const PlateInput = document.getElementById('plate');

var PicoDays = {'Monday': [1, 2], 'Tuesday': [3, 4],
'Wednesday': [5, 6], 'Thursday': [7, 8],'Friday': [9, 0]}

var PicoHours = ["6:00", "9:30", "16:00", "21:00"];

// Variables for input
var plate;
var datetime;

var lastDigit;

// Variables for working with datetime
var date;
var hours;
var minutes;

DateInput.addEventListener('change', (evt) => {
    datetime = evt.target.value;
    date = new Date(datetime);

});

PlateInput.addEventListener('change', (evt) => {
    plate = evt.target.value
});

predictDate = () =>
{
    // Get last digit of plate
    lastDigit = Number(plate.slice(-1));

    let day = Object.keys(PicoDays)[date.getDay() - 1];

    for(let i = 0; i < PicoDays[day]; i++)
    {
        if(PicoDays[day][i] === lastDigit)
        {
            console.log('Tiene Pico & Placa');
            break;
        }
    }

    console.log(lastDigit);
    console.log(date);
    console.log(PicoDays[day]);
    console.log(date.toString());
}