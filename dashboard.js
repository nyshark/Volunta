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

const activityType =
document.getElementById("actType");

const authNoticeBanner =
document.getElementById("authNoticeBanner");

const authNoticeTitle =
document.getElementById("authNoticeTitle");

const authNoticeDesc =
document.getElementById("authNoticeDesc");

const authBannerClose =
document.getElementById("authBannerClose");

let bannerTimeout;

function showBanner(title, message){

    authNoticeTitle.textContent = title;

    authNoticeDesc.textContent = message;

    authNoticeBanner.classList.remove(
        "auth-banner-show"
    );

    void authNoticeBanner.offsetWidth;

    authNoticeBanner.classList.add(
        "auth-banner-show"
    );

    clearTimeout(bannerTimeout);

    bannerTimeout = setTimeout(function(){

        authNoticeBanner.classList.remove(
            "auth-banner-show"
        );

    },4000);

}

function hideBanner(){

    authNoticeBanner.classList.remove(
        "auth-banner-show"
    );

}

if(authBannerClose){

    authBannerClose.onclick = hideBanner;

}

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

updateActivityInputs();

updateHoursAutomatically();

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

updateHoursAutomatically();

}

}
);

updateDashboard();

renderActivities();

// ======================================
// AUTO HOURS CALCULATOR
// ======================================

const timeInInput =
document.getElementById("timeIn");

const timeOutInput =
document.getElementById("timeOut");

[timeInInput, timeOutInput].forEach(function(input){

    input.addEventListener("keydown", function(e){

        if(e.key === "Enter"){

            e.preventDefault();

        }

    });

});

const hoursInput =
document.getElementById("actHours");


function convertTimeToMinutes(time){

    time = time.trim().toUpperCase();

    if(!time.includes("AM") && !time.includes("PM")){

        return null;

    }

    const parts =
    time.split(" ");

    if(parts.length !== 2){

        return null;

    }

    const clock =
    parts[0].split(":");

    if(clock.length !== 2){

        return null;

    }

    let hour =
    Number(clock[0]);

    let minute =
    Number(clock[1]);

    const period =
    parts[1];


    if(

        isNaN(hour) ||
        isNaN(minute)

    ){

        return null;

    }


    if(period==="PM" && hour!==12){

        hour += 12;

    }

    if(period==="AM" && hour===12){

        hour = 0;

    }

    return hour*60 + minute;

}



function updateHoursAutomatically(){

    if(activityType.value === "Donation-Based"){

        return;

    }

    const start =
    convertTimeToMinutes(
        timeInInput.value
    );

    const end =
    convertTimeToMinutes(
        timeOutInput.value
    );

    if(start===null || end===null){

        hoursInput.value="";
        return;

    }

    let totalMinutes;

    // Same day
    if(end >= start){

        totalMinutes =
        end - start;

    }

    // Overnight
    else{

        totalMinutes =
        (24 * 60 - start) + end;

    }

    const hours =
    totalMinutes / 60;

    hoursInput.value =
    hours.toFixed(2);

}



timeInInput.addEventListener(
    "input",
    function(){

        updateHoursAutomatically();

    }
);

timeOutInput.addEventListener(
    "input",
    function(){

        updateHoursAutomatically();

    }
);

timeInInput.addEventListener(
    "blur",
    updateHoursAutomatically
);

timeOutInput.addEventListener(
    "blur",
    updateHoursAutomatically
);

// ======================================
// INPUT VALIDATION
// ======================================

function currentYear(){

    return new Date()
        .getFullYear()
        .toString()
        .slice(-2);

}

function validateDate(){

    const input =
    document.getElementById("actStart");

    const value =
    input.value;

    if(value.length !== 8){

        return;

    }

    const parts =
    value.split("/");

    if(parts.length !== 3){

        return;

    }

    let month =
    Number(parts[0]);

    let day =
    Number(parts[1]);

    let year =
    Number(parts[2]);

    if(month < 1 || month > 12){

        showBanner(
    "Invalid Month",
    "Month must be between 01 and 12."
);

        input.focus();

        return;

    }

    if(day < 1 || day > 31){

        showBanner(
    "Invalid Day",
    "Day must be between 01 and 31."
);

        input.focus();

        return;

    }

    if(year > Number(currentYear())){

        showBanner(
    "Future Date",
    "You cannot enter a future year."
);

        input.focus();

        return;

    }

}

function validateTime(id){

    const input =
    document.getElementById(id);

    const value =
    input.value.toUpperCase();

    if(

        !value.includes("AM")
        &&
        !value.includes("PM")

    ){

        return;

    }

    const parts =
    value.split(" ");

    if(parts.length !== 2){

        return;

    }

    const clock =
    parts[0].split(":");

    if(clock.length !== 2){

        return;

    }

    const hour =
    Number(clock[0]);

    const minute =
    Number(clock[1]);

    if(hour < 1 || hour > 12){

        showBanner(
    "Invalid Time",
    "Hours must be between 1 and 12."
);

        input.focus();

        return;

    }

    if(minute < 0 || minute > 59){

        showBanner(
    "Invalid Time",
    "Minutes must be between 00 and 59."
);

        input.focus();

        return;

    }

}

document
.getElementById("actStart")
.addEventListener(

    "blur",

    validateDate

);

document
.getElementById("timeIn")
.addEventListener(

    "blur",

    function(){

        validateTime("timeIn");

    }

);

document
.getElementById("timeOut")
.addEventListener(

    "blur",

    function(){

        validateTime("timeOut");

    }

);

function updateActivityInputs(){

    if(activityType.value === "Donation-Based"){

        timeInInput.disabled = true;
        timeOutInput.disabled = true;

        timeInInput.value = "";
        timeOutInput.value = "";

        hoursInput.readOnly = false;

    }

    else{

        timeInInput.disabled = false;
        timeOutInput.disabled = false;

        hoursInput.readOnly = true;

        updateHoursAutomatically();

    }

}

activityType.addEventListener(
    "change",
    updateActivityInputs
);

updateActivityInputs();

setupDateMask("actStart");

setupTimeMask("timeIn");

setupTimeMask("timeOut");
});
