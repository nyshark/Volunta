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


const ledgerList =
document.getElementById(
"ledgerList"
);





function renderActivities(){


ledgerList.innerHTML="";



user.activities =

user.activities || [];



user.activities.forEach(

(activity,index)=>{



let li =
document.createElement(
"li"
);



li.className =
"ledger-item-row-layout";



li.innerHTML = `

<div>

<strong>
${activity.name}
</strong>

<br>

<span class="ledger-type-style">

${activity.type}

</span>

</div>


<div>

${activity.hours} hrs


<button

class="filter-btn"

data-index="${index}">

X

</button>


</div>

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
document.getElementById(
"actName"
).value,


date:
document.getElementById(
"actStart"
).value,


type:
document.getElementById(
"actType"
).value,


hours:
Number(
document.getElementById(
"actHours"
).value
)


};




user.activities.push(activity);



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



user.hours -= removed.hours;



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
