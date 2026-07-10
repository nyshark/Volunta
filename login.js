```javascript
document.addEventListener("DOMContentLoaded", function () {


const studentRoleBtn =
document.getElementById("studentRoleBtn");


const organizerRoleBtn =
document.getElementById("organizerRoleBtn");


const roleSelection =
document.getElementById("roleSelection");


const authSection =
document.getElementById("authSection");



const tabLogin =
document.getElementById("tabLogin");


const tabRegister =
document.getElementById("tabRegister");



const authForm =
document.getElementById("authForm");



const submitBtn =
document.getElementById("submitBtn");



const formHeading =
document.getElementById("formHeading");


const formSub =
document.getElementById("formSub");



const email =
document.getElementById("email");


const password =
document.getElementById("password");



const schoolGroup =
document.getElementById("schoolGroup");


const school =
document.getElementById("school");



const banner =
document.getElementById("authNoticeBanner");


const bannerTitle =
document.getElementById("authNoticeTitle");


const bannerDesc =
document.getElementById("authNoticeDesc");



let loginMode = true;



const approvedSchools = [
"Rocklin High School",
"Whitney High School",
"Victory High School",
"Granite Oaks Middle School",
"Spring View Middle School",
"Rocklin Independent Charter Academy"
];





function showBanner(title,text){

if(!banner)return;

bannerTitle.textContent = title;

bannerDesc.textContent = text;

banner.classList.add("auth-banner-show");

}





function hideBanner(){

if(banner){

banner.classList.remove(
"auth-banner-show"
);

}

}





studentRoleBtn.onclick=function(){


roleSelection.style.display="none";


authSection.classList.remove(
"auth-hidden"
);


authSection.classList.add(
"auth-visible"
);


};





organizerRoleBtn.onclick=function(){

showBanner(
"Coming Soon!",
"Organizer accounts are not available yet ✩"
);

};








tabLogin.onclick=function(){

loginMode=true;


tabLogin.classList.add("active");

tabRegister.classList.remove("active");


submitBtn.textContent="log in";


formHeading.textContent="welcome back :)";

formSub.textContent="hi again!";


schoolGroup.classList.add(
"hidden-field"
);


hideBanner();


};







tabRegister.onclick=function(){

loginMode=false;


tabRegister.classList.add("active");

tabLogin.classList.remove("active");


submitBtn.textContent="sign up";


formHeading.textContent="welcome!";

formSub.textContent="hello!";


schoolGroup.classList.remove(
"hidden-field"
);


};









function createID(){

return "VT-" +
Math.floor(
10000 + Math.random()*90000
);

}









authForm.addEventListener(
"submit",
function(e){


e.preventDefault();



let users =
JSON.parse(
localStorage.getItem("voluntaUsers")
)
|| [];





if(loginMode){


let user =
users.find(
u=>u.email===email.value.toLowerCase()
);



if(!user){

showBanner(
"Not Found",
"Account does not exist."
);

return;

}



if(user.password!==password.value){


showBanner(
"Incorrect Password",
"Try again."
);


return;


}




localStorage.setItem(
"voluntaCurrentUser",
JSON.stringify(user)
);


window.location.href="dashboard.html";



return;



}






if(!approvedSchools.includes(
school.value
)){


showBanner(
"School Required",
"Please select a Rocklin school."
);


return;


}






let newUser={


studentId:createID(),

email:
email.value.toLowerCase(),

password:
password.value,


school:
school.value,


verified:true,


accountType:"student",


hours:0,


goal:50,


activities:[]

};





users.push(newUser);


localStorage.setItem(
"voluntaUsers",
JSON.stringify(users)
);



localStorage.setItem(
"voluntaCurrentUser",
JSON.stringify(newUser)
);



window.location.href="dashboard.html";



});



});
```
