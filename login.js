document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // ELEMENTS
    // =================================

    const welcomeIntro =
        document.getElementById("welcomeIntro");

    const roleSelection =
        document.getElementById("roleSelection");

    const studentRoleBtn =
        document.getElementById("studentRoleBtn");

    const organizerRoleBtn =
        document.getElementById("organizerRoleBtn");

    const authSection =
        document.getElementById("authSection");

    const authNoticeBanner =
        document.getElementById("authNoticeBanner");

    const authNoticeTitle =
        document.getElementById("authNoticeTitle");

    const authNoticeDesc =
        document.getElementById("authNoticeDesc");

    const betaLoginBtn =
        document.getElementById("betaLoginBtn");

    const betaEmail =
        document.getElementById("betaEmail");

    const betaPassword =
        document.getElementById("betaPassword");



    // =================================
    // INTRO
    // =================================

    setTimeout(function () {

        if (welcomeIntro) {

            welcomeIntro.classList.add("fade-out");

        }

        if (roleSelection) {

            roleSelection.style.display = "flex";

            roleSelection.classList.remove("hidden-screen");

        }

    }, 3000);



    // =================================
    // BANNER
    // =================================

    function showBanner(title, message) {

    if (!authNoticeBanner) return;


    authNoticeTitle.textContent =
        title;


    authNoticeDesc.textContent =
        message;


    authNoticeBanner.classList.add(
        "banner-slide-show"
    );


    setTimeout(function(){

        authNoticeBanner.classList.remove(
            "banner-slide-show"
        );

    },5000);

}



    function hideBanner() {

        if (!authNoticeBanner) return;

        authNoticeBanner.classList.remove(
            "banner-slide-show"
        );

    }
        // =================================
    // ROLE SELECTION
    // =================================


    if (studentRoleBtn) {

        studentRoleBtn.onclick = function () {


            roleSelection.classList.add(
                "fade-out"
            );


            setTimeout(function () {


                roleSelection.style.display =
                    "none";


                if (authSection) {


                    authSection.classList.remove(
                        "auth-hidden"
                    );


                    authSection.classList.add(
                        "auth-visible"
                    );


                }


            }, 700);


        };

    }





    if (organizerRoleBtn) {


        organizerRoleBtn.onclick = function () {


            showBanner(

                "Sorry!!",

                "Under maintenance at the moment ✦"

            );


            setTimeout(function () {


                hideBanner();


            }, 4000);


        };

    }





    // =================================
    // BETA LOGIN
    // =================================


    if (betaLoginBtn) {


        betaLoginBtn.onclick = function () {


            const email =
                betaEmail.value
                .trim()
                .toLowerCase();



            const password =
                betaPassword.value
                .trim();




            if (!email || !password) {


                showBanner(

                    "Missing Information",

                    "Please enter an email and password."

                );


                return;


            }





            let users =
                JSON.parse(

                    localStorage.getItem(
                        "voluntaUsers"
                    )

                ) || [];







            let currentUser =
                users.find(

                    user =>
                    user.email === email

                );






            // CREATE NEW BETA ACCOUNT

            if (!currentUser) {


                currentUser = {


                    studentId:

                        "VT-" +

                        Math.floor(

                            10000 +

                            Math.random() *

                            90000

                        ),



                    name:

                        email.split("@")[0],



                    email:

                        email,



                    password:

                        password,



                    verified:

                        true,



                    betaTester:

                        true,



                    accountType:

                        "student",



                    hours:

                        0,



                    goal:

                        50,



                    activities:

                        []


                };



                users.push(
                    currentUser
                );



                localStorage.setItem(

                    "voluntaUsers",

                    JSON.stringify(users)

                );


            }






            // LOGIN EXISTING BETA USER

            else {


                if (
                    currentUser.password !== password
                ) {


                    showBanner(

                        "Incorrect Password",

                        "Try again."

                    );


                    return;


                }


            }






            localStorage.setItem(

                "voluntaCurrentUser",

                JSON.stringify(currentUser)

            );






            window.location.href =

                "dashboard.html";



        };


    }
        // =================================
    // GOOGLE LOGIN SETUP
    // =================================

    window.handleGoogleLogin = function (response) {


        try {


            // Decode Google token

            const payload =
                JSON.parse(

                    atob(

                        response.credential
                            .split(".")[1]

                    )

                );





            const email =
                payload.email;



            const name =
                payload.name;



            const picture =
                payload.picture;






            // =================================
            // EMAIL CHECK
            // =================================

            /*
                TEMPORARY:

                This allows testing while
                Rocklin Google accounts are
                unavailable.

                Later we can change this to:

                @rocklinusd.org

            */



            if (!email.includes("@")) {


                showBanner(

                    "Invalid Account",

                    "Please use a valid Google account."

                );


                return;


            }








            // =================================
            // LOAD USERS
            // =================================


            let users =

                JSON.parse(

                    localStorage.getItem(
                        "voluntaUsers"
                    )

                )

                || [];







            let currentUser =

                users.find(

                    user =>

                    user.email === email

                );







            // =================================
            // CREATE GOOGLE USER
            // =================================


            if (!currentUser) {


                currentUser = {


                    studentId:

                        "VT-" +

                        Math.floor(

                            10000 +

                            Math.random() *

                            90000

                        ),



                    name:

                        name,



                    email:

                        email,



                    picture:

                        picture,



                    verified:

                        true,



                    betaTester:

                        false,



                    accountType:

                        "student",



                    hours:

                        0,



                    goal:

                        50,



                    activities:

                        []


                };




                users.push(

                    currentUser

                );




                localStorage.setItem(

                    "voluntaUsers",

                    JSON.stringify(users)

                );


            }








            // =================================
            // SAVE ACTIVE USER
            // =================================


            localStorage.setItem(

                "voluntaCurrentUser",

                JSON.stringify(currentUser)

            );







            // =================================
            // DASHBOARD
            // =================================


            window.location.href =

                "dashboard.html";





        }


        catch(error) {


            console.error(

                "Google Login Error:",

                error

            );



            showBanner(

                "Login Error",

                "Something went wrong with Google login."

            );


        }


    };

        // =================================
    // FINAL SAFETY CHECKS
    // =================================


    // Hide banner when clicking elsewhere

    document.addEventListener(
        "click",
        function(event) {


            if (
                authNoticeBanner &&
                !authNoticeBanner.contains(event.target)
            ) {

                hideBanner();

            }


        }
    );





}); 
// END OF DOM CONTENT LOADED
