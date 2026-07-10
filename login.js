document.addEventListener("DOMContentLoaded", function () {


    // =================================
    // WELCOME INTRO SEQUENCE
    // =================================


    const welcomeIntro =
        document.getElementById("welcomeIntro");


    const roleSelection =
        document.getElementById("roleSelection");



    setTimeout(function () {


        if (welcomeIntro) {

            welcomeIntro.classList.add(
                "fade-out"
            );

        }



        if (roleSelection) {

            roleSelection.style.display = "flex";

            roleSelection.classList.remove(
                "hidden-screen"
            );

        }


    }, 3000);





    // =================================
    // ELEMENTS
    // =================================


    const studentRoleBtn =
        document.getElementById(
            "studentRoleBtn"
        );


    const organizerRoleBtn =
        document.getElementById(
            "organizerRoleBtn"
        );


    const authSection =
        document.getElementById(
            "authSection"
        );


    const authNoticeBanner =
        document.getElementById(
            "authNoticeBanner"
        );


    const authNoticeTitle =
        document.getElementById(
            "authNoticeTitle"
        );


    const authNoticeDesc =
        document.getElementById(
            "authNoticeDesc"
        );






    // =================================
    // BANNER FUNCTION
    // =================================


    function showBanner(title, message) {


        if (!authNoticeBanner) {
            return;
        }


        authNoticeTitle.textContent =
            title;


        authNoticeDesc.textContent =
            message;


        authNoticeBanner.classList.add(
            "auth-banner-show"
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


        };


    }




});







// =================================
// GOOGLE LOGIN CALLBACK
// =================================


function handleGoogleLogin(response) {



    // Decode Google credential


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
    // ROCKLIN ACCOUNT CHECK
    // =================================


    const domain =
        email.split("@")[1];



    if (
        domain !== "rocklinusd.org"
    ) {


        alert(
            "Please use your Rocklin student Google account."
        );


        return;


    }







    // =================================
    // LOAD EXISTING USERS
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
    // CREATE NEW PROFILE
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
    // SAVE CURRENT USER
    // =================================


    localStorage.setItem(

        "voluntaCurrentUser",

        JSON.stringify(currentUser)

    );






    // =================================
    // GO TO DASHBOARD
    // =================================


    window.location.href =
        "dashboard.html";



}
