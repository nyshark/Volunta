document.addEventListener(
"DOMContentLoaded",
()=>{



const user =

JSON.parse(

localStorage.getItem(
"voluntaCurrentUser"
)

);



if(!user){

window.location.href="index.html";

return;

}





const totalHours =
document.getElementById(
"totalHours"
);


const progressPercent =
document.getElementById(
"progressPercent"
);


const progressBar =
document.getElementById(
"progressBarFill"
);


const goalForm =
document.getElementById(
"goalForm"
);


const targetInput =
document.getElementById(
"targetInput"
);





function saveUser(){


localStorage.setItem(

"voluntaCurrentUser",

JSON.stringify(user)

);


let users =

JSON.parse(

localStorage.getItem(
"voluntaUsers"
)

)||[];



let index = users.findIndex(

u=>u.email===user.email

);



if(index!==-1){

users[index]=user;

}



localStorage.setItem(

"voluntaUsers",

JSON.stringify(users)

);



}










function updateDashboard(){



let hours =
Number(user.hours)||0;



let goal =
Number(user.goal)||50;



let percent =
Math.min(

(hours/goal)*100,

100

);





totalHours.textContent =

hours.toFixed(1);




progressPercent.textContent =

Math.round(percent)+"%";




progressBar.style.width =

percent+"%";




targetInput.value = goal;



}






goalForm.addEventListener(

"submit",

(e)=>{


e.preventDefault();



let newGoal =

Number(
targetInput.value
);



if(newGoal>0){


user.goal=newGoal;


saveUser();


updateDashboard();


}


}

);








// ==========================
// ACTIVITY LOGGING
// ==========================



const activityForm =
document.getElementById(
"activitiesForm"
);

// ==========================
// AUTO DATE + TIME FILL
// ==========================

function fillCurrentDateTime(){

    const now = new Date();


    const month =
    String(now.getMonth()+1).padStart(2,"0");

    const day =
    String(now.getDate()).padStart(2,"0");

    const year =
    now.getFullYear();


    document.getElementById("actStart").value =
    `${month}/${day}/${year}`;



    let hours = now.getHours();

    let minutes =
    String(now.getMinutes()).padStart(2,"0");


    let ampm =
    hours >= 12 ? "pm" : "am";


    hours =
    hours % 12 || 12;


    document.getElementById("timeIn").value =
    `${hours}:${minutes} ${ampm}`;

}


fillCurrentDateTime();

const ledgerList =
document.getElementById(
"ledgerList"
);





function renderActivities(){

    ledgerList.innerHTML="";


    user.activities = user.activities || [];


    user.activities.forEach(

    (activity,index)=>{


        let li =
        document.createElement("li");


        li.className =
        "ledger-table-row";


        li.innerHTML = `

<div>${activity.name}</div>

<div>${activity.date}</div>

<div>${activity.timeIn}</div>

<div>${activity.timeOut}</div>

<div>${activity.type}</div>

<div>${Number(activity.hours).toFixed(1)}</div>

<button
class="ledger-delete-btn"
data-index="${index}">
✕
</button>

`;


        ledgerList.appendChild(li);


    });


}

activityForm.addEventListener(

"submit",

(e)=>{


e.preventDefault();



activityForm.addEventListener(

"submit",

(e)=>{

e.preventDefault();


// current time for Time Out
const now = new Date();

let hours = now.getHours();

let minutes =
String(now.getMinutes()).padStart(2,"0");

let ampm =
hours >= 12 ? "pm" : "am";

hours =
hours % 12 || 12;

document.getElementById("timeOut").value =
`${hours}:${minutes} ${ampm}`;


// create activity
let activity={

name:
document.getElementById("actName").value,

date:
document.getElementById("actStart").value,

timeIn:
document.getElementById("timeIn").value,

timeOut:
document.getElementById("timeOut").value,

type:
document.getElementById("actType").value,

hours:
Number(
document.getElementById("actHours").value
)

};


user.activities = user.activities || [];

user.activities.push(activity);

user.hours = Number(user.hours) || 0;
user.hours += activity.hours;

saveUser();

activityForm.reset();

fillCurrentDateTime();

renderActivities();

updateDashboard();

}

);




user.activities = user.activities || [];

user.activities.push(activity);



user.hours = Number(user.hours) || 0;
user.hours += activity.hours;



saveUser();



activityForm.reset();


renderActivities();


updateDashboard();



}

);







ledgerList.addEventListener(

"click",

(e)=>{


if(
e.target.tagName==="BUTTON"
){


let index =

e.target.dataset.index;



let removed =

user.activities[index];



user.hours -= Number(removed.hours);
user.hours = Math.max(user.hours,0);



user.activities.splice(

index,

1

);



saveUser();



renderActivities();



updateDashboard();



}


}

);







updateDashboard();

renderActivities();



});
