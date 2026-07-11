// ======================================
// VOLUNTA STARS.JS
// BACKGROUND STARS + DAY/NIGHT TOGGLE
// ======================================


document.addEventListener("DOMContentLoaded", function(){



    // ==============================
    // STAR CREATION
    // ==============================


    const starCanvas =
        document.getElementById("starCanvas");



    let stars = [];



    function createStars(){


        if(!starCanvas) return;


        for(let i = 0; i < 80; i++){


            const star =
                document.createElement("div");


            star.className =
                "star-div";


            const size =
                Math.random() * 3 + 2;



            star.style.width =
                size + "px";


            star.style.height =
                size + "px";



            star.style.left =
                Math.random() * 100 + "%";



            star.style.top =
                Math.random() * 100 + "%";



            star.style.opacity =
                Math.random();



            star.style.animation =
                "twinkleStar " +
                (2 + Math.random()*3)
                + "s infinite alternate";



            starCanvas.appendChild(star);


            stars.push(star);


        }


    }



    createStars();





    // ==============================
    // STAR TWINKLE ANIMATION
    // ==============================


    const style =
        document.createElement("style");


    style.textContent = `


    @keyframes twinkleStar {


        from {

            opacity:.2;
            transform:scale(1);

        }


        to {

            opacity:1;
            transform:scale(1.5);

        }


    }


    `;


    document.head.appendChild(style);







    // ==============================
    // MOON + SUN CREATION
    // ==============================


    const body =
        document.body;



    const moon =
        document.createElement("div");


    moon.className =
        "moon-element";


    body.appendChild(moon);




    const sun =
        document.createElement("div");


    sun.className =
        "sun-element";


    body.appendChild(sun);








    // ==============================
    // SHOOTING STAR SYSTEM
    // ==============================


    const shootingCanvas =
        document.createElement("canvas");


    shootingCanvas.id =
        "shootingStarCanvas";


    document.body.appendChild(
        shootingCanvas
    );


    const ctx =
        shootingCanvas.getContext("2d");



    function resizeCanvas(){


        shootingCanvas.width =
            window.innerWidth;


        shootingCanvas.height =
            window.innerHeight;


    }



    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );



    let shootingStars = [];



    function spawnShootingStar(){


        if(body.classList.contains("day-mode"))
            return;



        shootingStars.push({

            x:
            Math.random()*window.innerWidth,

            y:
            Math.random()*200,

            length:
            120,

            speed:
            8

        });


    }





    function animateShootingStars(){


        ctx.clearRect(
            0,
            0,
            shootingCanvas.width,
            shootingCanvas.height
        );



        shootingStars.forEach(
            (star,index)=>{


                ctx.beginPath();


                ctx.moveTo(
                    star.x,
                    star.y
                );


                ctx.lineTo(
                    star.x - star.length,
                    star.y - star.length
                );



                ctx.strokeStyle =
                    "rgba(200,216,255,.7)";


                ctx.lineWidth =
                    2;


                ctx.stroke();



                star.x += star.speed;

                star.y += star.speed;



                if(
                    star.x >
                    window.innerWidth+200
                ){

                    shootingStars.splice(
                        index,
                        1
                    );

                }



            }
        );



        requestAnimationFrame(
            animateShootingStars
        );


    }



    animateShootingStars();



    setInterval(
        spawnShootingStar,
        5000
    );









    // ==============================
    // THEME BUTTON
    // ==============================


    const themeButton =
        document.getElementById(
            "themeToggleBtn"
        );



    if(themeButton){


        themeButton.addEventListener(
            "click",
            function(){


                body.classList.toggle(
                    "day-mode"
                );



                localStorage.setItem(

                    "voluntaTheme",

                    body.classList.contains(
                        "day-mode"
                    )
                    ?
                    "day"
                    :
                    "night"

                );



                updateStars();


            }
        );


    }








    // ==============================
    // LOAD SAVED THEME
    // ==============================


    const savedTheme =
        localStorage.getItem(
            "voluntaTheme"
        );



    if(savedTheme === "day"){


        body.classList.add(
            "day-mode"
        );


    }







    function updateStars(){


        stars.forEach(
            star=>{


                if(
                    body.classList.contains(
                        "day-mode"
                    )
                ){

                    star.classList.add(
                        "star-day-morph"
                    );


                }

                else {


                    star.classList.remove(
                        "star-day-morph"
                    );


                }


            }
        );


    }



    updateStars();









    // ==============================
    // CLICK SPARKLES
    // ==============================


    document.addEventListener(
        "click",
        function(event){


            const sparkle =
                document.createElement(
                    "div"
                );


            sparkle.className =
                body.classList.contains(
                    "day-mode"
                )
                ?
                "click-sparkle-day"
                :
                "click-sparkle-night";



            sparkle.style.position =
                "fixed";



            sparkle.style.left =
                event.clientX + "px";


            sparkle.style.top =
                event.clientY + "px";



            sparkle.style.borderRadius =
                "50%";


            sparkle.style.pointerEvents =
                "none";


            sparkle.style.zIndex =
                "300";



            document.body.appendChild(
                sparkle
            );



            setTimeout(
                ()=>{

                    sparkle.remove();

                },
                600
            );



        }
    );



});
