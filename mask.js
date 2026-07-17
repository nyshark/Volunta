// VOLUNTA INPUT MASKS

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
    alert("TIME MASK VERSION TEST " + id);

    const input =
    document.getElementById(id);

    if(!input) return;


    input.placeholder = "HH:MM AM/PM";


    input.addEventListener("input", function(){


        let raw =
        input.value.toUpperCase();



        let meridiem = "";

        if(raw.includes("A")){

            meridiem = "AM";

        }

        else if(raw.includes("P")){

            meridiem = "PM";

        }



        let numbers =
        raw.replace(/\D/g,"");



        // completely empty

        if(numbers.length === 0){

            input.value = "";

            return;

        }



        // keep only HHMM

        numbers =
        numbers.substring(0,4);



        let value = "";



        // 1-4 numbers

        if(numbers.length <= 2){

            value = numbers;

        }


        else if(numbers.length === 3){

            value =
            numbers.substring(0,1)
            .padStart(2,"0")
            +
            ":"
            +
            numbers.substring(1,3);

        }


        else if(numbers.length === 4){

            value =
            numbers.substring(0,2)
            +
            ":"
            +
            numbers.substring(2,4);

        }



        if(meridiem){

            value += " " + meridiem;

        }



        input.value = value;


        if(typeof updateHoursAutomatically === "function"){

            updateHoursAutomatically();

        }


    });


}
