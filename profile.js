document.addEventListener(
"DOMContentLoaded",
()=>{


const user =
JSON.parse(
localStorage.getItem(
"voluntaCurrentUser"
)
);



if(!user)
return;



document.getElementById(
"profileName"
).textContent =
user.name;



document.getElementById(
"studentID"
).textContent =
user.studentId;



document.getElementById(
"profileEmail"
).textContent =
user.email;



document.getElementById(
"accountType"
).textContent =

user.betaTester

?
"Beta Tester Account"

:
"Student Account";



});
