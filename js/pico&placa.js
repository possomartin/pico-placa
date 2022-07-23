const DateInput = document.getElementById('date');
const PlateInput = document.getElementById('plate');
const Result = document.getElementById('result');

const Btn = document.getElementById('predict-btn');

var PicoDays = {
    'Monday': [1, 2], 'Tuesday': [3, 4],
    'Wednesday': [5, 6], 'Thursday': [7, 8], 'Friday': [9, 0]
}

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

/* Code for Validdations */

checkDate = (value) => {
    if (value !== undefined) {
        return true;
    }

    return false;
}


checkPlate = (value) => {
    var temp = value;

    for (let i = 1; i <= 9; i++) {
        if (Number(temp.charAt(temp.length - 1)) == i) {
            return true;
        }
    }

    return false;
}


DateInput.addEventListener('change', (evt) => {

    times = [];

    datetime = evt.target.value;

    date = new Date(datetime);

    // Setting Pico Hours Of that given Date
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

predictDate = () => {

    let params = checkDate(date) && checkPlate(plate);

    console.log(checkDate(date));
    console.log(checkPlate(plate));
    console.log(params);

    if (params) {

        Result.innerText = "";

        // Get last digit of plate
        lastDigit = Number(plate.slice(-1));

        let day = Object.keys(PicoDays)[date.getDay() - 1];
        let isPicoDay = false;
        let isPicoHours = false;

        console.log(day);

        if(day !== undefined)
        {
            for (let i = 0; i < PicoDays[day].length; i++) {
                //Checking for Pico Days
                if (PicoDays[day][i] === lastDigit) 
                {
                    isPicoDay = true;
                    
                    // Checking for Pico Hours
                    if (date.getTime() > times[0].getTime() && date.getTime() < times[1].getTime()) {
                        isPicoHours = true;
                    }
                    else if (date.getTime() > times[2].getTime() && date.getTime() < times[3].getTime()) {
                        isPicoHours = true;
                    }
                }
            }

            Result.innerText += `It's a ${day}\n`;
            if (isPicoDay && isPicoHours) {
                Result.innerText += "Your car has Pico & Placa that date and Time";
                Result.style = 'color: #C69074;';
            }
            else if (isPicoDay && !isPicoHours) {
                Result.innerText += "Your car has Pico & Placa, but you're not in Pico Hours";
                Result.style = 'color: #B1A05E;';
            }
            else {
                Result.innerText += "Your car has not Pico & Placa that date and time";
                Result.style = 'color: #7899C5;';
            }

            console.log(lastDigit);
            console.log(date);
            console.log(times);
            console.log(PicoDays[day]);
            console.log(date.toString());            
        }
        else
        {
            alert('Date cannot be a weekend!');
        }
    }
    else {
        alert('Invalid Inputs!');
    }
}
