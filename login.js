// login status scripts +form swapper bs
document.addEventListener("DOMContentLoaded", function() {

    const tabLogin = document.querySelector("#tabLogin");
    const tabRegister = document.querySelector("#tabRegister");
    const formHeading = document.querySelector("#formHeading");
    const formSub = document.querySelector("#formSub");
    const submitBtn = document.querySelector("#submitBtn");
    const authForm = document.querySelector("#authForm");

    // notifs elements
    const authNoticeBanner = document.querySelector("#authNoticeBanner");
    const authNoticeTitle = document.querySelector("#authNoticeTitle");
    const authNoticeDesc = document.querySelector("#authNoticeDesc");

    // additions for brand text swapping
    const mainBrandTitle = document.querySelector("#mainBrandTitle");
    const themeToggleBtn = document.querySelector("#themeToggleBtn");

    // track state
    let isLoginMode = true;

    // custom brand text toggler thing
    function updateBrandTitleText() {
        if (!mainBrandTitle) return;

        // small pause so background scripts can toggle classes first
        setTimeout(function() {
            const isDayThemeActive = document.body.classList.contains("day-mode");

            if (isDayThemeActive) {
                mainBrandTitle.textContent = " ⋆⋅☀︎VOLUNTA☀︎⋅⋆ ";
            } else {
                mainBrandTitle.textContent = " ₊✮.VOLUNTA.✮₊ ";
            }
        }, 20);
    }

    // initial call on load
    updateBrandTitleText();

    // hook into theme clicks
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", updateBrandTitleText);
    }

    // custom bannerrsrsrs
    function triggerLaidbackBanner(titleText, descText) {
        if (!authNoticeBanner || !authNoticeTitle || !authNoticeDesc) return;

        authNoticeTitle.textContent = titleText;
        authNoticeDesc.textContent = descText;
        authNoticeBanner.classList.add("auth-banner-show");
    }

    // switching mode
    tabLogin.addEventListener("click", function() {
        isLoginMode = true;

        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");

        formHeading.textContent = "welcome back :)";
        formSub.textContent = "hi again!";
        submitBtn.textContent = "log in";

        if (authNoticeBanner) {
            authNoticeBanner.classList.remove("auth-banner-show");
        }
    });

    // switch to sign in mode
    tabRegister.addEventListener("click", function() {
        isLoginMode = false;

        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");

        formHeading.textContent = "welcome!";
        formSub.textContent = "hello!";
        submitBtn.textContent = "sign up";

        if (authNoticeBanner) {
            authNoticeBanner.classList.remove("auth-banner-show");
        }
    });

    // validating stfuf
    authForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailElement = document.querySelector("#email");
        const passwordElement = document.querySelector("#password");

        if (!emailElement || !passwordElement) {
            return;
        }

        const emailValue = emailElement.value.trim().toLowerCase();
        const passwordValue = passwordElement.value;

        if (!emailValue || !passwordValue) {
            triggerLaidbackBanner("Parameters Missing", "fill out all parameters brotito ( -ࡇ-)");
            return;
        }

        // existing data gets pulled from backrooms or wtv
        const totalUsersList = JSON.parse(localStorage.getItem("voluntaUsers")) || [];

        if (isLoginMode) {
            // search for matching accs
            let matchingUser = null;
            for (let i = 0; i < totalUsersList.length; i++) {
                if (totalUsersList[i].email === emailValue) {
                    matchingUser = totalUsersList[i];
                    break;
                }
            }

            if (!matchingUser) {
                triggerLaidbackBanner("Account Not Found", "that account wasn't found... try signing up first! :)");
                return;
            }

            if (matchingUser.password !== passwordValue) {
                triggerLaidbackBanner("Incorrect Credentials", "incorrect password combination, try again! ( ˙◠˙ )");
                return;
            }

            // lock profiel session
            localStorage.setItem("voluntaCurrentUser", JSON.stringify(matchingUser));

            triggerLaidbackBanner("Access Granted!", "logging you in... ✩‧₊");

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 800);

        } else {
            // cant make duplicate accs
            let accountExists = false;
            for (let j = 0; j < totalUsersList.length; j++) {
                if (totalUsersList[j].email === emailValue) {
                    accountExists = true;
                    break;
                }
            }

            if (accountExists) {
                triggerLaidbackBanner("Email Taken", "this email is already registered, try logging in!");
                return;
            }

            // package (ups?)
            const newUserRecord = {
                email: emailValue,
                password: passwordValue
            };

            // roww matricx bs
            totalUsersList.push(newUserRecord);
            localStorage.setItem("voluntaUsers", JSON.stringify(totalUsersList));

            // log directly bc delay is not okaY! (im lowk spitting bars what)
            localStorage.setItem("voluntaCurrentUser", JSON.stringify(newUserRecord));

            triggerLaidbackBanner("Registration Successful!", "welcome to volunta ( ˶ˆᗜˆ˵ ) ✩‧₊");

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1200);
        }
    });
});
