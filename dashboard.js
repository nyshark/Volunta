document.addEventListener("DOMContentLoaded",()=>{

const user =
JSON.parse(
localStorage.getItem("voluntaCurrentUser")
);

if(!user){

window.location.href="index.html";
return;

}

const totalHours =
document.getElementById("totalHours");

const progressPercent =
document.getElementById("progressPercent");

const progressBar =
document.getElementById("progressBarFill");

const goalForm =
document.getElementById("goalForm");

const targetInput =
document.getElementById("targetInput");

const activityForm =
document.getElementById("activitiesForm");

const ledgerList =
document.getElementById("ledgerList");

function saveUser(){

localStorage.setItem(
"voluntaCurrentUser",
JSON.stringify(user)
);

let users =
JSON.parse(
localStorage.getItem("voluntaUsers")
)||[];

let index =
users.findIndex(
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
Math.min((hours/goal)*100,100);

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
Number(targetInput.value);

if(newGoal>0){

user.goal=newGoal;

saveUser();

updateDashboard();

}

}
);

function renderActivities(){

ledgerList.innerHTML="";

user.activities =
user.activities || [];

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
data-index="${index}">✕</button>
`;

ledgerList.appendChild(li);

}
);

}

activityForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

let activity={

name:
document.getElementById("actName").value.trim(),

date:
document.getElementById("actStart").value,

timeIn:
document.getElementById("timeIn").value.trim(),

timeOut:
document.getElementById("timeOut").value.trim(),

type:
document.getElementById("actType").value,

hours:
Number(
document.getElementById("actHours").value
)

};

user.activities =
user.activities || [];

user.activities.push(activity);

    
user.hours =
Number(user.hours)||0;

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
e.target.classList.contains(
"ledger-delete-btn"
)
){

let index =
Number(e.target.dataset.index);

let removed =
user.activities[index];

user.hours -=
Number(removed.hours);

user.hours =
Math.max(user.hours,0);

user.activities.splice(index,1);

saveUser();

renderActivities();

updateDashboard();

}

}
);

updateDashboard();

renderActivities();


// ============================
// INPUT MASKS
// ============================

function maskDate(input){

    input.value="__/__/__";


    input.addEventListener("input", function(){

        let numbers =
        input.value.replace(/\D/g,"").slice(0,6);


        let result="";


        for(let i=0;i<6;i++){

            if(i===2 || i===4){
                result += "/";
            }

            result += numbers[i] || "_";

        }


        input.value=result;

    });

}



function maskTime(input){

    let meridiem = "";


    input.value="__:__";


    input.addEventListener("input",function(){

        let raw =
        input.value.toUpperCase();

        // detect AM / PM

        if(raw.includes("A")){

            meridiem="AM";

        }

        if(raw.includes("P")){

            meridiem="PM";

        }


        // keep only numbers

        let numbers =
        raw.replace(/\D/g,"").slice(0,4);


        let result="";


        for(let i=0;i<4;i++){

            if(i===2){

                result += ":";

            }


            result += numbers[i] || "_";

        }


        if(meridiem){

            result += " " + meridiem;

        }


        input.value=result;


    });


}
maskDate(
    document.getElementById("actStart")
);


maskTime(
    document.getElementById("timeIn")
);


maskTime(
    document.getElementById("timeOut")
);


});
