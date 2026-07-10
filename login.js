```javascript
console.log("VOLUNTA LOGIN SCRIPT ACTIVE");

// VOLUNTA LOGIN SYSTEM UPDATE
// role selection + student verification + account upgrades


document.addEventListener("DOMContentLoaded", function () {


    // ==============================
    // ELEMENTS
    // ==============================


    const roleSelection = document.querySelector("#roleSelection");
    const studentRoleBtn = document.querySelector("#studentRoleBtn");
    const organizerRoleBtn = document.querySelector("#organizerRoleBtn");

    const authSection = document.querySelector("#authSection");


    const tabLogin = document.querySelector("#tabLogin");
    const tabRegister = document.querySelector("#tabRegister");


    const formHeading = document.querySelector("#formHeading");
    const formSub = document.querySelector("#formSub");


    const submitBtn = document.querySelector("#submitBtn");
    const authForm = document.querySelector("#authForm");


    const authNoticeBanner = document.querySelector("#authNoticeBanner");
    const authNoticeTitle = document.querySelector("#authNoticeTitle");
    const authNoticeDesc = document.querySelector("#authNoticeDesc");


    const schoolGroup = document.querySelector("#schoolGroup");
    const schoolSelect = document.querySelector("#school");


    const codeGroup = document.querySelector("#codeGroup");
    const schoolCode = document.querySelector("#schoolCode");


    const mainBrandTitle = document.querySelector("#mainBrandTitle");
    const themeToggleBtn = document.querySelector("#themeToggleBtn");



    // ==============================
    // APP STATE
    // ==============================


    let isLoginMode = true;

    let selectedRole = null;


    // change this to true later when schools get official codes
    const REQUIRE_SCHOOL_CODE = false;



    // ==============================
    // SCHOOL DATABASE
    // ==============================


    const approvedSchools = [

        "Rocklin High School",
        "Whitney High School",
        "Victory High School",
        "Granite Oaks Middle School",
        "Spring View Middle School",
        "Rocklin Independent Charter Academy"

    ];




    // ==============================
    // BRAND TITLE
    // ==============================


    function updateBrandTitleText() {


        if (!mainBrandTitle) return;


        setTimeout(function () {


            const isDay =
                document.body.classList.contains("day-mode");


            if (isDay) {

                mainBrandTitle.textContent =
                    " ⋆⋅☀︎VOLUNTA☀︎⋅⋆ ";

            } else {

                mainBrandTitle.textContent =
                    " ₊✮.VOLUNTA.✮₊ ";

            }


        }, 20);

    }


    updateBrandTitleText();



    if (themeToggleBtn) {

        themeToggleBtn.addEventListener(
            "click",
            updateBrandTitleText
        );

    }





    // ==============================
    // NOTIFICATION SYSTEM
    // ==============================


    function triggerBanner(title, description) {


        if (!authNoticeBanner) return;


        authNoticeTitle.textContent = title;

        authNoticeDesc.textContent = description;


        authNoticeBanner.classList.add(
            "auth-banner-show"
        );

    }





    function clearBanner() {


        if (authNoticeBanner) {

            authNoticeBanner.classList.remove(
                "auth-banner-show"
            );

        }

    }





    // ==============================
    // ROLE SELECTION
    // ==============================


    studentRoleBtn.addEventListener(
        "click",
        function () {


            selectedRole = "student";


            roleSelection.classList.add(
                "role-hide"
            );


            setTimeout(function () {


                roleSelection.style.display = "none";


                authSection.classList.remove(
                    "auth-hidden"
                );


                authSection.classList.add(
                    "auth-visible"
                );


            }, 400);


        }
    );






    organizerRoleBtn.addEventListener(
        "click",
        function () {


            triggerBanner(
                "Coming Soon!",
                "Service Organizer accounts are currently being developed ✩"
            );


        }
    );








    // ==============================
    // LOGIN / REGISTER SWITCH
    // ==============================


    tabLogin.addEventListener(
        "click",
        function () {


            isLoginMode = true;


            tabLogin.classList.add("active");

            tabRegister.classList.remove("active");


            formHeading.textContent =
                "welcome back :)";


            formSub.textContent =
                "hi again!";


            submitBtn.textContent =
                "log in";


            hideSignupFields();

            clearBanner();


        }
    );







    tabRegister.addEventListener(
        "click",
        function () {


            isLoginMode = false;


            tabRegister.classList.add("active");

            tabLogin.classList.remove("active");



            formHeading.textContent =
                "welcome!";


            formSub.textContent =
                "hello!";



            submitBtn.textContent =
                "sign up";



            showSignupFields();


            clearBanner();


        }
    );








    function showSignupFields(){


        if (!schoolGroup) return;


        schoolGroup.classList.remove(
            "hidden-field"
        );


        if (REQUIRE_SCHOOL_CODE) {

            codeGroup.classList.remove(
                "hidden-field"
            );

        }


    }






    function hideSignupFields(){


        if (!schoolGroup) return;


        schoolGroup.classList.add(
            "hidden-field"
        );


        codeGroup.classList.add(
            "hidden-field"
        );


    }










    // ==============================
    // STUDENT ID GENERATOR
    // ==============================


    function generateStudentID(){


        const random =
            Math.floor(
                10000 +
                Math.random() * 90000
            );


        return "VT-" + random;


    }









    // ==============================
    // ACCOUNT HANDLER
    // ==============================


    authForm.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            const email =
                document.querySelector("#email")
                .value
                .trim()
                .toLowerCase();



            const password =
                document.querySelector("#password")
                .value;



            if (!email || !password){


                triggerBanner(
                    "Missing Information",
                    "please fill out everything :)"
                );


                return;

            }





            const users =
                JSON.parse(
                    localStorage.getItem(
                        "voluntaUsers"
                    )
                ) || [];






            // ======================
            // LOGIN
            // ======================


            if(isLoginMode){



                const foundUser =
                    users.find(
                        user =>
                        user.email === email
                    );



                if(!foundUser){


                    triggerBanner(
                        "Account Not Found",
                        "try signing up first!"
                    );


                    return;

                }




                if(foundUser.password !== password){


                    triggerBanner(
                        "Incorrect Password",
                        "try again!"
                    );


                    return;

                }





                localStorage.setItem(
                    "voluntaCurrentUser",
                    JSON.stringify(foundUser)
                );



                triggerBanner(
                    "Access Granted!",
                    "logging you in ✩"
                );



                setTimeout(
                    function(){

                        window.location.href =
                            "dashboard.html";

                    },
                    800
                );




                return;

            }









            // ======================
            // REGISTER
            // ======================




            const exists =
                users.some(
                    user =>
                    user.email === email
                );




            if(exists){


                triggerBanner(
                    "Email Taken",
                    "try logging in instead!"
                );


                return;

            }






            if(!schoolSelect.value){


                triggerBanner(
                    "School Required",
                    "please select your school."
                );


                return;

            }





            if(
                !approvedSchools.includes(
                    schoolSelect.value
                )
            ){


                triggerBanner(
                    "School Not Approved",
                    "registration is currently limited to Rocklin schools."
                );


                return;

            }








            const newUser = {


                studentId:
                    generateStudentID(),


                email:
                    email,


                password:
                    password,


                accountType:
                    selectedRole || "student",


                school:
                    schoolSelect.value,


                verified:
                    true,


                joinDate:
                    new Date()
                    .toISOString()
                    .split("T")[0],


                hours:
                    0,


                goal:
                    50,


                badges:
                    [],


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





            triggerBanner(
                "Registration Successful!",
                "welcome to VOLUNTA ✩"
            );




            setTimeout(
                function(){

                    window.location.href =
                        "dashboard.html";

                },
                1200
            );




        }
    );


});
```
