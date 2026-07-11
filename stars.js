// ======================================
// VOLUNTA STARS.JS
// STAR / CLOUD / SUN / MOON SYSTEM
// ======================================


document.addEventListener(
"DOMContentLoaded",
function(){



// ===============================
// CREATE SUN
// ===============================


const sun =
document.createElement("div");

sun.className =
"sun-element";

document.body.appendChild(
sun
);





// ===============================
// CREATE MOON
// ===============================


const moon =
document.createElement("div");

moon.className =
"moon-element";

document.body.appendChild(
moon
);






// ===============================
// CLOUD LAYER
// ===============================


let cloudCanvas =
document.getElementById(
"cloudCanvas"
);



if(!cloudCanvas){


cloudCanvas =
document.createElement(
"div"
);


cloudCanvas.id =
"cloudCanvas";


document.body.appendChild(
cloudCanvas
);


}







// ===============================
// SHOOTING STAR CANVAS
// ===============================


const canvas =
document.createElement(
"canvas"
);


canvas.id =
"shootingStarCanvas";


document.body.appendChild(
canvas
);



const ctx =
canvas.getContext(
"2d"
);





function resizeCanvas(){


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;


}



resizeCanvas();


window.addEventListener(
"resize",
resizeCanvas
);









// ===============================
// CREATE STARS
// ===============================


const stars = [];

const starCount = 80;



for(
let i = 0;
i < starCount;
i++
){


const star =
document.createElement(
"div"
);


star.className =
"star-div";



star.style.left =
Math.random()
*
window.innerWidth
+
"px";



star.style.top =
Math.random()
*
window.innerHeight
+
"px";



star.style.opacity =
Math.random();



document.body.appendChild(
star
);



stars.push(
star
);


}








// ===============================
// UPDATE DAY/NIGHT VISUALS
// ===============================



function updateAtmosphere(){


const isDay =
document.body.classList.contains(
"day-mode"
);





stars.forEach(
function(star){


if(isDay){


star.classList.add(
"star-day-morph"
);


}

else{


star.classList.remove(
"star-day-morph"
);


}



}
);






if(cloudCanvas){


cloudCanvas.style.display =
isDay
?
"block"
:
"none";


}





sun.style.display =
isDay
?
"block"
:
"none";



moon.style.display =
isDay
?
"none"
:
"block";





}









// ===============================
// TWINKLE / CLOUD MOVEMENT
// ===============================


setInterval(
function(){


const isDay =
document.body.classList.contains(
"day-mode"
);




stars.forEach(
function(star){


if(isDay){


star.style.opacity =
0.2 +
Math.random()
*
0.3;


}

else{


star.style.opacity =
Math.random();


}



}
);




if(isDay){


sun.style.transform =
"scale(" +
(
0.96 +
Math.random()
*
0.08
)
+
")";



}


},
1200
);









// ===============================
// CLICK SPARKLES
// ===============================



window.addEventListener(
"click",
function(event){



if(
event.target.tagName === "BUTTON" ||
event.target.tagName === "A" ||
event.target.tagName === "SELECT"
){

return;

}



const isDay =
document.body.classList.contains(
"day-mode"
);




for(
let i = 0;
i < 3;
i++
){



const sparkle =
document.createElement(
"div"
);



sparkle.className =
isDay
?
"star-div click-sparkle-day"
:
"star-div click-sparkle-night";




sparkle.style.left =
event.clientX +
(
Math.random()
*
20
-
10
)
+
"px";



sparkle.style.top =
event.clientY +
(
Math.random()
*
20
-
10
)
+
"px";




document.body.appendChild(
sparkle
);




setTimeout(
function(){

sparkle.remove();

},
800
);



}



}
);









// ===============================
// SHOOTING STARS
// ===============================



let comet = null;



function spawnComet(){


comet = {


x:
Math.random()
*
window.innerWidth,


y:
Math.random()
*
(window.innerHeight/2),


speed:
8 +
Math.random()
*
5,


length:
60 +
Math.random()
*
40


};



}







function animateShootingStars(){



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



const isDay =
document.body.classList.contains(
"day-mode"
);





if(!isDay){



if(
!comet &&
Math.random()
<
0.004
){


spawnComet();


}




if(comet){



const gradient =
ctx.createLinearGradient(
comet.x,
comet.y,
comet.x-comet.length,
comet.y-comet.length
);



gradient.addColorStop(
0,
"rgba(200,216,255,.9)"
);



gradient.addColorStop(
1,
"rgba(200,216,255,0)"
);




ctx.strokeStyle =
gradient;



ctx.lineWidth =
2;



ctx.beginPath();



ctx.moveTo(
comet.x,
comet.y
);



ctx.lineTo(
comet.x-comet.length,
comet.y-comet.length
);



ctx.stroke();





comet.x += comet.speed;


comet.y += comet.speed;



if(
comet.x >
window.innerWidth ||
comet.y >
window.innerHeight
){


comet = null;


}



}


}





requestAnimationFrame(
animateShootingStars
);


}



animateShootingStars();








// ===============================
// THEME BUTTON
// ===============================



const themeButton =
document.getElementById(
"themeToggleBtn"
);





if(themeButton){



themeButton.addEventListener(
"click",
function(){



document.body.classList.toggle(
"day-mode"
);



updateAtmosphere();




themeButton.innerHTML =
document.body.classList.contains(
"day-mode"
)
?
"𖤓"
:
"⏾";



}
);



}





updateAtmosphere();




});
