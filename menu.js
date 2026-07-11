document.addEventListener(
"DOMContentLoaded",
()=>{


const menuBtn =
document.getElementById(
"menuToggleBtn"
);


const menu =
document.getElementById(
"accountMenu"
);



const closeBtn =
document.getElementById(
"menuCloseBtn"
);



menuBtn.onclick = ()=>{


menu.classList.toggle(
"menu-open"
);


};



closeBtn.onclick = ()=>{


menu.classList.remove(
"menu-open"
);


};



document.addEventListener(
"click",
(e)=>{


if(
!menu.contains(e.target)
&&
!menuBtn.contains(e.target)

){


menu.classList.remove(
"menu-open"
);


}


});


});
