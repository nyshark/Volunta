document.addEventListener("DOMContentLoaded", function () {

    // elements
    
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

    // into

    setTimeout(function () {

        if (welcomeIntro) {

            welcomeIntro.classList.add("fade-out");
        }
        
        if (roleSelection) {

            roleSelection.style.display = "flex";
            roleSelection.classList.remove("hidden-screen");
        }

    }, 3000);
    
    // banner

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
    
    // role selection

    if (studentRoleBtn) {

        studentRoleBtn.onclick = function () {

            roleSelection.classList.add(
                "fade-out"
            );

            setTimeout(function () {

    // Completely remove the role selection
    roleSelection.style.display = "none";

    // Remove the welcome screen too
    if (welcomeIntro) {
        welcomeIntro.style.display = "none";
    }

    // Show login
    if (authSection) {

        authSection.classList.remove("auth-hidden");
        authSection.classList.add("auth-visible");

        // Scroll to the login section
        window.scrollTo({
    top: 0,
    behavior: "instant"
});

    }

}, 700);

        };
    }

    if (organizerRoleBtn) {

    organizerRoleBtn.onclick = function () {

        alert("The button was clicked!");

        showBanner(

            "Sorry!!",
            "Under maintenance at the moment ✦"
        );

        setTimeout(function () {

            hideBanner();

        }, 4000);

    };
}

    // beta login

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

            // create new beta acc

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

            // login existing BETA user

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

    // google login setup

    window.handleGoogleLogin = function (response) {

        try {

            // decode google tooken

            const payload =
                JSON.parse(

                    atob(

                        response.credential
                            .split(".")[1]
                    )
                );

            const email =
    payload.email.toLowerCase();

const name =
    payload.name;

const picture =
    payload.picture;

// Allow common school email domains
const isSchoolEmail =
    email.endsWith(".edu") ||
    email.includes(".k12.") ||
    email.includes("school") ||
    email.includes("district");

if (!isSchoolEmail) {

    showBanner(

        "School Email Required",
        "Please sign in with your school email account."

    );

    return;
}

            // load users

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

            // create google user

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

            // save act user

            localStorage.setItem(
                "voluntaCurrentUser",
                JSON.stringify(currentUser)
            );

            // dashboard


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

    // hide banner aftr clicking

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
