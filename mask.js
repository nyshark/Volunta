// ======================================
// VOLUNTA INPUT MASKS
// ======================================

function setupDateMask(id){

    const input =
    document.getElementById(id);

    if(!input) return;

    input.placeholder = "MM/DD/YY";
    input.maxLength = 8;

    input.addEventListener("keydown", function(e){

        const key = e.key;

        // Auto-pad month
        if(key === "/"){

            let parts =
            input.value.split("/");

            // Month
            if(parts.length === 1 && parts[0].length === 1){

                input.value =
                "0" + parts[0] + "/";

                e.preventDefault();
                return;
            }

            // Day
            if(parts.length === 2 && parts[1].length === 1){

                input.value =
                parts[0] +
                "/0" +
                parts[1] +
                "/";

                e.preventDefault();
                return;
            }

        }

    });

    input.addEventListener("input", function(){

        let numbers =
        input.value.replace(/\D/g,"");

        if(numbers.length > 6){

            numbers =
            numbers.slice(0,6);

        }

        let value = "";

        if(numbers.length >= 1){

            value += numbers.substring(0,2);

        }

        if(numbers.length >= 3){

            value += "/" + numbers.substring(2,4);

        }

        if(numbers.length >= 5){

            value += "/" + numbers.substring(4,6);

        }

        input.value = value;

        if(typeof updateHoursAutomatically === "function"){

    updateHoursAutomatically();

}

    });

}
function setupTimeMask(id){

    const input =
    document.getElementById(id);

    if(!input) return;


    input.placeholder="HH:MM AM/PM";


    input.addEventListener("input", function(){

        let raw =
        input.value
        .toUpperCase();


        let meridiem = "";


        // Detect AM / PM typing

        if(raw.includes("A")){

            meridiem = "AM";

        }

        else if(raw.includes("P")){

            meridiem = "PM";

        }


        // Keep only numbers

        let numbers =
        raw.replace(/\D/g,"");


        // Maximum HHMM

        numbers =
        numbers.slice(0,4);



        let hour = "";
        let minute = "";


        if(numbers.length >= 1){

            hour =
            numbers.substring(0,2);

        }


        if(numbers.length >= 3){

            minute =
            numbers.substring(2,4);

        }


        // Auto format hour

        if(hour.length === 1){

    hour =
    "0" + hour;

}


// Fix double digit hours
if(hour.length === 3){

    hour =
    hour.substring(1);

}


        let value = hour;


        // Add :

        if(numbers.length >= 3){

            value += ":" + minute;

        }


        // Add AM/PM

        if(meridiem){

            if(numbers.length === 2){

                value += ":00";

            }

            value += " " + meridiem;

        }


        input.value=value;


        if(typeof updateHoursAutomatically === "function"){

            updateHoursAutomatically();

        }


    });



    input.addEventListener("keydown",function(e){


        // Allow colon shortcut

        if(e.key === ":"){

            e.preventDefault();


            let numbers =
            input.value.replace(/\D/g,"");


            if(numbers.length === 1){

                input.value =
                "0" + numbers + ":";

            }

            else if(numbers.length === 2){

                input.value =
                numbers + ":";

            }

        }


    });

}
