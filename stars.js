// ======================================
// VOLUNTA BACKGROUND ANIMATION
// stars.js
// ======================================


document.addEventListener("DOMContentLoaded", function () {



    const starCanvas =
        document.getElementById("starCanvas");


    const cloudCanvas =
        document.getElementById("cloudCanvas");



    const themeBtn =
        document.getElementById("themeToggleBtn");



    // ===============================
    // CREATE STAR FIELD
    // ===============================


    const starAmount = 90;


    let stars = [];



    for (let i = 0; i < starAmount; i++) {


        const star =
            document.createElement("div");


        star.className =
            "star-div";



        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";



        star.style.animationDelay =
            Math.random() * 5 + "s";



        starCanvas.appendChild(star);



        stars.push(star);

    }







    // ===============================
    // CREATE CLOUDS
    // ===============================


    const cloudAmount = 6;


    let clouds = [];



    for(let i = 0; i < cloudAmount; i++){



        const cloud =
            document.createElement("div");



        cloud.className =
            "cloud-div";



        cloud.style.top =
            (10 + Math.random() * 50) + "%";



        cloud.style.left =
            (-30 + Math.random() * 80) + "%";



        cloud.style.animationDelay =
            Math.random() * 20 + "s";



        cloudCanvas.appendChild(cloud);



        clouds.push(cloud);

    }







    // ===============================
    // SHOOTING STAR CANVAS
    // ===============================


    const canvas =
        document.createElement("canvas");


    canvas.id =
        "shootingStars";


    document.body.appendChild(canvas);



    const ctx =
        canvas.getContext("2d");



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



    let comet = null;




    function createComet(){


        comet = {


            x:
                Math.random() *
                canvas.width,


            y:
                Math.random() *
                (canvas.height / 3),



            speed:
                8,



            size:
                60


        };


    }







    function animateComets(){


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );



        const dayMode =
            document.body.classList.contains(
                "day-mode"
            );



        if(!dayMode){



            if(
                comet === null &&
                Math.random() < 0.006
            ){

                createComet();

            }




            if(comet){



                let gradient =
                    ctx.createLinearGradient(
                        comet.x,
                        comet.y,
                        comet.x - comet.size,
                        comet.y - comet.size
                    );



                gradient.addColorStop(
                    0,
                    "white"
                );


                gradient.addColorStop(
                    1,
                    "transparent"
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
                    comet.x - comet.size,
                    comet.y - comet.size
                );


                ctx.stroke();



                comet.x += comet.speed;


                comet.y += comet.speed;



                if(
                    comet.x >
                    canvas.width + 100
                ){

                    comet = null;

                }

            }

        }



        requestAnimationFrame(
            animateComets
        );

    }



    animateComets();








    // ===============================
    // THEME SWITCHER
    // ===============================



    function updateTheme(){


        const day =
            document.body.classList.contains(
                "day-mode"
            );



        if(day){



            starCanvas.style.display =
                "none";


            cloudCanvas.style.display =
                "block";



            themeBtn.innerHTML =
                "𖤓";



        }

        else {



            starCanvas.style.display =
                "block";


            cloudCanvas.style.display =
                "none";



            themeBtn.innerHTML =
                "⏾";


        }



    }




    updateTheme();




    if(themeBtn){


        themeBtn.addEventListener(
            "click",
            function(){



                document.body.classList.toggle(
                    "day-mode"
                );



                updateTheme();



            }
        );


    }







    // ===============================
    // CLICK SPARKLES
    // ===============================



    document.addEventListener(
        "click",
        function(e){



            if(
                e.target.tagName === "BUTTON" ||
                e.target.tagName === "A"
            ){

                return;

            }




            const sparkle =
                document.createElement("div");



            sparkle.className =
                "click-sparkle";



            sparkle.style.left =
                e.clientX + "px";


            sparkle.style.top =
                e.clientY + "px";



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
    );



});
