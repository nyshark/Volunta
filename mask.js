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


        if(e.key !== "/"){
            return;
        }


        let parts =
        input.value.split("/");


        if(parts.length === 1 && parts[0].length === 1){

            input.value =
            "0" + parts[0] + "/";

            e.preventDefault();

        }


        else if(parts.length === 2 && parts[1].length === 1){

            input.value =
            parts[0] +
            "/0" +
            parts[1] +
            "/";

            e.preventDefault();

        }


    });



    input.addEventListener("input", function(){


        let numbers =
        input.value.replace(/\D/g,"");


        numbers =
        numbers.slice(0,6);


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


    });


}




function setupTimeMask(id){


    const input =
    document.getElementById(id);


    if(!input) return;



    input.placeholder =
    "HH:MM AM/PM";



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



        if(numbers.length === 0){

            input.value = "";

            return;

        }



        numbers =
        numbers.slice(0,4);



        let value = "";



        if(numbers.length <= 2){

            value = numbers;

        }


        else if(numbers.length === 3){

    if(
        numbers[0] === "1"
    ){

        // wait for possible 10:00, 11:00, 12:00
        value = numbers;

    }

    else{

        value =
        "0" +
        numbers.substring(0,1)
        +
        ":"
        +
        numbers.substring(1,3);

    }

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
input.addEventListener("blur", function(){

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



    if(numbers.length === 1){

        input.value =
        "0" +
        numbers +
        ":00";

    }



    else if(numbers.length === 3){

        input.value =
        "0" +
        numbers.substring(0,1)
        +
        ":"
        +
        numbers.substring(1,3);

    }



    else if(numbers.length === 4){

        input.value =
        numbers.substring(0,2)
        +
        ":"
        +
        numbers.substring(2,4);

    }



    if(meridiem){

        input.value +=
        " " + meridiem;

    }



});

}
