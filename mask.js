// ======================================
// VOLUNTA INPUT MASKS
// ======================================

function setupDateMask(id){

    const input = document.getElementById(id);

    if(!input) return;

    input.placeholder = "10/12/11";
    input.maxLength = 8;

    input.addEventListener("input", function(){

        let value =
        input.value.replace(/\D/g,"");

        if(value.length > 6){

            value = value.slice(0,6);

        }

        if(value.length >= 3){

            value =
            value.slice(0,2)
            + "/"
            + value.slice(2);

        }

        if(value.length >= 5){

            value =
            value.slice(0,5)
            + "/"
            + value.slice(5);

        }

        input.value = value;

    });

}

function setupTimeMask(id){

    const input =
    document.getElementById(id);

    if(!input) return;

    input.placeholder="12:00 PM";

    input.addEventListener("input",function(){

        let raw =
        input.value.toUpperCase();

        let meridiem="";

        if(raw.includes("A")){

            meridiem="AM";

        }

        else if(raw.includes("P")){

            meridiem="PM";

        }

        let numbers =
        raw.replace(/\D/g,"");

        if(numbers.length > 4){

            numbers =
            numbers.slice(0,4);

        }

        let value=numbers;

        if(numbers.length >= 3){

            value =
            numbers.slice(0,2)
            + ":"
            + numbers.slice(2);

        }

        if(meridiem){

            value += " " + meridiem;

        }

        input.value=value;

    });

}


