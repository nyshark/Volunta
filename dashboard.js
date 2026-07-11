// ======================================
// VOLUNTA DASHBOARD.JS
// PART 1/3
// ======================================


document.addEventListener("DOMContentLoaded", function(){



// ======================================
// ACCOUNT LOADING
// ======================================


const currentUser =
JSON.parse(
    localStorage.getItem(
        "voluntaCurrentUser"
    )
);



const userName =
document.getElementById(
    "userName"
);



const userEmail =
document.getElementById(
    "userEmail"
);



const studentID =
document.getElementById(
    "studentID"
);



const userPicture =
document.getElementById(
    "userPicture"
);





if(currentUser){


    if(userName){

        userName.textContent =
        "Welcome " +
        (currentUser.name || "✦");

    }



    if(userEmail){

        userEmail.textContent =
        currentUser.betaTester
        ?
        "BETA TESTER ACCOUNT"
        :
        (
            currentUser.email ||
            "loading account..."
        );

    }



    if(studentID){

        studentID.textContent =
        currentUser.betaTester
        ?
        ""
        :
        (
        "Student ID: " +
        (
            currentUser.studentId ||
            "N/A"
        )
        );

    }



    if(
        userPicture &&
        currentUser.picture
    ){

        userPicture.src =
        currentUser.picture;

    }



}



else{


    if(userName)
        userName.textContent =
        "Welcome ✦";


    if(userEmail)
        userEmail.textContent =
        "loading account...";


    if(studentID)
        studentID.textContent =
        "Student ID: loading...";


}









// ======================================
// ACCOUNT MENU
// ======================================


const menuToggleBtn =
document.getElementById(
    "menuToggleBtn"
);



const accountMenu =
document.getElementById(
    "accountMenu"
);



const menuCloseBtn =
document.getElementById(
    "menuCloseBtn"
);



const detailsMenuBtn =
document.getElementById(
    "detailsMenuBtn"
);



const detailsBox =
document.getElementById(
    "accountDetailsBox"
);






if(
    menuToggleBtn &&
    accountMenu
){

    menuToggleBtn.addEventListener(
        "click",
        function(){

            accountMenu.classList.toggle(
                "show"
            );

        }
    );

}



if(
    menuCloseBtn &&
    accountMenu
){

    menuCloseBtn.addEventListener(
        "click",
        function(){

            accountMenu.classList.remove(
                "show"
            );

        }
    );

}





if(
    detailsMenuBtn &&
    detailsBox
){


    detailsMenuBtn.addEventListener(
        "click",
        function(){


            detailsBox.innerHTML = `

            <h4>
            Account Details
            </h4>


            <p>
            ${
            currentUser?.betaTester
            ?
            "BETA TESTER ACCOUNT"
            :
            "Student Account"
            }
            </p>


            <p>
            Student ID:
            ${
            currentUser?.studentId ||
            "N/A"
            }
            </p>


            `;


        }
    );


}









// ======================================
// STORAGE KEYS
// ======================================



const accountEmail =
currentUser
?
currentUser.email
:
"default_user";




const activitiesKey =
"voluntaActivities_" +
accountEmail;



const goalKey =
"voluntaGoal_" +
accountEmail;









// ======================================
// ELEMENT REFERENCES
// ======================================



const tabGoal =
document.getElementById(
    "tabGoal"
);



const tabLedger =
document.getElementById(
    "tabLedger"
);



const goalSection =
document.getElementById(
    "goalSection"
);



const ledgerSection =
document.getElementById(
    "ledgerSection"
);




const goalForm =
document.getElementById(
    "goalForm"
);



const activitiesForm =
document.getElementById(
    "activitiesForm"
);



const ledgerList =
document.getElementById(
    "ledgerList"
);




const totalHoursDisplay =
document.getElementById(
    "totalHours"
);



const progressPercentDisplay =
document.getElementById(
    "progressPercent"
);



const goalStatusDesc =
document.getElementById(
    "goalStatusDesc"
);



const progressBarFill =
document.getElementById(
    "progressBarFill"
);




const achievementBanner =
document.getElementById(
    "achievementBanner"
);



const achievementTitle =
document.getElementById(
    "achievementTitle"
);



const achievementDesc =
document.getElementById(
    "achievementDesc"
);




const actStartInput =
document.getElementById(
    "actStart"
);



const timeInInput =
document.getElementById(
    "timeIn"
);



const timeOutInput =
document.getElementById(
    "timeOut"
);









// ======================================
// DATA
// ======================================



let activitiesMemory =
JSON.parse(
    localStorage.getItem(
        activitiesKey
    )
)
||
[];




let studentTargetGoal =
parseInt(
    localStorage.getItem(
        goalKey
    )
)
||
0;




let runningTotalHours = 0;





const milestoneKey =
"voluntaMilestones_" + accountEmail;


let unlockedMilestones =
JSON.parse(
    localStorage.getItem(milestoneKey)
)
||
{

    quarter:false,

    half:false,

    threeQuarters:false,

    complete:false

};

// ======================================
// VOLUNTA DASHBOARD.JS
// PART 2/3
// ======================================


// ======================================
// TIME FORMAT HELPER
// ======================================

function formatTime(timeString){

    if(!timeString)
        return "";


    const parts =
    timeString.split(":");


    if(parts.length < 2)
        return timeString;


    let hour =
    Number(parts[0]);


    const minute =
    parts[1];


    const ampm =
    hour >= 12
    ?
    "PM"
    :
    "AM";


    hour =
    hour % 12;


    if(hour === 0)
        hour = 12;


    return (
        hour +
        ":" +
        minute +
        " " +
        ampm
    );

}

// ======================================
// INPUT HELPERS
// ======================================


function setupDynamicInput(element, type){


    if(!element)
        return;



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









// ======================================
// TAB SWITCHING
// ======================================


if(
    tabGoal &&
    tabLedger
){


    tabGoal.addEventListener(
        "click",
        function(){


            tabGoal.classList.add(
                "active"
            );


            tabLedger.classList.remove(
                "active"
            );



            if(goalSection){

                goalSection.classList.remove(
                    "ledger-section-hidden"
                );

            }



            if(ledgerSection){

                ledgerSection.classList.add(
                    "ledger-section-hidden"
                );

            }


        }
    );





    tabLedger.addEventListener(
        "click",
        function(){


            tabLedger.classList.add(
                "active"
            );


            tabGoal.classList.remove(
                "active"
            );



            if(ledgerSection){

                ledgerSection.classList.remove(
                    "ledger-section-hidden"
                );

            }



            if(goalSection){

                goalSection.classList.add(
                    "ledger-section-hidden"
                );

            }


        }
    );


}









// ======================================
// ACHIEVEMENTS
// ======================================


function showAchievement(title, desc){


    if(
        !achievementBanner ||
        !achievementTitle ||
        !achievementDesc
    ){

        return;

    }



    achievementTitle.textContent =
    title;



    achievementDesc.textContent =
    desc;



    achievementBanner.classList.add(
        "auth-banner-show"
    );

    setTimeout(
    function(){

        achievementBanner.classList.remove(
            "auth-banner-show"
        );

    },
    5000
);

}









// ======================================
// PROGRESS UPDATE
// ======================================


function updateProgress(){


    let total = 0;



    activitiesMemory.forEach(
        function(activity){


            total += Number(
                activity.hours
            );


        }
    );



    runningTotalHours =
    total;



    if(totalHoursDisplay){

        totalHoursDisplay.textContent =
        total.toFixed(1);

    }







    if(studentTargetGoal > 0){



        let percent =
        Math.round(
            (
                total /
                studentTargetGoal
            )
            *
            100
        );



        if(progressPercentDisplay){

            progressPercentDisplay.textContent =
            percent + "%";

        }



        if(progressBarFill){

            progressBarFill.style.width =
            Math.min(
                percent,
                100
            )
            +
            "%";

        }



        if(goalStatusDesc){

            goalStatusDesc.textContent =
            "Target Goal Progress (" +
            studentTargetGoal +
            " hrs set)";

        }






        if(
            percent >= 100 &&
            !unlockedMilestones.complete
        ){


            unlockedMilestones.complete =
            true;

            localStorage.setItem(
                milestoneKey,
                JSON.stringify(unlockedMilestones)
            );


            showAchievement(
                "YOU DID IT!!",
                "ദ്ദി(｡•̀ᴗ-)✧ Goal completed!"
            );


        }



        else if(
            percent >= 75 &&
            !unlockedMilestones.threeQuarters
        ){


            unlockedMilestones.threeQuarters =
            true;

            localStorage.setItem(
                milestoneKey,
                JSON.stringify(unlockedMilestones)
            );


            showAchievement(
                "75% COMPLETED",
                "Almost there!! Keep going ✦"
            );


        }



        else if(
            percent >= 50 &&
            !unlockedMilestones.half
        ){


            unlockedMilestones.half =
            true;

            localStorage.setItem(
                milestoneKey,
                JSON.stringify(unlockedMilestones)
            );

            showAchievement(
                "50% COMPLETE",
                "Halfway finished!!"
            );


        }



        else if(
            percent >= 25 &&
            !unlockedMilestones.quarter
        ){


            unlockedMilestones.quarter =
            true;

            localStorage.setItem(
                milestoneKey,
                JSON.stringify(unlockedMilestones)
            );

            showAchievement(
                "25% COMPLETE",
                "Great start!! Keep going ✦"
            );


        }



    }


    else{


        if(progressPercentDisplay){

            progressPercentDisplay.textContent =
            "0%";

        }



        if(progressBarFill){

            progressBarFill.style.width =
            "0%";

        }



        if(goalStatusDesc){

            goalStatusDesc.textContent =
            "Target Goal: none";

        }


    }


}







function formatTimeRange(time){

    if(!time)
        return "";


    const parts =
    time.split(" - ");


    return parts.map(function(t){


        if(!t)
            return "";


        let [hour, minute] =
        t.split(":");


        hour =
        Number(hour);



        const ampm =
        hour >= 12
        ?
        "PM"
        :
        "AM";



        hour =
        hour % 12;



        if(hour === 0)
            hour = 12;



        return (
            " • " +
            hour +
            ":" +
            minute +
            " " +
            ampm
        );


    }).join(" - ");


}

// ======================================
// RENDER ACTIVITIES
// ======================================


function renderActivities(){


    if(!ledgerList)
        return;



    ledgerList.innerHTML = "";



    activitiesMemory.forEach(
        function(activity,index){



            const li =
            document.createElement(
                "li"
            );



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


                <br>


                <small>
                ${activity.date || ""}

                ${formatTimeRange(activity.time)}

                </small>

            </div>



            <div class="ledger-right-wrap">


                <span>
                ${activity.hours} hrs
                </span>



                <button
                class="filter-btn ledger-delete-override">

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



            ledgerList.appendChild(
                li
            );


        }
    );


}

// ======================================
// VOLUNTA DASHBOARD.JS
// PART 3/3
// ======================================





// ======================================
// GOAL FORM
// ======================================


if(goalForm){


    goalForm.addEventListener(
        "submit",
        function(event){


            event.preventDefault();



            const targetInput =
            document.getElementById(
                "targetInput"
            );



            if(!targetInput)
                return;

            const value =
            Number(targetInput.value);



            if(value > 0){


                studentTargetGoal =
                value;



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









// ======================================
// ACTIVITY FORM
// ======================================


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
            if(
                activityHours > 24
            ){

                showAchievement(
                    "TOO MANY HOURS",
                    "An activity cannot be longer than 24 hours."
            );

            return;

        }


            if(
                !activityName ||
                !activityType ||
                activityHours <= 0
            ){

                showAchievement(
                    "MISSING INFORMATION",
                    "Please complete all activity fields."
                );


                return;

            }






            const newActivity = {


                name:
                activityName,



                type:
                activityType,



                hours:
                activityHours,



                date:
                actStartInput
                ?
                actStartInput.value
                :
                "",



                time:
                (
                    timeInInput
                    ?
                    timeInInput.value
                    :
                    ""
                )
                +
                " - " +
                (
                    timeOutInput
                    ?
                    timeOutInput.value
                    :
                    ""
                )


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
                actStartInput.type =
                "text";



            if(timeInInput)
                timeInInput.type =
                "text";



            if(timeOutInput)
                timeOutInput.type =
                "text";



        }
    );


}









// ======================================
// INITIAL LOAD
// ======================================


renderActivities();


updateProgress();









// ======================================
// PROFILE IMAGE FALLBACK
// ======================================


if(userPicture){


    userPicture.onerror =
    function(){


        this.src =
        "twinkle.png";


    };


}









// ======================================
// LOGOUT
// ======================================


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









// ======================================
// THEME BUTTON REFRESH
// ======================================


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


                    updateProgress();


                },
                100
            );


        }
    );


}






});
