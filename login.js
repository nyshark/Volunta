document.addEventListener("DOMContentLoaded", function () {


// ===============================
// WELCOME INTRO SEQUENCE
// ===============================

const welcomeIntro = document.getElementById("welcomeIntro");
const roleSelection = document.getElementById("roleSelection");


setTimeout(function () {


    if (welcomeIntro) {

        welcomeIntro.classList.add("fade-out");

    }



    if (roleSelection) {


        roleSelection.style.display = "flex";


        setTimeout(function () {


            roleSelection.classList.remove(
                "hidden-screen"
            );


        }, 50);


    }


}, 3000);





    // ===============================
    // ELEMENTS
    // ===============================


    const studentRoleBtn =
        document.getElementById("studentRoleBtn");


    const organizerRoleBtn =
        document.getElementById("organizerRoleBtn");


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





    // ===============================
    // APPROVED SCHOOLS
    // ===============================


    const approvedSchools = [

        "Rocklin High School",

        "Whitney High School",

        "Victory High School",

        "Granite Oaks Middle School",

        "Spring View Middle School",

        "Rocklin Independent Charter Academy"

    ];






    // ===============================
    // BANNERS
    // ===============================


    function showBanner(title, text) {


        if (!banner) return;


        bannerTitle.textContent = title;

        bannerDesc.textContent = text;


        banner.classList.add(
            "auth-banner-show"
        );


    }





    function hideBanner() {


        if (banner) {

            banner.classList.remove(
                "auth-banner-show"
            );

        }

    }






    // ===============================
    // ROLE SELECTION
    // ===============================


    if (studentRoleBtn) {


        studentRoleBtn.onclick = function () {


            roleSelection.classList.add(
                "fade-out"
            );


            setTimeout(function () {


                roleSelection.style.display = "none";


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

        const maintenanceBanner =
            document.createElement("div");


        maintenanceBanner.className =
            "maintenance-popup";

// PLACEHOLDER IMG //
        maintenanceBanner.innerHTML = `

            <div class="maintenance-content">

                <h3>
                    APOLOGIES!! 
                </h3>

                <p>
                    This feature is currently unavailable at the moment
                </p>
            
                <img  
                    src="twinkle.png"
                    alt="maintenance sparkle">

            </div>

        `;


        document.body.appendChild(
            maintenanceBanner
        );


        setTimeout(() => {

            maintenanceBanner.classList.add(
                "maintenance-hide"
            );


            setTimeout(() => {

                maintenanceBanner.remove();

            }, 600);


        }, 3500);


    };

}









    // ===============================
    // LOGIN / REGISTER SWITCH
    // ===============================


    if (tabLogin) {


        tabLogin.onclick = function () {


            loginMode = true;



            tabLogin.classList.add(
                "active"
            );


            tabRegister.classList.remove(
                "active"
            );



            submitBtn.textContent =
                "log in";



            formHeading.textContent =
                "welcome back :)";



            formSub.textContent =
                "hi again!";



            if (schoolGroup) {


                schoolGroup.classList.add(
                    "hidden-field"
                );


            }



            hideBanner();


        };


    }







    if (tabRegister) {


        tabRegister.onclick = function () {


            loginMode = false;



            tabRegister.classList.add(
                "active"
            );


            tabLogin.classList.remove(
                "active"
            );



            submitBtn.textContent =
                "sign up";



            formHeading.textContent =
                "welcome!";



            formSub.textContent =
                "hello!";



            if (schoolGroup) {


                schoolGroup.classList.remove(
                    "hidden-field"
                );


            }



        };


    }








    // ===============================
    // ID GENERATOR
    // ===============================


    function createID() {


        return "VT-" +
        Math.floor(
            10000 + Math.random() * 90000
        );


    }









    // ===============================
    // FORM SUBMISSION
    // ===============================


    authForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();



            let users =
                JSON.parse(
                    localStorage.getItem(
                        "voluntaUsers"
                    )
                )
                || [];





            const emailValue =
                email.value
                .trim()
                .toLowerCase();





            if (loginMode) {


                let user =
                    users.find(
                        u =>
                        u.email === emailValue
                    );



                if (!user) {


                    showBanner(
                        "Not Found",
                        "Account does not exist."
                    );


                    return;


                }





                if (
                    user.password !==
                    password.value
                ) {


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



                window.location.href =
                    "dashboard.html";



                return;


            }







            // ===============================
            // REGISTRATION
            // ===============================



            if (
                !approvedSchools.includes(
                    school.value
                )
            ) {



                showBanner(
                    "School Required",
                    "Please select a Rocklin school."
                );


                return;


            }







            const alreadyExists =
                users.some(
                    u =>
                    u.email === emailValue
                );





            if (alreadyExists) {


                showBanner(
                    "Email Taken",
                    "This account already exists."
                );


                return;


            }









            const newUser = {


                studentId:
                    createID(),



                email:
                    emailValue,



                password:
                    password.value,



                school:
                    school.value,



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







            users.push(newUser);



            localStorage.setItem(

                "voluntaUsers",

                JSON.stringify(users)

            );





            localStorage.setItem(

                "voluntaCurrentUser",

                JSON.stringify(newUser)

            );





            window.location.href =
                "dashboard.html";





        }

    );


});
