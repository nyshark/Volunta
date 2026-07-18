document.addEventListener("DOMContentLoaded", () => {

const tabs = document.querySelectorAll(".organizer-tab");

window.showTab = function(tabId){

tabs.forEach(tab=>{

tab.style.display="none";

});

document.getElementById(tabId).style.display="block";

};

// ------------------------
// LOAD OPPORTUNITIES
// ------------------------

let opportunities =
JSON.parse(
localStorage.getItem("voluntaOpportunities")
) || [];

const form =
document.getElementById("opportunityForm");

const list =
document.getElementById("opportunityList");

// ------------------------
// SAVE
// ------------------------

function save(){

localStorage.setItem(

"voluntaOpportunities",

JSON.stringify(opportunities)

);

}

// ------------------------
// RENDER
// ------------------------

function render(){

list.innerHTML="";

if(opportunities.length===0){

list.innerHTML=`

<div class="contact-form-wrap">

<h3>No opportunities yet.</h3>

<p>Create your first opportunity!</p>

</div>

`;

return;

}

opportunities.forEach((opp,index)=>{

const card =
document.createElement("div");

card.className="contact-form-wrap";

card.innerHTML=`

<h2>${opp.title}</h2>

<p>

📍 ${opp.city}, ${opp.state}

</p>

<p>

${opp.date}

</p>

<p>

${opp.start}

-

${opp.end}

</p>

<p>

👥

0 /

${opp.limit}

Volunteers

</p>

<button
class="btn-send"
data-index="${index}">

View Details

</button>

`;

list.appendChild(card);

});

}

// ------------------------
// CREATE OPPORTUNITY
// ------------------------

form.addEventListener("submit",(e)=>{

e.preventDefault();

const opportunity={

title:
document.getElementById("oppTitle").value,

organization:
document.getElementById("oppOrganization").value,

address:
document.getElementById("oppAddress").value,

city:
document.getElementById("oppCity").value,

state:
document.getElementById("oppState").value,

zip:
document.getElementById("oppZip").value,

date:
document.getElementById("oppDate").value,

start:
document.getElementById("oppStart").value,

end:
document.getElementById("oppEnd").value,

limit:
document.getElementById("oppLimit").value,

category:
document.getElementById("oppCategory").value,

age:
document.getElementById("oppAge").value,

description:
document.getElementById("oppDescription").value,

students:[],

attendance:[],

pendingSignatures:[]

};

opportunities.push(opportunity);

save();

render();

form.reset();

showTab("opportunitiesTab");

});

// ------------------------
// VIEW DETAILS
// ------------------------

list.addEventListener("click",(e)=>{

if(!e.target.matches(".btn-send")) return;

const index =
Number(e.target.dataset.index);

const opp =
opportunities[index];

list.innerHTML=`

<div class="contact-form-wrap">

<h2>

${opp.title}

</h2>

<p>

<b>Organization:</b>

${opp.organization}

</p>

<p>

<b>Address:</b>

${opp.address}

<br>

${opp.city},

${opp.state}

${opp.zip}

</p>

<p>

<b>Date:</b>

${opp.date}

</p>

<p>

<b>Hours:</b>

${opp.start}

-

${opp.end}

</p>

<p>

<b>Volunteer Limit:</b>

${opp.limit}

</p>

<p>

<b>Category:</b>

${opp.category}

</p>

<p>

<b>Minimum Age:</b>

${opp.age}

</p>

<hr>

<p>

${opp.description}

</p>

<br>

<h3>

Signed Up Students

</h3>

<p>

None yet.

</p>

<br>

<h3>

Attendance

</h3>

<p>

Will appear once students begin signing up.

</p>

<br>

<h3>

Pending Signatures

</h3>

<p>

None.

</p>

<br>

<button
id="backButton"
class="btn-send">

← Back

</button>

</div>

`;

document.getElementById("backButton")
.onclick=function(){

render();

};

});

render();

});
