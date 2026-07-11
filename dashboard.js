// ddashboard workspace
document.addEventListener("DOMContentLoaded", function() {
    // =============================
    // ACCOUNT LOADING
    // =============================

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


    if(currentUser){


        userName.textContent =
        "Welcome " + currentUser.name;


        if(currentUser.betaTester){

            userEmail.textContent =
            "BETA TESTER ACCOUNT";

        }
        else{

            userEmail.textContent =
            currentUser.email;

        }


        studentID.textContent =
        "Student ID: " + currentUser.studentId;



        if(currentUser.picture){

            userPicture.src =
            currentUser.picture;

        }


    }

    
    // profile gate!!
    const currentUser = JSON.parse(localStorage.getItem("voluntaCurrentUser"));

    // fall back to generic account (in case someone goes straight to dashboard.html...)
    const userEmail = currentUser ? currentUser.email : "default_user";
    const activitiesKey = "voluntaActivities_" + userEmail;
    const goalKey = "voluntaGoal_" + userEmail;

    // navigating tab things
    const tabGoal = document.querySelector("#tabGoal");
    const tabLedger = document.querySelector("#tabLedger");
    const goalSection = document.querySelector("#goalSection");
    const ledgerSection = document.querySelector("#ledgerSection");

    // tag selectorss
    const goalForm = document.querySelector("#goalForm");
    const activitiesForm = document.querySelector("#activitiesForm");
    const ledgerList = document.querySelector("#ledgerList");

    // selectors for dates
    const actStartInput = document.querySelector("#actStart");
    const timeInInput = document.querySelector("#timeIn");
    const timeOutInput = document.querySelector("#timeOut");

    // just visual text lol
    const totalHoursDisplay = document.querySelector("#totalHours");
    const progressPercentDisplay = document.querySelector("#progressPercent");
    const goalStatusDesc = document.querySelector("#goalStatusDesc");
    const progressBarFill = document.querySelector("#progressBarFill");

    // seelctors for badges/achievments
    const achievementBanner = document.querySelector("#achievementBanner");
    const achievementTitle = document.querySelector("#achievementTitle");
    const achievementDesc = document.querySelector("#achievementDesc");

    // trackinggg
    let activitiesMemory = JSON.parse(localStorage.getItem(activitiesKey)) || [];
    let runningTotalHours = 0.0;
    let studentTargetGoal = parseInt(localStorage.getItem(goalKey)) || 0;

    // blocks repeateda lerts
    let unlockedMilestones = {
        quarter: false,
        half: false,
        threeQuarters: false,
        complete: false
    };

    // to handle dates and times nicer
    function setupDynamicInput(element, alternateType) {
        if (!element) return;
        element.addEventListener("focus", function() {
            this.type = alternateType;
        });
        element.addEventListener("blur", function() {
            if (!this.value) this.type = "text";
        });
    }
    setupDynamicInput(actStartInput, "date");
    setupDynamicInput(timeInInput, "time");
    setupDynamicInput(timeOutInput, "time");

    // calc items instantly
    recalculateTotalHoursAndProgress();
    renderSpreadsheetList();

    // switch panels
    tabGoal.addEventListener("click", function() {
        tabGoal.classList.add("active");
        tabLedger.classList.remove("active");
        goalSection.classList.remove("ledger-section-hidden");
        ledgerSection.classList.add("ledger-section-hidden");
    });

    tabLedger.addEventListener("click", function() {
        tabLedger.classList.add("active");
        tabGoal.classList.remove("active");
        goalSection.classList.add("ledger-section-hidden");
        ledgerSection.classList.remove("ledger-section-hidden");
    });

    // total log calcs
    function recalculateTotalHoursAndProgress() {
        let currentSum = 0.0;

        for (let i = 0; i < activitiesMemory.length; i++) {
            currentSum += activitiesMemory[i].hours;
        }

        runningTotalHours = currentSum;
        totalHoursDisplay.textContent = runningTotalHours.toFixed(1);

        if (studentTargetGoal > 0) {
            let percentage = Math.round((runningTotalHours / studentTargetGoal) * 100);

            let barWidth = percentage;
            if (barWidth > 100) {
                barWidth = 100;
            }

            progressPercentDisplay.textContent = percentage + "%";
            progressBarFill.style.width = barWidth + "%";
            goalStatusDesc.textContent = "Target Goal Progress (" + studentTargetGoal + " hrs set)";

            if (percentage >= 100 && !unlockedMilestones.complete) {
                unlockedMilestones.complete = true;
                triggerAchievementAlert("YOU DID IT!! - CONGRATULATIONS", "ദ്ദി ( ｡•̀ ,< ) ✩‧₊");
            } else if (percentage >= 75 && percentage < 100 && !unlockedMilestones.threeQuarters) {
                unlockedMilestones.threeQuarters = true;
                triggerAchievementAlert("75% completed - you can do it!", "(  ˶°ㅁ°) !!");
            } else if (percentage >= 50 && percentage < 75 && !unlockedMilestones.half) {
                unlockedMilestones.half = true;
                triggerAchievementAlert("50% done - woah!", "( ๑•᎑•๑ )!");
            } else if (percentage >= 25 && percentage < 50 && !unlockedMilestones.quarter) {
                unlockedMilestones.quarter = true;
                triggerAchievementAlert("25% of the way there - keep making progress!", "( ˶ˆᗜˆ˵ )");
            }

            if (percentage < 25) unlockedMilestones.quarter = false;
            if (percentage < 50) unlockedMilestones.half = false;
            if (percentage < 75) unlockedMilestones.threeQuarters = false;
            if (percentage < 100) unlockedMilestones.complete = false;

            if (percentage === 0) {
                achievementBanner.classList.remove("auth-banner-show");
            }

        } else {
            progressPercentDisplay.textContent = "0%";
            progressBarFill.style.width = "0%";
            goalStatusDesc.textContent = "Target Goal: None Set";
            achievementBanner.classList.remove("auth-banner-show");
        }
    }

    function triggerAchievementAlert(titleText, descText) {
        const oldX = achievementBanner.querySelector(".close-x-btn");
        if (oldX) {
            oldX.remove();
        }

        achievementTitle.textContent = titleText;
        achievementDesc.textContent = descText;

        const closeX = document.createElement("button");
        closeX.className = "close-x-btn alert-dismiss-action";
        closeX.textContent = "✕";

        closeX.addEventListener("click", function() {
            achievementBanner.classList.remove("auth-banner-show");
        });

        achievementBanner.appendChild(closeX);
        achievementBanner.classList.add("auth-banner-show");
    }
    // dates
    function formatToMonthDay(dateString) {
        if (!dateString) return "";
        const parts = dateString.split("-");
        if (parts.length < 3) return dateString;
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        return `${month}/${day}`;
    }

    // formatting stuff
    function convertToTwelveHour(timeStr) {
        if (!timeStr) return "";
        const parts = timeStr.split(":");
        if (parts.length < 2) return timeStr;
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1];
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return `${hours}:${minutes}`;
    }

    function renderSpreadsheetList() {
        ledgerList.textContent = "";

        // diff emoticons per mode
        const isDayThemeActive = document.body.classList.contains("day-mode");
        const activeEmoticonBadge = isDayThemeActive ? " - - ⁺₊⋆ ☀︎ ⋆⁺₊ - - " : "݁ - - 𖥔 ˚｡˚☽˚｡⋆𖥔 - - ";

        for (let i = 0; i < activitiesMemory.length; i++) {
            const currentItem = activitiesMemory[i];
            const rowLi = document.createElement("li");
            rowLi.className = "ledger-item-row-layout";

            // formatting stuff again
            const dateAndTimelineBadge = "(" + currentItem.formattedDate + ") " + activeEmoticonBadge + " (" + currentItem.rangeString + ")";

            // rendering elements
            const infoDiv = document.createElement("div");
            const strongTitle = document.createElement("strong");
            strongTitle.textContent = currentItem.name;

            const badgeSpan = document.createElement("span");
            badgeSpan.className = "ledger-badge-style";
            badgeSpan.textContent = dateAndTimelineBadge;

            const typeSpan = document.createElement("span");
            typeSpan.className = "ledger-type-style";
            typeSpan.textContent = "[" + currentItem.type + "]";

            infoDiv.appendChild(strongTitle);
            infoDiv.appendChild(badgeSpan);
            infoDiv.appendChild(typeSpan);

            const rightDiv = document.createElement("div");
            rightDiv.className = "ledger-right-wrap";

            const hoursSpan = document.createElement("span");
            hoursSpan.textContent = currentItem.hours + " Hours";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "filter-btn ledger-delete-override";

            const targetIndex = i;

            deleteBtn.addEventListener("click", function() {
                activitiesMemory.splice(targetIndex, 1);
                localStorage.setItem(activitiesKey, JSON.stringify(activitiesMemory));
                renderSpreadsheetList();
                recalculateTotalHoursAndProgress();
            });

            rightDiv.appendChild(hoursSpan);
            rightDiv.appendChild(deleteBtn);
            rowLi.appendChild(infoDiv);
            rowLi.appendChild(rightDiv);
            ledgerList.appendChild(rowLi);
        }
    }
    
    //goals/notifs
    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const goalInputValue = parseInt(document.querySelector("#targetInput").value, 10);

        if (goalInputValue > 0) {
            studentTargetGoal = goalInputValue;
            localStorage.setItem(goalKey, studentTargetGoal);

            unlockedMilestones = { quarter: false, half: false, threeQuarters: false, complete: false };
            achievementBanner.classList.remove("auth-banner-show");

            recalculateTotalHoursAndProgress();

            const submitButton = document.querySelector("#goalSubmitBtn");
            submitButton.textContent = "Done! ✓⃝";

            setTimeout(function() {
                submitButton.textContent = "Update Goal";
            }, 2000);

            goalForm.reset();
        }
    });

    activitiesForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameInputVal = document.querySelector("#actName").value;
        const typeSelectVal = document.querySelector("#actType").value;
        const hoursInputVal = parseFloat(document.querySelector("#actHours").value);

        const startTimeString = convertToTwelveHour(timeInInput.value);
        const endTimeString = convertToTwelveHour(timeOutInput.value);
        const compiledRange = startTimeString + "-" + endTimeString;

        const loggedActivity = {
            name: nameInputVal,
            formattedDate: formatToMonthDay(actStartInput.value),
            rangeString: compiledRange,
            type: typeSelectVal,
            hours: hoursInputVal
        };

        activitiesMemory.unshift(loggedActivity);
        localStorage.setItem(activitiesKey, JSON.stringify(activitiesMemory));

        renderSpreadsheetList();
        recalculateTotalHoursAndProgress();

        activitiesForm.reset();

        actStartInput.type = "text";
        timeInInput.type = "text";
        timeOutInput.type = "text";
    });

    // can u tell ive already lost my mind
    const logoutBtn = document.querySelector("a[href='index.html']");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("voluntaCurrentUser");
        });
    }

    const themeBtn = document.querySelector("#themeToggleBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function() {
            setTimeout(renderSpreadsheetList, 50);
        });
    }
    // =============================
// ACCOUNT MENU
// =============================


const menuToggleBtn =
document.getElementById("menuToggleBtn");


const accountMenu =
document.getElementById("accountMenu");


const menuCloseBtn =
document.getElementById("menuCloseBtn");


const detailsBox =
document.getElementById("accountDetailsBox");



if(menuToggleBtn){

menuToggleBtn.onclick=function(){

accountMenu.classList.toggle("menu-open");

}

}



if(menuCloseBtn){

menuCloseBtn.onclick=function(){

accountMenu.classList.remove("menu-open");

}

}



const detailsBtn =
document.getElementById("detailsMenuBtn");



if(detailsBtn){

detailsBtn.onclick=function(){


if(currentUser.betaTester){

detailsBox.innerHTML =
`
<h4>Account Details</h4>

<p>
BETA TESTER ACCOUNT
</p>

<p>
Student ID:
${currentUser.studentId}
</p>
`;

}
else{

detailsBox.innerHTML =
`
<h4>Account Details</h4>

<p>
Student Account
</p>

<p>
Student ID:
${currentUser.studentId}
</p>
`;

}


}


}
});
