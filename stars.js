// Execute after HTML works so it doesn't explode
document.addEventListener("DOMContentLoaded", function() {

    // Generate star coordinates
    const starCount = 80;
    const trackingParticles = [];

    // Glowy sunny effecty thingy
    const sun = document.createElement("div");
    sun.className = "sun-element";
    document.body.appendChild(sun);

    // Moon effect thing
    const moon = document.createElement("div");
    moon.className = "moon-element";
    document.body.appendChild(moon);

    // Shooting stars canvas
    const canvas = document.createElement("canvas");
    canvas.id = "shootingStarCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star-div";

        // Random positioning across view viewport
        star.style.left = (Math.random() * window.innerWidth) + "px";
        star.style.top = (Math.random() * window.innerHeight) + "px";

        // Transparency to simulate twinkle
        star.style.opacity = Math.random();
        document.body.appendChild(star);

        // Geometric values
        trackingParticles.push({
            domNode: star
        });
    }

    // Refactored to completely avoid writing direct .style dimensions inside JavaScript logic loops
    function morphAtmosphereView() {
        const isDayMode = document.body.classList.contains("day-mode");

        for (let i = 0; i < trackingParticles.length; i++) {
            let p = trackingParticles[i];
            if (isDayMode) {
                // Stars -> clouds handling handled safely through global CSS style handles
                p.domNode.classList.add("star-day-morph");
            } else {
                // Clouds -> stars
                p.domNode.classList.remove("star-day-morph");
            }
        }
    }

    // Run updates safely
    setInterval(function() {
        const isDayMode = document.body.classList.contains("day-mode");
        for (let i = 0; i < trackingParticles.length; i++) {
            if (isDayMode) {
                // Clouds move slowly
                trackingParticles[i].domNode.style.opacity = 0.2 + Math.random() * 0.4;
            } else {
                // Stars twinkle rapidly
                trackingParticles[i].domNode.style.opacity = Math.random();
            }
        }

        // Sun ray flicker
        if (isDayMode) {
            sun.style.transform = "scale(" + (0.96 + Math.random() * 0.08) + ")";
            sun.style.opacity = 0.8 + Math.random() * 0.2;
        }
    }, 1200);

    // Fun cursor click thing
    window.addEventListener("click", function(event) {
        // No sparkles if pressing navigation items
        if (event.target.tagName === "BUTTON" ||
            event.target.tagName === "A" ||
            event.target.tagName === "SELECT") {
            return;
        }

        const isDayModeActive = document.body.classList.contains("day-mode");

        // Mini sparkle burst upon click
        for (let i = 0; i < 3; i++) {
            const clickStar = document.createElement("div");

            clickStar.className = isDayModeActive ? "star-div click-sparkle-day" : "star-div click-sparkle-night";

            const scatterX = Math.random() * 20 - 10;
            const scatterY = Math.random() * 24 - 12;
            clickStar.style.left = (event.clientX + scatterX) + "px";
            clickStar.style.top = (event.clientY + scatterY) + "px";

            document.body.appendChild(clickStar);

            // Prevent canvas bleeding
            setTimeout(function() {
                clickStar.remove();
            }, 800);
        }
    });

    // Shooting stars animation
    let activeComet = null;

    function spawnCometTrail() {
        activeComet = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2),
            length: 50 + Math.random() * 40,
            speed: 9 + Math.random() * 5,
            dx: 1,
            dy: 0.75
        };
    }

    function animateShootingStarsLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDayMode = document.body.classList.contains("day-mode");

        if (!isDayMode) {
            if (!activeComet && Math.random() < 0.004) {
                spawnCometTrail();
            }

            if (activeComet) {
                ctx.beginPath();
                let gradient = ctx.createLinearGradient(
                    activeComet.x, activeComet.y,
                    activeComet.x - (activeComet.length * activeComet.dx),
                    activeComet.y - (activeComet.length * activeComet.dy)
                );
                gradient.addColorStop(0, "rgba(200, 216, 255, 0.9)");
                gradient.addColorStop(1, "rgba(200, 216, 255, 0)");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.moveTo(activeComet.x, activeComet.y);
                ctx.lineTo(
                    activeComet.x - (activeComet.length * activeComet.dx),
                    activeComet.y - (activeComet.length * activeComet.dy)
                );
                ctx.stroke();

                activeComet.x += activeComet.speed * activeComet.dx;
                activeComet.y += activeComet.speed * activeComet.dy;

                if (activeComet.x > window.innerWidth || activeComet.y > window.innerHeight) {
                    activeComet = null;
                }
            }
        }
        requestAnimationFrame(animateShootingStarsLoop);
    }
    animateShootingStarsLoop();

    // Theme toggle execution
    const themeBtn = document.querySelector("#themeToggleBtn");
    if (themeBtn) {
        // Run once at start to set correct layout states
        morphAtmosphereView();

        themeBtn.addEventListener("click", function() {
            document.body.classList.toggle("day-mode");

            if (document.body.classList.contains("day-mode")) {
                themeBtn.innerHTML = "𖤓";
            } else {
                themeBtn.innerHTML = "⏾";
            }

            morphAtmosphereView();
        });
    }
});
