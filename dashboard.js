// ======================================
// VOLUNTA DASHBOARD.JS
// PART 1/2
// ======================================


document.addEventListener("DOMContentLoaded", function () {



    // ===============================
    // ACCOUNT LOADING
    // ===============================


    const currentUser =
        JSON.parse(localStorage.getItem("voluntaCurrentUser"));



    const userName =
        document.getElementById("userName");


    const userEmail =
        document.getElementById("userEmail");


    const studentID =
        document.getElementById("studentID");


    const userPicture =
        document.getElementById("userPicture");




    if (currentUser) {


        userName.textContent =
            "Welcome " + (currentUser.name || "✦");



        if (currentUser.betaTester) {


            userEmail.textContent =
                "BETA TESTER ACCOUNT";


            studentID.textContent =
                "";

        }


        else {


            userEmail.textContent =
                currentUser.email || "loading account...";


            studentID.textContent =
                "Student ID: " +
                (currentUser.studentId || "loading...");


        }





        if (currentUser.picture) {


            userPicture.src =
                currentUser.picture;


        }



    }

    else {


        userName.textContent =
            "Welcome ✦";


        userEmail.textContent =
            "loading account...";


        studentID.textContent =
            "Student ID: loading...";


    }







    // ===============================
    // ACCOUNT MENU
    // ===============================


    const menuToggleBtn =
        document.getElementById("menuToggleBtn");


    const accountMenu =
        document.getElementById("accountMenu");


    const menuCloseBtn =
        document.getElementById("menuCloseBtn");


    const detailsMenuBtn =
        document.getElementById("detailsMenuBtn");


    const detailsBox =
        document.getElementById("accountDetailsBox");





    if (menuToggleBtn && accountMenu) {


        menuToggleBtn.addEventListener(
            "click",
            function () {


                accountMenu.classList.toggle(
                    "menu-open"
                );


            }
        );


    }





    if (menuCloseBtn && accountMenu) {


        menuCloseBtn.addEventListener(
            "click",
            function () {


                accountMenu.classList.remove(
                    "menu-open"
                );


            }
        );


    }






    if (detailsMenuBtn && detailsBox) {


        detailsMenuBtn.addEventListener(
            "click",
            function () {



                if (
                    currentUser &&
                    currentUser.betaTester
                ) {



                    detailsBox.innerHTML = `

                    <h4>
                    Account Details
                    </h4>

                    <p>
                    BETA TESTER ACCOUNT
                    </p>

                    <p>
                    Student ID:
                    ${currentUser.studentId || "N/A"}
                    </p>

                    `;


                }


                else {



                    detailsBox.innerHTML = `

                    <h4>
                    Account Details
                    </h4>

                    <p>
                    Student Account
                    </p>

                    <p>
                    Student ID:
                    ${currentUser?.studentId || "N/A"}
                    </p>

                    `;


                }



            }
        );


    }









    // ===============================
    // USER STORAGE KEYS
    // ===============================



    const accountEmail =
        currentUser ?
        currentUser.email :
        "default_user";



    const activitiesKey =
        "voluntaActivities_" + accountEmail;



    const goalKey =
        "voluntaGoal_" + accountEmail;









    // ===============================
    // ELEMENT REFERENCES
    // ===============================



    const tabGoal =
        document.getElementById("tabGoal");


    const tabLedger =
        document.getElementById("tabLedger");


    const goalSection =
        document.getElementById("goalSection");


    const ledgerSection =
        document.getElementById("ledgerSection");



    const goalForm =
        document.getElementById("goalForm");


    const activitiesForm =
        document.getElementById("activitiesForm");



    const ledgerList =
        document.getElementById("ledgerList");




    const totalHoursDisplay =
        document.getElementById("totalHours");


    const progressPercentDisplay =
        document.getElementById("progressPercent");


    const goalStatusDesc =
        document.getElementById("goalStatusDesc");


    const progressBarFill =
        document.getElementById("progressBarFill");




    const achievementBanner =
        document.getElementById("achievementBanner");


    const achievementTitle =
        document.getElementById("achievementTitle");


    const achievementDesc =
        document.getElementById("achievementDesc");





    const actStartInput =
        document.getElementById("actStart");


    const timeInInput =
        document.getElementById("timeIn");


    const timeOutInput =
        document.getElementById("timeOut");







    // ===============================
    // DATA
    // ===============================



    let activitiesMemory =
        JSON.parse(
            localStorage.getItem(activitiesKey)
        ) || [];



    let studentTargetGoal =
        parseInt(
            localStorage.getItem(goalKey)
        ) || 0;



    let runningTotalHours = 0;





    let unlockedMilestones = {

        quarter:false,

        half:false,

        threeQuarters:false,

        complete:false

    };

        // ===============================
    // INPUT TYPE HELPERS
    // ===============================


    function setupDynamicInput(element, type){


        if(!element) return;



        element.addEventListener(
            "focus",
            function(){

                this.type = type;

            }
        );



        element.addEventListener(
            "blur",
            function(){

                if(!this.value){

                    this.type = "text";

                }

            }
        );


    }



    setupDynamicInput(
        actStartInput,
        "date"
    );


    setupDynamicInput(
        timeInInput,
        "time"
    );


    setupDynamicInput(
        timeOutInput,
        "time"
    );







    // ===============================
    // TAB SWITCHING
    // ===============================



    if(tabGoal){


        tabGoal.addEventListener(
            "click",
            function(){


                tabGoal.classList.add(
                    "active"
                );


                tabLedger.classList.remove(
                    "active"
                );


                goalSection.classList.remove(
                    "ledger-section-hidden"
                );


                ledgerSection.classList.add(
                    "ledger-section-hidden"
                );


            }
        );


    }




    if(tabLedger){


        tabLedger.addEventListener(
            "click",
            function(){


                tabLedger.classList.add(
                    "active"
                );


                tabGoal.classList.remove(
                    "active"
                );


                ledgerSection.classList.remove(
                    "ledger-section-hidden"
                );


                goalSection.classList.add(
                    "ledger-section-hidden"
                );


            }
        );


    }








    // ===============================
    // ACHIEVEMENTS
    // ===============================



    function showAchievement(title, desc){


        if(!achievementBanner)
            return;



        achievementTitle.textContent =
            title;


        achievementDesc.textContent =
            desc;



        achievementBanner.classList.add(
            "auth-banner-show"
        );



    }








    // ===============================
    // PROGRESS CALCULATIONS
    // ===============================



    function updateProgress(){


        let total = 0;



        activitiesMemory.forEach(
            function(activity){


                total += Number(
                    activity.hours
                );


            }
        );



        runningTotalHours = total;



        if(totalHoursDisplay){

            totalHoursDisplay.textContent =
                total.toFixed(1);

        }





        if(studentTargetGoal > 0){


            let percent =
                Math.round(
                    (total / studentTargetGoal)
                    *100
                );



            if(progressPercentDisplay){

                progressPercentDisplay.textContent =
                    percent + "%";

            }



            if(progressBarFill){

                progressBarFill.style.width =
                    Math.min(percent,100)
                    +"%";

            }



            if(goalStatusDesc){

                goalStatusDesc.textContent =
                "Target Goal Progress ("+
                studentTargetGoal+
                " hrs set)";

            }





            if(
                percent >= 100 &&
                !unlockedMilestones.complete
            ){

                unlockedMilestones.complete=true;


                showAchievement(
                    "YOU DID IT!!",
                    "ദ്ദി(｡•̀ᴗ-)✧ Goal completed!"
                );

            }



            else if(
                percent >=75 &&
                !unlockedMilestones.threeQuarters
            ){


                unlockedMilestones.threeQuarters=true;


                showAchievement(
                    "75% COMPLETED",
                    "Almost there!! Keep going ✦"
                );


            }



            else if(
                percent >=50 &&
                !unlockedMilestones.half
            ){


                unlockedMilestones.half=true;


                showAchievement(
                    "50% COMPLETE",
                    "Halfway finished!!"
                );


            }



            else if(
                percent >=25 &&
                !unlockedMilestones.quarter
            ){


                unlockedMilestones.quarter=true;


                showAchievement(
                    "25% COMPLETE",
                    "Great start!!"
                );


            }


        }


        else{


            if(progressPercentDisplay)
                progressPercentDisplay.textContent="0%";


            if(progressBarFill)
                progressBarFill.style.width="0%";


            if(goalStatusDesc)
                goalStatusDesc.textContent=
                "Target Goal: none";


        }



    }








    // ===============================
    // RENDER ACTIVITY LIST
    // ===============================



    function renderActivities(){


        if(!ledgerList)
            return;



        ledgerList.innerHTML="";



        activitiesMemory.forEach(
            function(activity,index){



                const li =
                document.createElement("li");



                li.className =
                "ledger-item-row-layout";



                li.innerHTML = `

                <div>

                <strong>
                ${activity.name}
                </strong>

                <span class="ledger-type-style">

                ${activity.type}

                </span>

                </div>


                <div class="ledger-right-wrap">

                <span>
                ${activity.hours} Hours
                </span>


                <button class="filter-btn">

                Delete

                </button>


                </div>

                `;



                li.querySelector("button")
                .addEventListener(
                    "click",
                    function(){


                        activitiesMemory.splice(
                            index,
                            1
                        );


                        localStorage.setItem(
                            activitiesKey,
                            JSON.stringify(
                                activitiesMemory
                            )
                        );


                        renderActivities();

                        updateProgress();


                    }
                );



                ledgerList.appendChild(li);



            }
        );


    }






    // ===============================
    // GOAL FORM
    // ===============================



    if(goalForm){


        goalForm.addEventListener(
            "submit",
            function(event){


                event.preventDefault();



                const value =
                Number(
                    document.getElementById(
                        "targetInput"
                    ).value
                );



                if(value > 0){


                    studentTargetGoal=value;



                    localStorage.setItem(
                        goalKey,
                        value
                    );



                    updateProgress();


                    goalForm.reset();


                }



            }
        );


    }
        // ===============================
    // ACTIVITY FORM
    // ===============================


    if(activitiesForm){


        activitiesForm.addEventListener(
            "submit",
            function(event){


                event.preventDefault();



                const activityName =
                document.getElementById(
                    "actName"
                ).value;



                const activityType =
                document.getElementById(
                    "actType"
                ).value;



                const activityHours =
                Number(
                    document.getElementById(
                        "actHours"
                    ).value
                );



                const activityDate =
                actStartInput.value;



                const startTime =
                timeInInput.value;



                const endTime =
                timeOutInput.value;




                const newActivity = {


                    name:
                    activityName,


                    type:
                    activityType,


                    hours:
                    activityHours,


                    date:
                    activityDate,


                    time:
                    startTime +
                    " - " +
                    endTime


                };



                activitiesMemory.unshift(
                    newActivity
                );



                localStorage.setItem(
                    activitiesKey,
                    JSON.stringify(
                        activitiesMemory
                    )
                );



                renderActivities();


                updateProgress();



                activitiesForm.reset();



                if(actStartInput)
                    actStartInput.type="text";


                if(timeInInput)
                    timeInInput.type="text";


                if(timeOutInput)
                    timeOutInput.type="text";


            }
        );


    }








    // ===============================
    // INITIAL LOAD
    // ===============================


    renderActivities();

    updateProgress();








    // ===============================
    // LOGOUT
    // ===============================


    const logoutButton =
    document.querySelector(
        ".logout-nav-override"
    );



    if(logoutButton){


        logoutButton.addEventListener(
            "click",
            function(){


                localStorage.removeItem(
                    "voluntaCurrentUser"
                );


            }
        );


    }








    // ===============================
    // THEME REFRESH
    // ===============================


    const themeButton =
    document.getElementById(
        "themeToggleBtn"
    );



    if(themeButton){


        themeButton.addEventListener(
            "click",
            function(){


                setTimeout(
                    function(){


                        renderActivities();


                    },
                    100
                );


            }
        );


    }





});
